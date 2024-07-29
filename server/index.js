/**
 * This is the main server to run the production application.
 *
 * Running the server requires that `npm run build` is run so that the
 * production JS bundle can be imported.
 *
 * This server renders the requested URL in the server side for
 * performance, SEO, etc., and properly handles redirects, HTTP status
 * codes, and serving the static assets.
 *
 * When the application is loaded in a browser, the client side app
 * takes control and all the functionality such as routing is handled
 * in the client.
 */

// This enables nice stacktraces from the minified production bundle
require('source-map-support').install();

// Configure process.env with .env.* files
require('./env').configureEnv();

const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const moment = require('moment');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const enforceSsl = require('express-enforces-ssl');
const path = require('path');
const sharetribeSdk = require('sharetribe-flex-sdk');
// const sitemap = require('express-sitemap');
const passport = require('passport');
const auth = require('./auth');
const apiRouter = require('./apiRouter');
const wellKnownRouter = require('./wellKnownRouter');
const { getExtractors } = require('./importer');
const renderer = require('./renderer');
const dataLoader = require('./dataLoader');
const fs = require('fs');
const log = require('./log');
// const { sitemapStructure } = require('./sitemap');
const csp = require('./csp');
const sdkUtils = require('./api-util/sdk');
const confirmPayment = require('./confirm-payment');
const buildPath = path.resolve(__dirname, '..', 'build');
const env = process.env.REACT_APP_ENV;
const dev = process.env.REACT_APP_ENV === 'development';
const PORT = parseInt(process.env.PORT, 10);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CLIENT_ID = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const BASE_URL = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const TRANSIT_VERBOSE = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';
const USING_SSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';
const TRUST_PROXY = process.env.SERVER_SHARETRIBE_TRUST_PROXY || null;
const CSP = process.env.REACT_APP_CSP;
const cspReportUrl = '/csp-report';
const cspEnabled = CSP === 'block' || CSP === 'report';
const app = express();
const flexIntegrationSdk = require('sharetribe-flex-integration-sdk');
const cancelSubscription = require('./cancel-subscription');
const watchSharetribeEvents = require('./watch-events');
const Transaction = require('./Schemas/transaction');
const { types, statuses } = require('./transactionHistoryHelpers');
const clientId = process.env.SHARETRIBE_INTEGRATION_CLIENT_ID;
const webmanifestResourceRoute = require('./resources/webmanifest');
const robotsTxtRoute = require('./resources/robotsTxt');
const sitemapResourceRoute = require('./resources/sitemap');
const clientSecret = process.env.SHARETRIBE_INTEGRATION_CLIENT_SECRET;
const integrationSdk = flexIntegrationSdk.createInstance({
  clientId,
  clientSecret,
});
const events = require('events');
// const mongoose = require('mongoose');
const Emitter = new events.EventEmitter();

// const Cancel = require('./Schemas/cancel');

// const dbURI =
//   process.env.MONGOOSE_CONNECTION_URI ||
//   'mongodb://localhost:27017/proffer?readPreference=primary&directConnection=true&ssl=false';

// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(res => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => console.log(`Error connecting to mongoose`, err.message));

const errorPage = fs.readFileSync(path.join(buildPath, '500.html'), 'utf-8');
watchSharetribeEvents();
// load sitemap and robots file structure
// and write those into files
// sitemap(sitemapStructure()).toFile();s

// Setup error logger
log.setup();
// Add logger request handler. In case Sentry is set up
// request information is added to error context when sent
// to Sentry.
app.use(log.requestHandler());

const MONTHLY_PRICE_ID = process.env.MONTHLY_PRICE_ID;
const YEARLY_PRICE_ID = process.env.YEARLY_PRICE_ID;

Emitter.on('sune.balance.added', async payload => {
  const { user_id, amount } = payload;
  console.log(`handling event: sune.balance.added for user: ${user_id}`);
  await new Transaction({
    user_id,
    amount,
    type: types.SUBSCRIPTION,
    status: statuses.COMPLETED,
  }).save();
  console.log(`handled event: sune.balance.added for user: ${user_id}`);
});

