import React from 'react';
import loadable from '@loadable/component';
import getPageDataLoadingAPI from './containers/pageDataLoadingAPI';
import { NotFoundPage } from './containers';

// routeConfiguration needs to initialize containers first
// Otherwise, components will import form container eventually and
// at that point css bundling / imports will happen in wrong order.
import { NamedRedirect } from './components';
import LoadingPage from './containers/LoadingPage/LoadingPage'
const pageDataLoadingAPI = getPageDataLoadingAPI();
import PreviewResolverPage from './containers/PreviewResolverPage/PreviewResolverPage';
const AboutPage = loadable(() => import(/* webpackChunkName: "AboutPage" */ './containers/AboutPage/AboutPage'),{ fallback: <LoadingPage /> });
const AuthenticationPage = loadable(() => import(/* webpackChunkName: "AuthenticationPage" */ './containers/AuthenticationPage/AuthenticationPage'),{ fallback: <LoadingPage /> });
const CMSPage = loadable(() => import(/* webpackChunkName: "CMSPage" */ './containers/CMSPage/CMSPage'));
const CheckoutPage = loadable(() => import(/* webpackChunkName: "CheckoutPage" */ './containers/CheckoutPage/CheckoutPage'),{ fallback: <LoadingPage /> });
const ContactDetailsPage = loadable(() => import(/* webpackChunkName: "ContactDetailsPage" */ './containers/ContactDetailsPage/ContactDetailsPage'),{ fallback: <LoadingPage /> });
const EditListingPage = loadable(() => import(/* webpackChunkName: "EditListingPage" */ './containers/EditListingPage/EditListingPage'),{ fallback: <LoadingPage /> });
const EmailVerificationPage = loadable(() => import(/* webpackChunkName: "EmailVerificationPage" */ './containers/EmailVerificationPage/EmailVerificationPage'),{ fallback: <LoadingPage /> });
const InboxPage = loadable(() => import(/* webpackChunkName: "InboxPage" */ './containers/InboxPage/InboxPage'),{ fallback: <LoadingPage /> });
const LandingPage = loadable(() => import(/* webpackChunkName: "LandingPage" */ './containers/LandingPage/LandingPage'),{ fallback: <LoadingPage /> });
const ListingPage = loadable(() => import(/* webpackChunkName: "ListingPage" */ /* webpackPrefetch: true */ './containers/ListingPage/ListingPage'),{ fallback: <LoadingPage /> });
const PasswordChangePage = loadable(() => import(/* webpackChunkName: "PasswordChangePage" */ './containers/PasswordChangePage/PasswordChangePage'),{ fallback: <LoadingPage /> });
const PasswordRecoveryPage = loadable(() => import(/* webpackChunkName: "PasswordRecoveryPage" */ './containers/PasswordRecoveryPage/PasswordRecoveryPage'),{ fallback: <LoadingPage /> });
const PasswordResetPage = loadable(() => import(/* webpackChunkName: "PasswordResetPage" */ './containers/PasswordResetPage/PasswordResetPage'),{ fallback: <LoadingPage /> });
const PaymentMethodsPage = loadable(() => import(/* webpackChunkName: "PaymentMethodsPage" */ './containers/PaymentMethodsPage/PaymentMethodsPage'),{ fallback: <LoadingPage /> });
const PrivacyPolicyPage = loadable(() => import(/* webpackChunkName: "PrivacyPolicyPage" */ './containers/PrivacyPolicyPage/PrivacyPolicyPage'),{ fallback: <LoadingPage /> });
const ProfilePage = loadable(() => import(/* webpackChunkName: "ProfilePage" */ './containers/ProfilePage/ProfilePage'),{ fallback: <LoadingPage /> });
const ProfileSettingsPage = loadable(() => import(/* webpackChunkName: "ProfileSettingsPage" */ './containers/ProfileSettingsPage/ProfileSettingsPage'),{ fallback: <LoadingPage /> });
const SearchPage = loadable(() => import(/* webpackChunkName: "SearchPage" */ /* webpackPrefetch: true */  './containers/SearchPage/SearchPage'),{ fallback: <LoadingPage /> });
const StripePayoutPage = loadable(() => import(/* webpackChunkName: "StripePayoutPage" */ './containers/StripePayoutPage/StripePayoutPage'),{ fallback: <LoadingPage /> });
const TermsOfServicePage = loadable(() => import(/* webpackChunkName: "TermsOfServicePage" */ './containers/TermsOfServicePage/TermsOfServicePage'),{ fallback: <LoadingPage /> });
const TransactionPage = loadable(() => import(/* webpackChunkName: "TransactionPage" */ './containers/TransactionPage/TransactionPage'),{ fallback: <LoadingPage /> });
const SelectCategoryPage = loadable(() => import(/* webpackChunkName: "TransactionPage" */ './containers/SelectCategoryPage/SelectCategoryPage'),{ fallback: <LoadingPage /> });
const ManageListingsPage = loadable(() => import(/* webpackChunkName: "ManageListingsPage" */ './containers/ManageListingsPage/ManageListingsPage'),{ fallback: <LoadingPage /> });
// Styleguide helps you to review current components and develop new ones
const StyleguidePage = loadable(() => import(/* webpackChunkName: "StyleguidePage" */ './containers/StyleguidePage/StyleguidePage'),{ fallback: <LoadingPage /> });
const SunePurchasePage = loadable(() => import(/* webpackChunkName: "SunePurchasePage" */ './containers/SunePurchasePage/SunePurchasePage'),{ fallback: <LoadingPage /> });
const SubscriptionPage = loadable(() => import(/* webpackChunkName: "SubscriptionPage" */ './containers/SubscriptionPage/SubscriptionPage'),{ fallback: <LoadingPage /> });
const SuccessPage = loadable(() => import(/* webpackChunkName: "SuccessPage" */ './containers/SubscriptionPage/SuccessPage'),{ fallback: <LoadingPage /> });

