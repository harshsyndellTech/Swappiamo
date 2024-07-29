const {
  getTrustedSdk,

  serialize,
  handleError,
} = require('../api-util/sdk');

module.exports = async (req, res) => {
  try {
    const transactionId = req.body.id;

    if (!transactionId) {
      return res
        .status(422)
        .send({ message: 'Transaction id is required, but not found in the request.' });
    }

    const trustedSdk = await getTrustedSdk(req);

    const trustedAcceptApiResponse = await trustedSdk.transactions.transition({
      id: transactionId,
      transition: 'transition/customer-decline',
      params: {
        metadata: {},
      },
    });

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
