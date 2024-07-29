const { getSdk, handleError, getIntegrationSdk, serialize } = require('../api-util/sdk');

module.exports = async (req, res) => {
  const { perPage, page, tab } = req.query || {};

  console.log({ tab });
  const params = {
    include: ['images'],
    'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    'limit.images': 1,
    page: +page,
    perPage: +perPage,
  };

  const sdk = await getSdk(req, res);

  let currentUser;
  try {
    currentUser = await sdk.currentUser.show();
    currentUser = currentUser.data.data;
  } catch (e) {
    handleError(res, e);
  }

  switch (tab) {
    case 'closed':
      params.states = ['closed'];
      break;
    case 'drafts':
      params.states = ['draft'];
      break;
    case 'published-or-waiting-approval':
      params.states = ['published', 'pendingApproval'];
      break;
    default:
      params.states = ['draft'];
  }

  const integrationSdk = getIntegrationSdk();

  try {
    const apiResponse = await integrationSdk.listings.query({
      ...params,
      authorId: currentUser.id.uuid,
    });

    const { status, statusText, data } = apiResponse;

    data.data = data.data.map(listing => ({ ...listing, type: 'ownListing' }));

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
    handleError(res, e);
  }
};
