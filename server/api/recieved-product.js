const { offerLineItems } = require('../api-util/lineItems');
const { getTrustedSdk, getSdk, getIntegrationSdk, serialize } = require('../api-util/sdk');

module.exports = async (req, res) => {
  const transactionId = req.body.id;
  console.log('hit');
  if (!transactionId) {
    return res
      .status(422)
      .send({ message: 'Transaction id is required, but not found in the request.' });
  }

  try {
    const trustedSdk = await getTrustedSdk(req);
    const sdk = getSdk(req, res);
    const integrationSdk = getIntegrationSdk();
    const response = await sdk.transactions.show({
      id: transactionId,
      include: ['customer', 'provider'],
    });

    const lockedSune = response?.data?.data?.attributes?.metadata?.locked_sune;
    const providerId = response.data.data.relationships.provider.data.id.uuid;
    const customerId = response.data.data.relationships.customer.data.id.uuid;
    const providerData = await integrationSdk.users.show({
      id: providerId,
    });

    const providerSune = providerData?.data?.data?.attributes?.profile?.metadata?.sune ?? 0;

    await integrationSdk.users.updateProfile({
      id: providerId,
      metadata: {
        sune: providerSune + lockedSune,
      },
    });
    const queryParams = {
      expand: true,
    };
    const trustedAcceptApiResponse = await trustedSdk.transactions.transition(
      {
        id: transactionId,
        transition: 'transition/product-delivered',
        params: {
          metadata: {
            sune_credited: true,
            locked_sune: null,
          },
        },
      },
      queryParams
    );

    const { status, statusText, data } = trustedAcceptApiResponse;
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
    console.log();
    e;
    return res.status(500).send({ message: 'Something went wrong, please try again later.' });
  }
};
