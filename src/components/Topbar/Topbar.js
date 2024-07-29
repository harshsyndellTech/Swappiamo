import React, { Component } from 'react';
import { array, bool, func, number, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import pickBy from 'lodash/pickBy';
import classNames from 'classnames';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { withViewport } from '../../util/contextHelpers';
import { parse, stringify } from '../../util/urlHelpers';
import { createResourceLocatorString, pathByRouteName } from '../../util/routes';
import { propTypes } from '../../util/types';
import { AiOutlineHome } from 'react-icons/ai';
import { IoWalletOutline } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import { CgAddR } from 'react-icons/cg';
import { RiMessage2Line } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import { TiThMenu } from 'react-icons/ti';
import { isMainSearchTypeKeywords, isOriginInUse } from '../../util/search';
import {
  Button,
  LimitedAccessBanner,
  Logo,
  Modal,
  ModalMissingInformation,
  NamedLink,
  TopbarDesktop,
  TopbarMobileMenu,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';

import css from './Topbar.module.css';
import SignupModalInformation from './SignupModalInformation';

const MAX_MOBILE_SCREEN_WIDTH = 768;

const redirectToURLWithModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const searchString = `?${stringify({ [modalStateParam]: 'open', ...parse(search) })}`;
  history.push(`${pathname}${searchString}`, state);
};

const redirectToURLWithoutModalState = (props, modalStateParam) => {
  const { history, location } = props;
  const { pathname, search, state } = location;
  const queryParams = pickBy(parse(search), (v, k) => {
    return k !== modalStateParam;
  });
  const stringified = stringify(queryParams);
  const searchString = stringified ? `?${stringified}` : '';
  history.push(`${pathname}${searchString}`, state);
};

const GenericError = props => {
  const { show } = props;
  const classes = classNames(css.genericError, {
    [css.genericErrorVisible]: show,
  });
  return (
    <div className={classes}>
      <div className={css.genericErrorContent}>
        <p className={css.genericErrorText}>
          <FormattedMessage id="Topbar.genericError" />
        </p>
      </div>
    </div>
  );
};

GenericError.propTypes = {
  show: bool.isRequired,
};

class TopbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { signupInformation: false };
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    this.handleMobileSearchOpen = this.handleMobileSearchOpen.bind(this);
    this.handleMobileSearchClose = this.handleMobileSearchClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMobileMenuOpen() {
    redirectToURLWithModalState(this.props, 'mobilemenu');
  }

  handleMobileMenuClose() {
    redirectToURLWithoutModalState(this.props, 'mobilemenu');
  }

  handleMobileSearchOpen() {
    redirectToURLWithModalState(this.props, 'mobilesearch');
  }

  handleMobileSearchClose() {
    redirectToURLWithoutModalState(this.props, 'mobilesearch');
  }

  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const { history } = this.props;
    console.log('values', values);
    const topbarSearchParams = () => {
      // if (this.props.currentPage === 'SearchPage') {
      //   const { search, selectedPlace } = values?.location??{};
      //   const { origin, bounds } = selectedPlace??{};
      //   const originMaybe = isOriginInUse(config) ? { origin } : {};

      //   return {
      //     ...originMaybe,
      //     address: search,
      //     bounds,
      //   };
      // } else {
      return { keywords: values?.keywords };
      // }
      // topbar search defaults to 'location' search
    };
    const searchParams = {
      ...currentSearchParams,
      ...topbarSearchParams(),
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }

  handleLogout() {
    const { onLogout, history } = this.props;
    onLogout().then(() => {
      const path = pathByRouteName('LandingPage', routeConfiguration());

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      console.log('logged out'); // eslint-disable-line
    });
  }

  render() {
    const {
      className,
      rootClassName,
      desktopClassName,
      mobileRootClassName,
      mobileClassName,
      isAuthenticated,
      authScopes,
      authInProgress,
      currentUser,
      currentUserHasListings,
      currentUserListing,
      currentUserListingFetched,
      currentUserHasOrders,
      currentPage,
      notificationCount,
      viewport,
      intl,
      location,
      onManageDisableScrolling,
      onResendVerificationEmail,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      showGenericError,
    } = this.props;
    const handleSignupInformation = () => {
      this.setState({ signupInformation: true });
    };
    const { mobilemenu, mobilesearch, keywords, address, origin, bounds } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;
    const isMobileMenuOpen = isMobileLayout && mobilemenu === 'open';
    const isMobileSearchOpen = isMobileLayout && mobilesearch === 'open';

    const currentUserId = currentUser?.id?.uuid;

    const mobileMenu = (
      <TopbarMobileMenu
        isAuthenticated={isAuthenticated}
        currentUserHasListings={currentUserHasListings}
        currentUserListing={currentUserListing}
        currentUserListingFetched={currentUserListingFetched}
        currentUser={currentUser}
        onLogout={this.handleLogout}
        notificationCount={notificationCount}
        currentPage={currentPage}
      />
    );

    // Only render current search if full place object is available in the URL params
    // const locationFieldsPresent = config.sortSearchByDistance
    //   ? address && origin && bounds
    //   : address && bounds;
    const topbarSearcInitialValues = () => {
      if (isMainSearchTypeKeywords(config)) {
        return { keywords };
      }

      // Only render current search if full place object is available in the URL params
      const locationFieldsPresent = isOriginInUse(config)
        ? address && origin && bounds
        : address && bounds;
      return {
        location: locationFieldsPresent
          ? {
              search: address,
              selectedPlace: { address, origin, bounds },
            }
          : null,
      };
    };
    const initialSearchFormValues = topbarSearcInitialValues();

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <LimitedAccessBanner
          isAuthenticated={isAuthenticated}
          authScopes={authScopes}
          currentUser={currentUser}
          onLogout={this.handleLogout}
          currentPage={currentPage}
        />
        <div className={classNames(mobileRootClassName || css.container, mobileClassName)}>
          {/* <Button
            rootClassName={css.menu}
            onClick={this.handleMobileMenuOpen}
            title={intl.formatMessage({ id: 'Topbar.menuIcon' })}
          > */}
          <NamedLink className={css.subContainer} name="LandingPage">
            <AiOutlineHome className={css.icon} />
            <p className={css.iconText}>
              <FormattedMessage id="Topbar.Topbar.homeLabel" />
            </p>
          </NamedLink>
          {/* <MenuIcon className={css.menuIcon} /> */}
          {/* {notificationDot} */}
          {/* </Button> */}
          <NamedLink className={css.subContainer} name="SuneBalancePage">
            <IoWalletOutline className={css.icon} />
            <p className={css.iconText}>
              <FormattedMessage id="Topbar.Topbar.searchLabel" />
            </p>
          </NamedLink>

          <Menu>
            <MenuLabel>
              {/* <span className={css.createListingLink}> */}
              <div className={css.subContainer}>
                <CgAddR className={css.icon} />
                <p className={css.iconText}>
                  <FormattedMessage id="Topbar.Topbar.addLabel" />
                </p>
              </div>
              {/* </span> */}
            </MenuLabel>
            <MenuContent
              style={{ padding: '1rem 0', width: '220px', right: 10 }}
              className={css.profileMenuContent}
            >
              {/* {serviceListingId ? null : ( */}
              <MenuItem key="a">
                <NamedLink
                  name="SelectCategoryPage"
                  className={css.servicePopupLink}
                  params={{ category: 'service' }}
                >
                  <span className={css.menuItemBorder} />
                  <span>{intl.formatMessage({ id: 'listingType.service' })}</span>
                </NamedLink>
              </MenuItem>
              {/* )} */}
              <MenuItem key="b">
                <NamedLink
                  name="SelectCategoryPage"
                  className={css.jobseekerPopupLink}
                  params={{ category: 'product' }}
                >
                  <span className={css.menuItemBorder} />
                  <span>{intl.formatMessage({ id: 'listingType.product' })}</span>
                </NamedLink>
              </MenuItem>
              <MenuItem key="c">
                <NamedLink
                  name="NewListingPageWithCategories"
                  className={css.jobseekerPopupLink}
                  params={{ category: 'event' }}
                >
                  <span className={css.menuItemBorder} />
                  <span>{intl.formatMessage({ id: 'listingType.event' })}</span>
                </NamedLink>
              </MenuItem>
              <MenuItem key="c">
                <NamedLink
                  name="NewListingPageWithCategories"
                  className={css.jobseekerPopupLink}
                  params={{ category: 'vacanze' }}
                >
                  <span className={css.menuItemBorder} />
                  <span>{intl.formatMessage({ id: 'listingType.vacanze' })}</span>
                </NamedLink>
              </MenuItem>
            </MenuContent>
          </Menu>

          <NamedLink
            className={css.subContainer}
            name="InboxPage"
            params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
          >
            <RiMessage2Line className={css.icon} />
            <p className={css.iconText}>
              <FormattedMessage id="Topbar.Topbar.messageLabel" />
            </p>
          </NamedLink>
          {currentUserId ? (
            <NamedLink
              className={css.subContainer}
              name="ProfilePage"
              params={{ id: currentUserId }}
            >
              <IoPersonOutline className={css.icon} />
              <p className={css.iconText}>
                <FormattedMessage id="Topbar.Topbar.ExtraLabel" />
              </p>
            </NamedLink>
          ) : (
            <NamedLink className={css.subContainer} name="ProfileSettingsPage">
              <IoPersonOutline className={css.icon} />
              <p className={css.iconText}>
                <FormattedMessage id="Topbar.Topbar.ExtraLabel" />
              </p>
            </NamedLink>
          )}
          {/* <div className={css.subContainer} >
            <TiThMenu className={css.icon}  />
            <p className={css.iconText}>
              <FormattedMessage id="Topbar.Topbar.menuLabel" />
            </p>
          </div> */}
          <div className={css.subContainer} onClick={this.handleMobileMenuOpen}>
            <TiThMenu className={css.icon} />
            <p className={css.iconText}>
              <FormattedMessage id="Topbar.Topbar.menuLabel" />
            </p>
          </div>
          {/* <NamedLink
            className={css.home}
            name="LandingPage"
            title={intl.formatMessage({ id: 'Topbar.logoIcon' })}
          >
            <Logo format="mobile" />
          </NamedLink> */}

          {/* <Button
            rootClassName={css.searchMenu}
            onClick={this.handleMobileSearchOpen}
            title={intl.formatMessage({ id: 'Topbar.searchIcon' })}
          >
            <SearchIcon className={css.searchMenuIcon} />
          </Button> */}
        </div>
        <div className={css.desktop}>
          <TopbarDesktop
            className={desktopClassName}
            currentUserHasListings={currentUserHasListings}
            currentUserListing={currentUserListing}
            currentUserListingFetched={currentUserListingFetched}
            currentUser={currentUser}
            currentPage={currentPage}
            initialSearchFormValues={initialSearchFormValues}
            intl={intl}
            isAuthenticated={isAuthenticated}
            notificationCount={notificationCount}
            onLogout={this.handleLogout}
            onSearchSubmit={this.handleSubmit}
            appConfig={config}
            handleSignupInformation={handleSignupInformation}
          />
        </div>
        <Modal
          id="TopbarMobileMenu"
          isOpen={isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          {authInProgress ? null : mobileMenu}
        </Modal>
        <Modal
          id="signupModal"
          isOpen={this.state.signupInformation}
          onClose={() => {
            this.setState({ signupInformation: false });
          }}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <SignupModalInformation />
        </Modal>
        <Modal
          id="TopbarMobileSearch"
          containerClassName={css.modalContainer}
          isOpen={isMobileSearchOpen}
          onClose={this.handleMobileSearchClose}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.searchContainer}>
            <TopbarSearchForm
              onSubmit={this.handleSubmit}
              initialValues={initialSearchFormValues}
              appConfig={config}
              currentPage={currentPage}
              isMobile
            />
            <p className={css.mobileHelp}>
              <FormattedMessage id="Topbar.mobileSearchHelp" />
            </p>
          </div>
        </Modal>
        <ModalMissingInformation
          id="MissingInformationReminder"
          containerClassName={css.missingInformationModal}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          currentUserHasOrders={currentUserHasOrders}
          location={location}
          onManageDisableScrolling={onManageDisableScrolling}
          onResendVerificationEmail={onResendVerificationEmail}
          sendVerificationEmailInProgress={sendVerificationEmailInProgress}
          sendVerificationEmailError={sendVerificationEmailError}
        />

        <GenericError show={showGenericError} />
      </div>
    );
  }
}

TopbarComponent.defaultProps = {
  className: null,
  rootClassName: null,
  desktopClassName: null,
  mobileRootClassName: null,
  mobileClassName: null,
  notificationCount: 0,
  currentUser: null,
  currentUserHasOrders: null,
  currentPage: null,
  sendVerificationEmailError: null,
  authScopes: [],
};

TopbarComponent.propTypes = {
  className: string,
  rootClassName: string,
  desktopClassName: string,
  mobileRootClassName: string,
  mobileClassName: string,
  isAuthenticated: bool.isRequired,
  authScopes: array,
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onResendVerificationEmail: func.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  showGenericError: bool.isRequired,

  // These are passed from Page to keep Topbar rendering aware of location changes
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Topbar = compose(withViewport, injectIntl)(TopbarComponent);

Topbar.displayName = 'Topbar';

export default Topbar;