Emitter.on('sune.balance.added.renewed', async payload => {
  const { user_id, amount } = payload;
  console.log(`handling event: sune.balance.added.renewed for user: ${user_id}`);
  await new Transaction({
    user_id,
    amount,
    type: types.SUBSCRIPTION,
    status: statuses.COMPLETED,
  }).save();
  console.log(`handled event: sune.balance.added.renewed for user: ${user_id}`);
});

Emitter.on('sune.subscription.cancelled', async payload => {
  const { user_id } = payload;
  console.log(`handling event: sune.subscription.cancelled for user: ${user_id}`);
  const userResponse = await integrationSdk.users.show({ id: user_id });
  const user = userResponse.data.data;
  const sune = user?.attributes?.profile?.metadata?.sune ?? 0;
  const calls = [
    new Transaction({
      user_id,
      // amount: sune,
      amount: 0,
      type: types.CANCEL_SUBSCRIPTION,
      status: statuses.COMPLETED,
    }).save(),

    integrationSdk.users.updateProfile({
      id: user_id,
      metadata: {
        activePlan: null,
        // sune: 0,
        initial: null,
        latest_updated_invoice: null,
      },
    }),
  ];
  await Promise.all(calls);
  console.log(`handled event: sune.subscription.cancelled for user: ${user_id}`);
  return Promise.resolve();
});