const SuneBalancePage =loadable(()=>import(/* webpackChunkName: "SuccessPage" */ './containers/SuneBalancePage/SuneBalancePage'),{ fallback: <LoadingPage /> });
const InviteFriendPage =loadable(() => import(/* webpackChunkName: "InviteFriendPage" */ './containers/InviteFriendPage/InviteFriendPage'),{ fallback: <LoadingPage /> });
const HowSwappimoWorksPage =loadable(() => import(/* webpackChunkName: "HowSwappimoWorksPage" */ './containers/HowSwappimoWorksPage/HowSwappimoWorksPage'),{ fallback: <LoadingPage /> });
const WhatAreSunePage =loadable(() => import(/* webpackChunkName: "WhatAreSunePage" */ './containers/WhatAreSunePage/WhatAreSunePage'),{ fallback: <LoadingPage /> });
const HowToEarnSunePage =loadable(() => import(/* webpackChunkName: "HowToEarnSunePage" */ './containers/HowToEarnSunePage/HowToEarnSunePage'),{ fallback: <LoadingPage /> });
const MembershipPage =loadable(() => import(/* webpackChunkName: "MembershipPage" */ './containers/MembershipPage/MembershipPage'),{ fallback: <LoadingPage /> });
const AboutUsPage =loadable(() => import(/* webpackChunkName: "AboutUsPage" */ './containers/AboutUsPage/AboutUsPage'),{ fallback: <LoadingPage /> });
const OurMissionPage =loadable(() => import(/* webpackChunkName: "OurMissionPage" */ './containers/OurMissionPage/OurMissionPage'),{ fallback: <LoadingPage /> });
const FAQsPage =loadable(() => import(/* webpackChunkName: "FAQsPage" */ './containers/FAQsPage/FAQsPage'),{ fallback: <LoadingPage /> });
const ContactUsPage =loadable(() => import(/* webpackChunkName: "ContactUsPage" */ './containers/ContactUsPage/ContactUsPage'),{ fallback: <LoadingPage /> });
const HowProductExchangeWorksPage = loadable(() => import( /* webpackChunkName: "HowProductExchangeWorksPage" */ './containers/HowProductExchangeWorksPage/HowProductExchangeWorksPage' ), { fallback: <LoadingPage /> });
const HowDoesShippingWorkPage = loadable(() => import( /* webpackChunkName: "HowDoesShippingWorkPage" */ './containers/HowDoesShippingWorkPage/HowDoesShippingWorkPage' ), { fallback: <LoadingPage /> });
const HowServiceExchangeWorksPage = loadable(() => import( /* webpackChunkName: "HowServiceExchangeWorksPage" */ './containers/HowServiceExchangeWorksPage/HowServiceExchangeWorksPage' ), { fallback: <LoadingPage /> });
const DeleteAccountPage = loadable(() => import('./containers/DeleteAccountPage/DeleteAccountPage'))
export const ACCOUNT_SETTINGS_PAGES = [
  'ContactDetailsPage',
  'PasswordChangePage',
  'StripePayoutPage',
  'PaymentMethodsPage',
];

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

