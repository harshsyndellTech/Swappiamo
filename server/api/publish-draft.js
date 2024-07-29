const { getSdk, handleError, serialize } = require('../api-util/sdk');
const { PUBLISHED, PENDING_APPROVAL } = require('./listingStatesCustom');

module.exports = async (req, res) => {
  const { bodyParams, queryParams } = req.body;
  return res.status(404).end();

  const sdk = getSdk(req, res);
  let response;
  try {
    response = await sdk.ownListings.publishDraft(bodyParams, queryParams);
  } catch (e) {
    return handleError(res, e);
  }

  const listing = response.data.data;
  const state = listing.attributes.state;

  const updatePayload =
    state == PUBLISHED
      ? {
          LISTING_STATE: [PUBLISHED],
        }
      : state == PENDING_APPROVAL
      ? {
          LISTING_STATE: [PENDING_APPROVAL],
        }
      : null;

  if (!updatePayload) {
    const { status, statusText, data } = response;
    return res
      .status(status)
      .set('Content-Type', 'application/transit+json')
      .send(
        serialize({
          status,
          statusText,
          data,
        })
      )
      .end();
  }

  try {
    const updatedListing = await sdk.ownListings.update(
      {
        ...bodyParams,
        privateData: {
          ...updatePayload,
        },
      },
      {
        expand: true,
      }
    );
    const { status, statusText, data } = updatedListing;
    return res
      .status(status)
      .set('Content-Type', 'application/transit+json')
      .send(
        serialize({
          status,
          statusText,
          data,
        })
      )
      .end();
  } catch (e) {
    return handleError(res, e);
  }
};
