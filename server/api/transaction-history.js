const Transaction = require('../Schemas/transaction');
const { getSdk } = require('../api-util/sdk');

module.exports = async (req, res) => {
  const sdk = getSdk(req, res);

  let user_id;
  try {
    const userResponse = await sdk.currentUser.show();
    user_id = userResponse?.data?.data?.id?.uuid;
  } catch (e) {
    const status = 403;
    const message = 'Please login to view the history';
    return res.status(status).json({
      message: message,
      errors: [message],
      status,
      statusText: 'Forbidden',
    });
  }

  try {
    const transactions = await Transaction.find({ user_id }).sort({ updatedAt: -1 });
    const status = 200;
    const message = transactions.length > 0 ? 'RESULTS_FOUND' : 'NO_RESULTS_FOUND';
    const data = transactions.map(t => ({
      status: t.status,
      type: t.type,
      date: t.updatedAt,
      amount: t.amount,
      id: t?.id ?? null,
      key: t._id,
      user_joined_id: t?.user_joined_id,
      user_joined_name: t?.user_joined_name,
    }));
    return res.status(status).json({
      status,
      statusText: 'OK',
      message,
      data,
    });
  } catch (e) {
    const status = 500;
    const message = 'Something went wrong, please try again...';
    return res.status(status).json({
      status,
      statusText: 'Internal Server Error',
      message,
      errors: [message],
    });
  }
};
