const { getSdk, handleError, serialize } = require('../api-util/sdk');
const { listingClosedByUser } = require('./listingStatesCustom');

module.exports = async (req, res) => {
  const id = req.body?.id;

  if (!id) {
    return res.status(400).send({ message: 'listing id is required' });
  }

  const sdk = getSdk(req, res);

  let listing = null;

  try {
    const listingResponse = await sdk.ownListings.show({ id });
    listing = listingResponse.data.data;
  } catch (e) {
    return handleError(res, e);
  }

  const isClosedByUser = listingClosedByUser(listing);

  if (!isClosedByUser) {
    return res
      .status(400)
      .send({ message: 'The listing can not be opened as it has been closed by system.' });
  }

  try {
    const response = await sdk.ownListings.open({ id }, { expand: true });

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
      );
  } catch (e) {
    return handleError(res, e);
  }
};
