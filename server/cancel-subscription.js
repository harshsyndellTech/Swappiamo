const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const events = require('events');
const Emitter = new events.EventEmitter();

const { types, statuses } = require('./transactionHistoryHelpers');
const Transaction = require('./Schemas/transaction');

Emitter.on('sune.subscription.deleted', async payload => {
  const { user_id, amount } = payload;
  console.log(`handling event: sune.subscription.deleted for user: ${user_id}`);
  await new Transaction({
    user_id,
    amount,
    type: types.CANCEL_SUBSCRIPTION,
    status: statuses.COMPLETED,
  }).save();
  console.log(`handled event: sune.subscription.deleted for user: ${user_id}`);
});

const deleteSubscription = async id => {
  try {
    const response = await stripe.subscriptions.del(id);
    return [response, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = async (req, res, sdk, integrationSdk) => {
  const planId = req.body.planId;
  if (!planId)
    return res
      .status(422)
      .send({ message: 'Plan id is required to cancel the subscription plan.' });

  const currentUserResponse = await sdk.currentUser.show();
  const currentUser = currentUserResponse?.data?.data;

  if (!currentUser) return res.status(401).send({ message: 'Unauthorized request.' });
  const activePlan = currentUser?.attributes?.profile?.metadata?.activePlan ?? {};
  // const sune = currentUser?.attributes?.profile?.metadata?.sune ?? 0;

  const foundActivePlan = activePlan?.name == planId ? activePlan : null;

  if (!foundActivePlan)
    return res
      .status(422)
      .send({ message: 'Logged in user is not subscribe to the current plan.' });

  const [success, failure] = await deleteSubscription(foundActivePlan.id);

  if (failure) {
    return res.status(500).send({ message: 'Failed to cancel the subscription plan.' });
  }

  const sune = currentUser?.attributes?.profile?.metadata?.sune;

  Emitter.emit('sune.subscription.deleted', {
    user_id: currentUser.id.uuid,
    // amount: sune,
    amount: 0,
  });

  try {
    // const finalActivePlans = activePlans.filter(v => v.name !== planId);

    const userResponse = await integrationSdk.users.updateProfile({
      id: currentUser.id.uuid,
      metadata: {
        activePlan: null,
        // sune: 0,
        initial: null,
        latest_updated_invoice: null,
        // sune: finalActivePlans.length > 0 ? sune : 0,
      },
    });
    return res.status(200).send({ message: 'Subscription plan cancelled successfully.' });
  } catch (e) {
    return res.status(500).send({ message: 'Failed to cancel the subscription plan.' });
  }
};
