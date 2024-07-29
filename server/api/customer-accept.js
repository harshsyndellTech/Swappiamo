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

    const transactionAmount = response?.data?.data?.attributes?.metadata?.priceValues?.totalAmount;
    const providerId = response.data.data.relationships.provider.data.id.uuid;
    const customerId = response.data.data.relationships.customer.data.id.uuid;
    const customerData = await integrationSdk.users.show({
      id: customerId,
    });
    const transaction = response.data.data;
    const processVersion = transaction.attributes.processVersion;
    const processName = transaction?.attributes?.processName;

    const isNewProcess = true;
    // (processVersion >= +process.env.REACT_APP_SERVICE_NEW_PROCESS &&
    //   processName == 'flex-hourly-default-process') ||
    // (processVersion >= +process.env.REACT_APP_PRODUCT_NEW_PROCESS &&
    //   processName == 'flex-product-default-process') ||
    // processName == 'flex-hourly-paid-default-process/release-1' ||
    // processName == 'flex-product-paid-default-process/release-1' ||
    // processName == 'flex-daily-paid-default-process/release-1';
    // const isNewProcess =
    //   processVersion === +process.env.REACT_APP_SERVICE_NEW_PROCESS ||
    //   processVersion === +process.env.REACT_APP_PRODUCT_NEW_PROCESS;
    if (isNewProcess) {
      return res.status(400).send({
        message: 'Transaction not allowed for this process version',
      });
    }
    const customerSune = customerData.data.data.attributes.profile.metadata.sune;

    if (customerSune < transactionAmount) {
      return res.status(400).send({
        message: 'Not have enough sune balance ',
      });
    }
    await integrationSdk.users.updateProfile({
      id: customerId,
      metadata: {
        sune: customerSune - transactionAmount,
      },
    });
    const queryParams = {
      expand: true,
    };
    const trustedAcceptApiResponse = await trustedSdk.transactions.transition(
      {
        id: transactionId,
        transition: 'transition/customer-accept',
        params: {
          metadata: {
            locked_sune: transactionAmount,
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
