const { offerLineItems } = require('../api-util/lineItems');
const {
  getTrustedSdk,
  getSdk,
  getIntegrationSdk,
  serialize,
  handleError,
} = require('../api-util/sdk');

module.exports = async (req, res) => {
  try {
    const transactionId = req.body.id;

    if (!transactionId) {
      return res
        .status(400)
        .send({ message: 'Transaction id is required, but not found in the request.' });
    }

    const trustedSdk = await getTrustedSdk(req);
    const sdk = getSdk(req, res);
    const integrationSdk = getIntegrationSdk();
    const response = await sdk.transactions.show({
      id: transactionId,
      include: ['customer', 'provider'],
    });

    const transaction = response.data.data;

    const processVersion = transaction?.attributes?.processVersion;
    // const isNewProcess = processVersion === 29 || processVersion === 45;
    // const isNewProcess =
    //   processVersion === +process.env.REACT_APP_SERVICE_NEW_PROCESS ||
    //   processVersion === +process.env.REACT_APP_PRODUCT_NEW_PROCESS;
    const processName = transaction?.attributes?.processName;

    const isNewProcess = true;
    // (processVersion >= +process.env.REACT_APP_SERVICE_NEW_PROCESS &&
    //   processName == 'flex-hourly-default-process') ||
    // (processVersion >= +process.env.REACT_APP_PRODUCT_NEW_PROCESS &&
    //   processName == 'flex-product-default-process') ||
    // processName == 'flex-daily-default-process' ||
    // processName == 'flex-hourly-paid-default-process/release-1' ||
    // processName == 'flex-product-paid-default-process/release-1' ||
    // processName == 'flex-daily-paid-default-process/release-1';
    const { attributes } = transaction || {};
    const { metadata } = attributes || {};
    const { priceValues } = metadata || {};

    const providerId = transaction.relationships.provider.data.id.uuid;
    const customerId = transaction.relationships.customer.data.id.uuid;
    const customer = await sdk.users.show({ id: customerId });
    const customerData = customer.data.data;
    const { attributes: customerAttributes } = customerData || {};
    const { profile } = customerAttributes || {};
    const { metadata: customerMetadata } = profile || {};
    const { sune } = customerMetadata || {};

    if (sune < priceValues?.totalAmount && isNewProcess) {
      return res.status(401).send({
        message: 'Customer does not have enough sune balance ',
      });
    }
    if (isNewProcess) {
      await integrationSdk.users.updateProfile({
        id: customerId,
        metadata: {
          sune: sune - priceValues?.totalAmount,
        },
      });
    }
    const queryParams = {
      expand: true,
    };
    const trustedAcceptApiResponse = await trustedSdk.transactions.transition(
      {
        id: transactionId,
        transition: 'transition/accept',
        params: {
          metadata: {
            locked_sune: isNewProcess ? priceValues?.totalAmount : null,
            // accepted_at: new Date().toISOString(),
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
