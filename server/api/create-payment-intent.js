const { getSdk, getIntegrationSdk, handleError } = require('../api-util/sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const MONTHLY_PRICE_ID = process.env.MONTHLY_PRICE_ID;
const YEARLY_PRICE_ID = process.env.YEARLY_PRICE_ID;
const integrationSdk = getIntegrationSdk();

async function createCustomer(currentUser) {
  const stripeCustomerId = currentUser?.attributes?.profile?.metadata?.stripe_customer_id ?? null;

  if (stripeCustomerId) {
    return stripeCustomerId;
  }
  const customer = await stripe.customers.create({
    email: currentUser.attributes.email,
  });

  await integrationSdk.users.updateProfile({
    id: currentUser.id.uuid,
    metadata: {
      stripe_customer_id: customer.id,
    },
  });

  return customer.id;
}

module.exports = async (req, res) => {
  const sdk = getSdk(req, res);
  let currentUser = null;
  const plan = req.body.plan;
  let priceId;
  switch (plan) {
    case 'basic-plan':
      priceId = MONTHLY_PRICE_ID;
      break;
    case 'premium-plan':
      priceId = YEARLY_PRICE_ID;
      break;
  }

  if (!priceId) {
    return res.status(402).send({ message: 'Price id not found' });
  }
  let planIsActive = false;
  try {
    const response = await sdk.currentUser.show();
    currentUser = response.data.data;
    const activePlans = currentUser?.attributes?.profile?.metadata?.activePlans ?? null;
    planIsActive =
      activePlans &&
      activePlans[plan] &&
      moment(activePlans[plan]?.activationDate).isValid() &&
      moment().diff(activePlans[plan].activationDate, 'days') < 365;
    if (planIsActive) {
      throw { message: 'Not allowed' };
    }
  } catch (e) {
    return handleError(res, e);
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    const customerId = await createCustomer(currentUser);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      payment_method_types: ['card'],
      customer: customerId,
      metadata: {
        sune_sharetribe_user_id: currentUser.id.uuid,
        plan,
        priceId,
        type: 'sune-topup',
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: price.unit_amount,
      currency: price.currency,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: `Something went wrong, please try again.`,
    });
  }
};