async function updateSuneInProfile(subscription) {
  const {
    metadata: { userId, plan },
    plan: { id },
  } = subscription;

  try {
    const userResponse = await integrationSdk.users.show({ id: userId });
    const user = userResponse.data.data;
    const previousSune = user?.attributes?.profile?.metadata?.sune ?? 0;
    const activePlans = user?.attributes?.profile?.metadata?.activePlans ?? {};
    const planActive =
      activePlans[plan] &&
      moment(activePlans[plan]?.activationDate).isValid() &&
      moment().diff(activePlans[plan].activationDate, 'days') < 365;
    if (planActive) {
      return;
    }
    // const previousActivePlanss = user?.attributes?.profile?.metadata?.activePlanss ?? [];
    let newSune = 0;

    let subscriptionType;

    let planName;
    switch (id) {
      case MONTHLY_PRICE_ID:
        subscriptionType = {
          name: 'basic-plan',
          id: id,
          activationDate: moment().toISOString(),
        };
        planName = 'basic-plan';
        newSune = 20;
        break;
      case YEARLY_PRICE_ID:
        subscriptionType = {
          name: 'premium-plan',
          id: id,
          activationDate: moment().toISOString(),
        };
        planName = 'premium-plan';

        newSune = 50;
        break;
      default:
        return Promise.resolve();
    }

    console.log('firing event: sune.balance.added');
    Emitter.emit('sune.balance.added', { user_id: userId, amount: newSune });
    console.log('fired event: sune.balance.added');
    const totalSune = previousSune + newSune;

    const updatedUser = await integrationSdk.users.updateProfile({
      id: userId,
      metadata: {
        sune: totalSune,
        activePlans: { ...activePlans, [planName]: subscriptionType },
        initial: true,
      },
    });

    // console.log({ updatedUser, totalSune });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function handleSubscriptionUpdated(eventData) {
  // prevent on initial subscription
  const { object: subscription, previous_attributes } = eventData;

  const hasPreviousInvoice = typeof previous_attributes.latest_invoice != 'undefined';

  if (!hasPreviousInvoice) {
    console.log('no invoice updated check');
    return Promise.resolve();
  }

  const previousInvoice = previous_attributes.latest_invoice;

  const latestInvoice = subscription.latest_invoice;

  if (previousInvoice == latestInvoice) {
    console.log('no invoice updated check');
    return Promise.resolve();
  }

  await integrationSdk.users.updateProfile({
    id: subscription.metadata.userId,
    metadata: {
      latest_updated_invoice: latestInvoice,
      initial: null,
    },
  });
  return Promise.resolve();
}

async function handleInvoicePaymentSucceeded(data) {
  try {
    const { object: invoice } = data;

    const invoiceId = invoice.id;
    const isInvoice = invoice.object == 'invoice';
    if (!isInvoice) {
      console.log('no invoice type check');

      return Promise.resolve();
    }

    const userId = invoice?.lines?.data?.[0]?.metadata?.userId;
    const priceId = invoice?.lines?.data?.[0]?.plan?.id;

    const userResponse = await integrationSdk.users.show({ id: userId });
    const user = userResponse.data.data;

    const isInitial = user?.attributes?.profile?.metadata?.initial ?? false;

    if (isInitial) {
      console.log('initial check');
      return Promise.resolve();
    }

    const latestInvoice = user?.attributes?.profile?.metadata?.latest_updated_invoice ?? null;

    if (latestInvoice != invoiceId) {
      console.log('not invoice updated check');

      return Promise.resolve();
    }

    const previousSune = user?.attributes?.profile?.metadata?.sune ?? 0;

    let newSune = 0;

    switch (priceId) {
      case MONTHLY_PRICE_ID:
        newSune = 20;
        break;
      case YEARLY_PRICE_ID:
        newSune = 200;
        break;
      default: {
        console.log('hitting default', priceId);
        return Promise.resolve();
      }
    }

    const totalSune = previousSune + newSune;

    console.log('firing event: sune.balance.added.renewed');
    Emitter.emit('sune.balance.added.renewed', { user_id: userId, amount: newSune });
    console.log('fired event: sune.balance.added.renewed');

    const updatedUser = await integrationSdk.users.updateProfile({
      id: userId,
      metadata: {
        sune: totalSune,
        latest_updated_invoice: null,
      },
    });

    return Promise.resolve();
  } catch (e) {
    console.log(e);
  }
}

// let webRes = require('./webhookresponse.json');
// webRes = webRes
//   .map(web => web.body)
//   .filter(v => ['customer.subscription.updated', 'invoice.payment_succeeded'].includes(v.type));

// async function test() {
//   for (let r of webRes) {
//     if (r.type == 'customer.subscription.updated') {
//       await handleSubscriptionUpdated(r.data);
//     } else {
//       await handleInvoicePaymentSucceeded(r.data);
//     }
//   }
// }
// test();

// console.dir(webRes, { depth: 44 });

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(err);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
    return res.sendStatus(400);
  }

  // await new Webhook({
  //   body: event
  // }).save();

  try {
    // Extract the object from the event.
    const dataObject = event.data.object;
    switch (event.type) {
      case 'payment_intent.succeeded': {
        console.log('hitt');
        const suneCustomerId = dataObject?.charges?.data?.[0]?.metadata?.sune_sharetribe_user_id;
        const plan = dataObject?.charges?.data?.[0]?.metadata?.plan;
        const priceId = dataObject?.charges?.data?.[0]?.metadata?.priceId;
        if (suneCustomerId && plan && priceId) {
          await updateSuneInProfile({
            metadata: { plan, userId: suneCustomerId },
            plan: { id: priceId },
          });
        }
        break;
      }

      case 'customer.subscription.created':
        await updateSuneInProfile(dataObject);
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
          // await new Cancel({
          //   body: event,
          // }).save();
          console.log('Cancelled by user');
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
          const { metadata } = dataObject;
          const userId = metadata.userId;
          Emitter.emit('sune.subscription.cancelled', {
            user_id: userId,
            planId: dataObject.metadata.plan,
          });
        }
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data);
        break;

      default:
      // Unexpected event type
    }
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// The helmet middleware sets various HTTP headers to improve security.
// See: https://www.npmjs.com/package/helmet
// Helmet 4 doesn't disable CSP by default so we need to do that explicitly.
// If csp is enabled we will add that separately.

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (cspEnabled) {
  // When a CSP directive is violated, the browser posts a JSON body
  // to the defined report URL and we need to parse this body.
  app.use(
    bodyParser.json({
      type: ['json', 'application/csp-report'],
    })
  );

  // CSP can be turned on in report or block mode. In report mode, the
  // browser checks the policy and calls the report URL when the
  // policy is violated, but doesn't block any requests. In block
  // mode, the browser also blocks the requests.

  // In Helmet 4,supplying functions as directive values is not supported.
  // That's why we need to create own middleware function that calls the Helmet's middleware function
  const reportOnly = CSP === 'report';
  app.use((req, res, next) => {
    csp(cspReportUrl, USING_SSL, reportOnly)(req, res, next);
  });
}

