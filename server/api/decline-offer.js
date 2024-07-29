const { offerLineItems } = require('../api-util/lineItems');
const {
  getTrustedSdk,
  getSdk,
  getIntegrationSdk,
  serialize,
  handleError,
} = require('../api-util/sdk');

module.exports = async (req, res) => {
  const transactionId = req.body.id;

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

    // const transactionLockedCredits = response?.data?.data?.attributes?.metadata?.locked_credits;

    // const providerId = response.data.data.relationships.provider.data.id.uuid;
    // const customerId = response.data.data.relationships.customer.data.id.uuid;
    // const providerSune = response.data.included?.find(i => i.id.uuid == providerId)?.attributes
    //   .profile.metadata.sune;
    // const customerSune = response.data.included?.find(i => i.id.uuid == customerId)?.attributes
    //   .profile.metadata.sune;

    // const customerData = await integrationSdk.users.show({
    //   id: customerId,
    // });

    // const lockedSunes = customerData.data.data.attributes.profile.metadata.locked_credits;
    // await integrationSdk.users.updateProfile({
    //   id: customerId,
    //   metadata: {
    //     sune: customerSune ? customerSune + transactionLockedCredits : transactionLockedCredits,
    //   },
    // });
    const queryParams = {
      expand: true,
    };
    const trustedAcceptApiResponse = await trustedSdk.transactions.transition(
      {
        id: transactionId,
        transition: 'transition/decline',
        params: {
          metadata: {
            // locked_credits: null,
            // declined_at: new Date().toISOString(),
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
    handleError(res, e);
  }
};
