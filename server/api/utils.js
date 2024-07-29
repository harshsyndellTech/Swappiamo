exports.getTransaction = async (sdk, transactionId) => {
  try {
    const transactionResponse = await sdk.transactions.show({
      id: transactionId,
      include: ['customer'],
    });
    const transaction = this.denormalizeResponseData(transactionResponse);
    return [transaction, null];
  } catch (err) {
    const error = 'Failed to fetch the transaction';
    return [null, error];
  }
};

exports.getCustomerFromTransaction = transaction => {
  const [customer] = transaction.included;
  return customer;
};
exports.getId = data => data.id.uuid;