// Redirect HTTP to HTTPS if USING_SSL is `true`.
// This also works behind reverse proxies (load balancers) as they are for example used by Heroku.
// In such cases, however, the TRUST_PROXY parameter has to be set (see below)
//
// Read more: https://github.com/aredo/express-enforces-ssl
//
if (USING_SSL) {
  app.use(enforceSsl());
}

// Set the TRUST_PROXY when running the app behind a reverse proxy.
//
// For example, when running the app in Heroku, set TRUST_PROXY to `true`.
//
// Read more: https://expressjs.com/en/guide/behind-proxies.html
//
if (TRUST_PROXY === 'true') {
  app.enable('trust proxy');
} else if (TRUST_PROXY === 'false') {
  app.disable('trust proxy');
} else if (TRUST_PROXY !== null) {
  app.set('trust proxy', TRUST_PROXY);
}

app.use(compression());
app.use('/static', express.static(path.join(buildPath, 'static')));
// server robots.txt from the root
// app.use('/robots.txt', express.static(path.join(buildPath, 'robots.txt')));
app.use(cookieParser());
// robots.txt is generated by resources/robotsTxt.js
// It creates the sitemap URL with the correct marketplace URL
app.get('/robots.txt', robotsTxtRoute);

// Handle different sitemap-* resources. E.g. /sitemap-index.xml
app.get('/sitemap-:resource', sitemapResourceRoute);

// Generate web app manifest
// When developing with "yarn run dev",
// you can reach the manifest from http://localhost:3500/site.webmanifest
// The corresponding <link> element is set in src/components/Page/Page.js
app.get('/site.webmanifest', webmanifestResourceRoute);

// These .well-known/* endpoints will be enabled if you are using FTW as OIDC proxy
// https://www.sharetribe.com/docs/cookbook-social-logins-and-sso/setup-open-id-connect-proxy/
// We need to handle these endpoints separately so that they are accessible by Flex
// even if you have enabled basic authentication e.g. in staging environment.
app.use('/.well-known', wellKnownRouter);

// Use basic authentication when not in dev mode. This is
// intentionally after the static middleware and /.well-known
// endpoints as those will bypass basic auth.
if (!dev) {
  const USERNAME = process.env.BASIC_AUTH_USERNAME;
  const PASSWORD = process.env.BASIC_AUTH_PASSWORD;
  const hasUsername = typeof USERNAME === 'string' && USERNAME.length > 0;
  const hasPassword = typeof PASSWORD === 'string' && PASSWORD.length > 0;

  // If BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD have been set - let's use them
  if (hasUsername && hasPassword) {
    app.use(auth.basicAuth(USERNAME, PASSWORD));
  }
}

// Initialize Passport.js  (http://www.passportjs.org/)
// Passport is authentication middleware for Node.js
// We use passport to enable authenticating with
// a 3rd party identity provider (e.g. Facebook or Google)
app.use(passport.initialize());

// Server-side routes that do not render the application
app.use('/api', apiRouter);

const noCacheHeaders = {
  'Cache-control': 'no-cache, no-store, must-revalidate',
};

// Instantiate HTTP(S) Agents with keepAlive set to true.
// This will reduce the request time for consecutive requests by
// reusing the existing TCP connection, thus eliminating the time used
// for setting up new TCP connections.
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

