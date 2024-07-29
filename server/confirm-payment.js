const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const MONTHLY_PRICE_ID = process.env.MONTHLY_PRICE_ID;
const YEARLY_PRICE_ID = process.env.YEARLY_PRICE_ID;

const createStripeCustomer = async details => {
  const { email, country, userId, postalcode } = details;
  const stripeCustomer = await stripe.customers.create({
    email,
    address: {
      country,
      postal_code: postalcode,
    },
    metadata: {
      country,
      userId,
      postalcode,
    },
  });
  return stripeCustomer;
};

const saveStripeCustomerInUserMetaData = async (customer, id, integrationSdk) => {
  await integrationSdk.users.updateProfile({
    id,
    metadata: {
      stripe_customer_id: customer.id,
    },
  });
};

const attachDefaultPaymentMethodToTheCustomer = async (id, customerId) => {
  await stripe.paymentMethods.attach(id, {
    customer: customerId,
  });
  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: id,
    },
  });
};

const createOrGetStripeCustomer = async (sdk, details, integrationSdk) => {
  const response = await sdk.currentUser.show();
  const currentUser = response.data.data;
  const alreadySavedCustomerId = currentUser?.attributes?.profile?.metadata?.stripe_customer_id;
  if (alreadySavedCustomerId) {
    return { stripe_customer_id: alreadySavedCustomerId, user_id: currentUser.id.uuid };
  } else {
    const stripeCustomer = await createStripeCustomer({
      ...details,
      email: currentUser.attributes.email,
      userId: currentUser.id.uuid,
    });
    await saveStripeCustomerInUserMetaData(stripeCustomer, currentUser.id.uuid, integrationSdk);
    return { stripe_customer_id: stripeCustomer.id, user_id: currentUser.id.uuid };
  }
};

module.exports = async (req, res, sdk, integrationSdk) => {
  try {
    const { country = 'US', postalcode, id, plan } = req.body;
    if (!country || !postalcode || !id)
      return res.status(422).send({ message: 'Please fill all the fields' });
    const {
      stripe_customer_id: stripeCustomerId,
      user_id: currentUserId,
    } = await createOrGetStripeCustomer(
      sdk,
      {
        country,
        postalcode,
      },
      integrationSdk
    );
    await attachDefaultPaymentMethodToTheCustomer(id, stripeCustomerId);

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
      return res.status(404).send({ message: 'Price id not found' });
    }

    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userId: currentUserId,
        plan: plan,
      },
    });
    return res.status(200).send(subscription);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: 'Failed to create the subscription' });
  }
};