// NOTE: Most server-side endpoints are prefixed with /api. Requests to those
// endpoints are indended to be handled in the server instead of the browser and
// they will not render the application. So remember to avoid routes starting
// with /api and if you encounter clashing routes see server/index.js if there's
// a conflicting route defined there.

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = () => {
  return [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      loadData: pageDataLoadingAPI.LandingPage.loadData,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/preview',
      name: 'PreviewResolverPage',
      component: PreviewResolverPage ,
    },
    {
      path: '/p/:pageId',
      name: 'CMSPage',
      component: CMSPage,
      loadData: pageDataLoadingAPI.CMSPage.loadData,
    },
    {
      path: '/s',
      name: 'SearchPage',
      component: SearchPage,
      loadData: pageDataLoadingAPI.SearchPage.loadData,
    },
    {
      path: '/purchase-sune',
      name: 'SunePurchasePage',
      component: SunePurchasePage,
      auth: true,
      authPage: 'LoginPage'
    },
    {
      path: '/topup/:id',
      name: 'SubscriptionPage',
      component: SubscriptionPage,
      auth: true,
      authPage: 'LoginPage'
    },
    {
      path: '/success',
      name: 'SubscriptionSuccessPage',
      component: SuccessPage,
      auth: true,
      authPage: 'LoginPage'
    },
    {
      path: '/l',
      name: 'ListingBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/l/:slug/:id',
      name: 'ListingPage',
      component: ListingPage,
      loadData: pageDataLoadingAPI.ListingPage.loadData,
    },

    {
      path: '/l/:slug/:id/checkout',
      name: 'CheckoutPage',
      auth: true,
      component: CheckoutPage,
      setInitialValues: pageDataLoadingAPI.CheckoutPage.setInitialValues,
    },
    {
      path: '/l/:slug/:id/:variant',
      name: 'ListingPageVariant',
      auth: true,
      authPage: 'LoginPage',
      component: ListingPage,
      loadData: pageDataLoadingAPI.ListingPage.loadData,
    },
    {
      path: '/select/:category/subcategory',
      name: 'SelectCategoryPage',
      auth: true,
      component: (props) => <SelectCategoryPage {...props} />
    },
    {
      path: '/l/new',
      name: 'NewListingPage',
      auth: true,
      component: () => (
        <NamedRedirect
          name="EditListingPage"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
        />
      ),
    },
    {
      path: '/listing/create/:category?/:subcategory?',
      name: 'NewListingPageWithCategories',
      auth: true,
      component: ({params}) => (
        <NamedRedirect
          name="EditListingPage"
          params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description',  category: params.category, subcategory: params.subcategory }}
        />
      ),
    },
    {
      path: '/l/:slug/:id/:type/:tab/:category?/:subcategory?',
      name: 'EditListingPage',
      auth: true,
      component: EditListingPage,
      // extraProps: { allowOnlyOneListing: true },
      loadData: pageDataLoadingAPI.EditListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/:type/:tab/:returnURLType',
      name: 'EditListingStripeOnboardingPage',
      auth: true,
      component: EditListingPage,
      loadData: pageDataLoadingAPI.EditListingPage.loadData,
    },

    // Canonical path should be after the `/l/new` path since they
    // conflict and `new` is not a valid listing UUID.
    {
      path: '/l/:id',
      name: 'ListingPageCanonical',
      component: ListingPage,
      loadData: pageDataLoadingAPI.ListingPage.loadData,
    },
    {
      path: '/u',
      name: 'ProfileBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/u/:id',
      name: 'ProfilePage',
      component: ProfilePage,
      loadData: pageDataLoadingAPI.ProfilePage.loadData,
    },
    {
      path: '/profile-settings',
      name: 'ProfileSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: ProfileSettingsPage,
    },
    {
      path: '/sune',
      name: 'SuneBalancePage',
      auth: true,
      authPage: 'LoginPage',
      component: SuneBalancePage,
      loadData: pageDataLoadingAPI.SuneBalancePage.loadData,
    },

    // Note: authenticating with IdP (e.g. Facebook) expects that /login path exists
    // so that in the error case users can be redirected back to the LoginPage
    // In case you change this, remember to update the route in server/api/auth/loginWithIdp.js
    {
      path: '/login',
      name: 'LoginPage',
      component: AuthenticationPage,
      extraProps: { tab: 'login' },
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: AuthenticationPage,
      extraProps: { tab: 'signup' },
    },
    {
      path: '/join/:id',
      name: 'JoinPage',
      component: AuthenticationPage,
      extraProps: { tab: 'signup' },
    },
    {
      path: '/confirm/:id?',
      name: 'ConfirmPage',
      component: AuthenticationPage,
      extraProps: { tab: 'confirm' },
    },
    {
      path: '/recover-password',
      name: 'PasswordRecoveryPage',
      component: PasswordRecoveryPage,
    },
    {
      path: '/inbox',
      name: 'InboxBasePage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
    },
    {
      path: '/invite',
      name: 'InviteFriendPage',
      auth: true,
      authPage: 'LoginPage',
      component: InviteFriendPage,
    },
    {
      path: '/inbox/:tab',
      name: 'InboxPage',
      auth: true,
      authPage: 'LoginPage',
      component: InboxPage,
      loadData: pageDataLoadingAPI.InboxPage.loadData,
    },
    {
      path: '/order/:id',
      name: 'OrderPage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="OrderDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/order/:id/details',
      name: 'OrderDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: TransactionPage,
      extraProps: { transactionRole: 'customer' },
      loadData: params =>
        pageDataLoadingAPI.TransactionPage.loadData({ ...params, transactionRole: 'customer' }),
      setInitialValues: pageDataLoadingAPI.TransactionPage.setInitialValues,
    },
    {
      path: '/sale/:id',
      name: 'SalePage',
      auth: true,
      authPage: 'LoginPage',
      component: props => <NamedRedirect name="SaleDetailsPage" params={{ ...props.params }} />,
    },
    {
      path: '/sale/:id/details',
      name: 'SaleDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: TransactionPage,
      extraProps: { transactionRole: 'provider' },
      loadData: params =>
        pageDataLoadingAPI.TransactionPage.loadData({ ...params, transactionRole: 'provider' }),
    },
    {
      path: '/account',
      name: 'AccountSettingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: () => <NamedRedirect name="ContactDetailsPage" />,
    },
    {
      path: '/account/contact-details',
      name: 'ContactDetailsPage',
      auth: true,
      authPage: 'LoginPage',
      component: ContactDetailsPage,
      loadData: pageDataLoadingAPI.ContactDetailsPage.loadData,
    },
    {
      path: '/account/change-password',
      name: 'PasswordChangePage',
      auth: true,
      authPage: 'LoginPage',
      component: PasswordChangePage,
    },
    {
      path: '/account/delete-account',
      name: 'DeleteAccountPage',
      auth: true,
      authPage: 'LoginPage',
      component: DeleteAccountPage,
    },
    {
      path: '/account/payments',
      name: 'StripePayoutPage',
      auth: true,
      authPage: 'LoginPage',
      component: StripePayoutPage,
      // component: () => <NamedRedirect name="LandingPage" />,

      loadData: pageDataLoadingAPI.StripePayoutPage.loadData,
    },
    {
      path: '/account/payments/:returnURLType',
      name: 'StripePayoutOnboardingPage',
      auth: true,
      authPage: 'LoginPage',
      component: StripePayoutPage,
      loadData: pageDataLoadingAPI.StripePayoutPage.loadData,
    },
    {
      path: '/account/payment-methods',
      name: 'PaymentMethodsPage',
      auth: true,
      authPage: 'LoginPage',
      component: PaymentMethodsPage,
      // component: () => <NamedRedirect name="LandingPage" />,
      loadData: pageDataLoadingAPI.PaymentMethodsPage.loadData,
    },
    {
      path: '/terms-of-service',
      name: 'TermsOfServicePage',
      component: TermsOfServicePage,
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicyPage',
      component: PrivacyPolicyPage,
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      component: StyleguidePage,
    },
    {
      path: '/styleguide/g/:group',
      name: 'StyleguideGroup',
      component: StyleguidePage,
    },
    {
      path: '/styleguide/c/:component',
      name: 'StyleguideComponent',
      component: StyleguidePage,
    },
    {
      path: '/styleguide/c/:component/:example',
      name: 'StyleguideComponentExample',
      component: StyleguidePage,
    },
    {
      path: '/styleguide/c/:component/:example/raw',
      name: 'StyleguideComponentExampleRaw',
      component: StyleguidePage,
      extraProps: { raw: true },
    },
    {
      path: '/listings/:tab?',
      name: 'ManageListingsPage',
      auth: true,
      authPage: 'LoginPage',
      component: ManageListingsPage,
      loadData: pageDataLoadingAPI.ManageListingsPage.loadData,
    },
    {
      path: '/notfound',
      name: 'NotFoundPage',
      component: props => <NotFoundPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /reset-password endpoint
    {
      path: '/reset-password',
      name: 'PasswordResetPage',
      component: PasswordResetPage ,
    },

    // Do not change this path!
    //
    // The API expects that the application implements /verify-email endpoint
    {
      path: '/verify-email',
      name: 'EmailVerificationPage',
      auth: true,
      authPage: 'LoginPage',
      component: EmailVerificationPage,
      loadData: pageDataLoadingAPI.EmailVerificationPage.loadData,
    },
    {
      path: '/how-swappiamo-works',
      name: 'HowSwappiamoWorksPage',
      component: HowSwappimoWorksPage,
    },
    {
      path: '/what-are-sune',
      name: 'WhatAreSunePage',
      component: WhatAreSunePage,
    },
    {
      path: '/payments',
      name: 'HowToEarnSunePage',
      component: HowToEarnSunePage,
    },
    {
      path: '/membership',
      name: 'MembershipPage',
      component: MembershipPage,
    },
    {
      path: '/about-us',
      name: 'AboutUsPage',
      component: AboutUsPage,
    },
    {
      path: '/our-mission',
      name: 'OurMissionPage',
      component: OurMissionPage,
    },
    {
      path: '/faqs',
      name: 'FAQsPage',
      component: FAQsPage,
    },
    {
      path: '/reviews',
      name: 'ContactUsPage',
      component: ContactUsPage,
    },
    {
      path: '/how-add-listing'
      ,name: "HowProductExchangeWorksPage",
      component: HowProductExchangeWorksPage,
    }, 
    
    {
      path: '/transactions',
      name: 'HowDoesShippingWorkPage',
      component: HowDoesShippingWorkPage,
    }
    , {
      path: '/community',
      name: 'HowServiceExchangeWorksPage',
      component: HowServiceExchangeWorksPage,
    }


    

  ];
};

export default routeConfiguration;