app.get('*', (req, res) => {
  if (req.url.startsWith('/static/')) {
    // The express.static middleware only handles static resources
    // that it finds, otherwise passes them through. However, we don't
    // want to render the app for missing static resources and can
    // just return 404 right away.
    return res.status(404).send('Static asset not found.');
  }

  if (req.url === '/_status.json') {
    return res.status(200).send({ status: 'ok' });
  }

  const context = {};

  // Get handle to tokenStore
  // We check in unauthorized cases if requests have set tokens to cookies
  const tokenStore = sharetribeSdk.tokenStore.expressCookieStore({
    clientId: CLIENT_ID,
    req,
    res,
    secure: USING_SSL,
  });

  const baseUrl = BASE_URL ? { baseUrl: BASE_URL } : {};

  const sdk = sharetribeSdk.createInstance({
    transitVerbose: TRANSIT_VERBOSE,
    clientId: CLIENT_ID,
    httpAgent: httpAgent,
    httpsAgent: httpsAgent,
    tokenStore,
    typeHandlers: sdkUtils.typeHandlers,
    ...baseUrl,
  });

  // Until we have a better plan for caching dynamic content and we
  // make sure that no sensitive data can appear in the prefetched
  // data, let's disable response caching altogether.
  res.set(noCacheHeaders);

  // Get chunk extractors from node and web builds
  // https://loadable-components.com/docs/api-loadable-server/#chunkextractor
  const { nodeExtractor, webExtractor } = getExtractors();

  // Server-side entrypoint provides us the functions for server-side data loading and rendering
  const nodeEntrypoint = nodeExtractor.requireEntrypoint();
  const { default: renderApp, matchPathname, configureStore, routeConfiguration } = nodeEntrypoint;

  dataLoader
    .loadData(req.url, sdk, matchPathname, configureStore, routeConfiguration)
    .then(preloadedState => {
      const html = renderer.render(req.url, context, preloadedState, renderApp, webExtractor);

      if (dev) {
        const debugData = {
          url: req.url,
          context,
        };
        console.log(`\nRender info:\n${JSON.stringify(debugData, null, '  ')}`);
      }

      if (context.unauthorized) {
        // Routes component injects the context.unauthorized when the
        // user isn't logged in to view the page that requires
        // authentication.
        sdk.authInfo().then(authInfo => {
          if (authInfo && authInfo.isAnonymous === false) {
            // It looks like the user is logged in.
            // Full verification would require actual call to API
            // to refresh the access token
            res.status(200).send(html);
          } else {
            // Current token is anonymous.
            res.status(401).send(html);
          }
        });
      } else if (context.forbidden) {
        res.status(403).send(html);
      } else if (context.url) {
        // React Router injects the context.url if a redirect was rendered
        res.redirect(context.url);
      } else if (context.notfound) {
        // NotFoundPage component injects the context.notfound when a
        // 404 should be returned
        res.status(404).send(html);
      } else {
        res.send(html);
      }
    })
    .catch(e => {
      log.error(e, 'server-side-render-failed');
      res.status(500).send(errorPage);
    });
});

// Set error handler. If Sentry is set up, all error responses
// will be logged there.
app.use(log.errorHandler());

if (cspEnabled) {
  // Dig out the value of the given CSP report key from the request body.
  const reportValue = (req, key) => {
    const report = req.body ? req.body['csp-report'] : null;
    return report && report[key] ? report[key] : key;
  };

  // Handler for CSP violation reports.
  app.post(cspReportUrl, (req, res) => {
    const effectiveDirective = reportValue(req, 'effective-directive');
    const blockedUri = reportValue(req, 'blocked-uri');
    const msg = `CSP: ${effectiveDirective} doesn't allow ${blockedUri}`;
    log.error(new Error(msg), 'csp-violation');
    res.status(204).end();
  });
}

app.post('*', express.json(), async (req, res) => {
  // Get handle to tokenStore
  // We check in unauthorized cases if requests have set tokens to cookies
  const tokenStore = sharetribeSdk.tokenStore.expressCookieStore({
    clientId: CLIENT_ID,
    req,
    res,
    secure: USING_SSL,
  });

  const baseUrl = BASE_URL ? { baseUrl: BASE_URL } : {};

  const sdk = sharetribeSdk.createInstance({
    transitVerbose: TRANSIT_VERBOSE,
    clientId: CLIENT_ID,
    httpAgent: httpAgent,
    httpsAgent: httpsAgent,
    tokenStore,
    typeHandlers: sdkUtils.typeHandlers,
    ...baseUrl,
  });

  // Until we have a better plan for caching dynamic content and we
  // make sure that no sensitive data can appear in the prefetched
  // data, let's disable response caching altogether.
  res.set(noCacheHeaders);

  const route = req.url.replace(/\//, '');

  switch (route) {
    case 'confirm-payment':
      return confirmPayment(req, res, sdk, integrationSdk);
    case 'cancel-subscription':
      return cancelSubscription(req, res, sdk, integrationSdk);
    default:
      return res.status(404).send('Not found');
  }
});

app.listen(PORT, () => {
  const mode = dev ? 'development' : 'production';
  console.log(`Listening to port ${PORT} in ${mode} mode`);
  if (dev) {
    console.log(`Open http://localhost:${PORT}/ and start hacking!`);
  }
});
