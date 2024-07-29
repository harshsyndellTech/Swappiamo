/**
 * This file contains server side endpoints that can be used to perform backend
 * tasks that can not be handled in the browser.
 *
 * The endpoints should not clash with the application routes. Therefore, the
 * endpoints are prefixed in the main server where this file is used.
 */

const express = require('express');
const bodyParser = require('body-parser');
const { deserialize } = require('./api-util/sdk');

const initiateLoginAs = require('./api/initiate-login-as');
const loginAs = require('./api/login-as');
const transactionLineItems = require('./api/transaction-line-items');
const initiatePrivileged = require('./api/initiate-privileged');
const transitionPrivileged = require('./api/transition-privileged');
const acceptOffer = require('./api/accept-offer');
const declineOffer = require('./api/decline-offer');
const customerAccept = require('./api/customer-accept');
const productReceived = require('./api/recieved-product');
const fetchUser = require('./api/fetch-user');
const createUserWithIdp = require('./api/auth/createUserWithIdp');
const fetchUsers = require('./api/fetch-users');
const { authenticateFacebook, authenticateFacebookCallback } = require('./api/auth/facebook');
const { authenticateGoogle, authenticateGoogleCallback } = require('./api/auth/google');
const transactionHistory = require('./api/transaction-history');
const deleteAccount = require('./api/delete-user');
const router = express.Router();
const mongoose = require('mongoose');
const inviteFriend = require('./api/invite-friend');
const joinViaInvite = require('./api/join-via-invite');
const queryOwnListings = require('./api/query-own-listings');
const publishDraft = require('./api/publish-draft');
const deleteListing = require('./api/delete-listing');
const openListing = require('./api/open-listing');
const closeListing = require('./api/close-listing');
const cancelCustomer = require('./api/customer-cancel');
const sendSune = require('./api/sendSune');

let dbURI = process.env.MONGOOSE_CONNECTION_URI;
// if (process.env.NODE_ENV === 'development')
//   dbURI = 'mongodb://localhost:27017/sune?readPreference=primary&directConnection=true&ssl=false';
const createPaymentIntent = require('./api/create-payment-intent');
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log(`Error connecting to mongoose`, err.message));

// ================ API router middleware: ================ //

// Parse Transit body first to a string
router.use(
  bodyParser.text({
    type: 'application/transit+json',
  })
);

// Deserialize Transit body string to JS data
router.use((req, res, next) => {
  if (req.get('Content-Type') === 'application/transit+json' && typeof req.body === 'string') {
    try {
      req.body = deserialize(req.body);
    } catch (e) {
      console.error('Failed to parse request body as Transit:');
      console.error(e);
      res.status(400).send('Invalid Transit in request body.');
      return;
    }
  }
  next();
});
router.use(express.json());
// ================ API router endpoints: ================ //
router.get('/initiate-login-as', initiateLoginAs);
router.get('/login-as', loginAs);
router.post('/transaction-line-items', transactionLineItems);
router.post('/initiate-privileged', initiatePrivileged);
router.post('/transition-privileged', transitionPrivileged);
router.post('/cancel-customer', cancelCustomer);
router.post('/decline-offer', declineOffer);
router.post('/customer-accept', customerAccept);
router.post('/recieved-product', productReceived);
router.get('/query-own-listings', queryOwnListings);
router.get('/fetch-users', fetchUsers);
router.post('/fetch-user', fetchUser);
router.post('/publish-draft', publishDraft);
router.post('/delete-account', deleteAccount);
router.post('/delete-listing', deleteListing);

router.post('/open-listing', openListing);
router.post('/close-listing', closeListing);
// Create user with identity provider (e.g. Facebook or Google)
// This endpoint is called to create a new user after user has confirmed
// they want to continue with the data fetched from IdP (e.g. name and email)
router.post('/auth/create-user-with-idp', createUserWithIdp);

// Facebook authentication endpoints

// This endpoint is called when user wants to initiate authenticaiton with Facebook
router.get('/auth/facebook', authenticateFacebook);

// This is the route for callback URL the user is redirected after authenticating
// with Facebook. In this route a Passport.js custom callback is used for calling
// loginWithIdp endpoint in Flex API to authenticate user to Flex
router.get('/auth/facebook/callback', authenticateFacebookCallback);

// Google authentication endpoints

// This endpoint is called when user wants to initiate authenticaiton with Google
router.get('/auth/google', authenticateGoogle);

// This is the route for callback URL the user is redirected after authenticating
// with Google. In this route a Passport.js custom callback is used for calling
// loginWithIdp endpoint in Flex API to authenticate user to Flex
router.get('/auth/google/callback', authenticateGoogleCallback);

router.get('/transaction-history', transactionHistory);

router.post('/invite-friend', inviteFriend);
router.post('/accept-offer', acceptOffer);
router.post('/join-via-invite', joinViaInvite);
router.post('/create-payment-intent', createPaymentIntent);
router.post('/sendSune', sendSune);

module.exports = router;
