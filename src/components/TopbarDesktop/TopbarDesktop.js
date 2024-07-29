import React, { useState, useEffect } from 'react';
import { bool, func, object, number, string } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from '../../util/reactIntl';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  ListingLink,
  OwnListingLink,
  NotificationBadge,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './TopbarDesktop.module.css';
import { parse } from 'query-string';

const TopbarDesktopComponent = props => {
  const {
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    notificationCount,
    intl,
    history,
    appConfig,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    isCurrentUserClient,
    handleSignupInformation,
  } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const classes = classNames(rootClassName || css.root, className);
  const location = useLocation();
  const pathname = parse(location?.search)?.keywords;

  const initialSearchFormValues = {
    keywords: pathname || '',
  };
  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      currentPage={currentPage}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
      appConfig={appConfig}
    />
  );

  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

  const inboxLink = authenticatedOnClientSide ? (
    <NamedLink
      className={css.inboxLink}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <span className={css.inbox}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  ) : null;
  const purchaseSuneLink = authenticatedOnClientSide ? (
    <NamedLink className={css.inboxLink} name="SunePurchasePage">
      <span className={css.inbox}>{intl.formatMessage({ id: 'Topbar.purchaseSune' })}</span>
    </NamedLink>
  ) : null;
  const suneBalance = authenticatedOnClientSide ? (
    <NamedLink className={css.inboxLink} name="SuneBalancePage">
      <span className={css.inbox}>{intl.formatMessage({ id: 'TopbarDesktop.suneBalance' })}</span>
    </NamedLink>
  ) : null;
  const inviteFriend = authenticatedOnClientSide ? (
    <NamedLink className={css.inboxLink} name="InviteFriendPage">
      <span className={css.inbox}>{intl.formatMessage({ id: 'TopbarDesktop.inviteFriend' })}</span>
    </NamedLink>
  ) : null;
  const searchListing = (
    <NamedLink className={css.inboxLink} name="LandingPage">
      <span className={css.inbox}>{intl.formatMessage({ id: 'TopbarDesktop.searchListing' })}</span>
    </NamedLink>
  );
  const providerNotificationBadge =
    notificationCount > 0 ? <NotificationBadge count={notificationCount} /> : null;
  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const profileMenu = authenticatedOnClientSide ? (
    <Menu>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        <Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        <MenuItem key="ManageListingsPage" disabled={isCurrentUserClient}>
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('ManageListingsPage'))}
            name="ManageListingsPage"
            params={{ tab: 'published-or-waiting-approval' }}
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.yourListingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="ProfileSettingsPage">
          <NamedLink
            className={classNames(css.profileSettingsLink, currentPageClass('ProfileSettingsPage'))}
            name="ProfileSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="AccountSettingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem>

        <MenuItem key="SuneBalancePage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('SuneBalancePage'))}
            name="SuneBalancePage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.suneBalance" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="InviteFriendPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('InviteFriendPage'))}
            name="InviteFriendPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.inviteFriend" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  ) : null;

  const signupLink = isAuthenticatedOrJustHydrated ? null : (
    <div onClick={handleSignupInformation} className={css.signupLink}>
      <span className={css.signup}>
        <FormattedMessage id="TopbarDesktop.signup" />
      </span>
    </div>
  );
  const inboxPageLinks = (
    <Menu>
      <MenuLabel className={css.inboxLink}>
        <span className={css.inbox}>
          <FormattedMessage id="TopbarDesktop.inbox" />
          {notificationDot}
        </span>
      </MenuLabel>
      <MenuContent className={css.profileMenuContentInbox}>
        <MenuItem key="orders">
          <NamedLink
            className={classNames(css.yourListingsLink)}
            name="InboxPage"
            params={{ tab: 'orders' }}
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="InboxPage.ordersTabTitle" />
          </NamedLink>
        </MenuItem>

        <MenuItem key="sales">
          <NamedLink
            className={classNames(css.yourListingsLink)}
            name="InboxPage"
            params={{ tab: 'sales' }}
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="InboxPage.salesTabTitle" />
            <span>{providerNotificationBadge}</span>
          </NamedLink>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
  const loginLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="LoginPage" className={css.loginLink}>
      <span className={css.login}>
        <FormattedMessage id="TopbarDesktop.login" />
      </span>
    </NamedLink>
  );

  const listingLink =
    authenticatedOnClientSide && currentUserListingFetched && currentUserListing ? (
      <ListingLink
        className={css.createListingLink}
        listing={currentUserListing}
        children={
          <span className={css.createListing}>
            <FormattedMessage id="TopbarDesktop.viewListing" />
          </span>
        }
      />
    ) : null;

  // const createListingLink =
  //   isAuthenticatedOrJustHydrated && !(currentUserListingFetched && !currentUserListing) ? null : (
  //     <NamedLink className={css.createListingLink} name="NewListingPage">
  //       <span className={css.createListing}>
  //         <FormattedMessage id="TopbarDesktop.createListing" />
  //       </span>
  //     </NamedLink>
  //   );

  return (
    <nav className={classes}>
      <NamedLink className={css.logoLink} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>
      {search}
      {/* <NamedLink name="CMSPage" params={{ pageId: 'blog' }} className={css.inboxLink}>
        <span className={css.inbox}>
          {' '}
          <FormattedMessage id="Footer.Footer.blogLabel" />
        </span>
      </NamedLink> */}
      {/* {searchListing} */}
      <Menu>
        <MenuLabel>
          {/* {isAuthenticated ? ( */}
            <span className={css.createListingLink}>
              + {intl.formatMessage({ id: 'listingType.listingAdd' })}
            </span>
          {/* ) : null} */}
        </MenuLabel>
        <MenuContent
          style={{ padding: '1rem 0', width: '220px' }}
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
          <MenuItem key="d">
            <NamedLink
              name="SelectCategoryPage"
              className={css.jobseekerPopupLink}
              params={{ category: 'vacanze' }}
            >
              <span className={css.menuItemBorder} />
              <span>{intl.formatMessage({ id: 'listingType.vacanze' })}</span>
            </NamedLink>
          </MenuItem>
        </MenuContent>
      </Menu>

      {/* <NamedLink className={css.createListingLink} name="NewListingPage">
        <span className={css.createListing}>
          <FormattedMessage id="TopbarDesktop.createListing" />
        </span>
      </NamedLink> */}

      {suneBalance}
      {inviteFriend}
      {purchaseSuneLink}
      {/* {inboxPageLinks} */}
      {/* {inboxLink} */}
      {profileMenu}
      {signupLink}
      {loginLink}
    </nav>
  );
};

TopbarDesktopComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarDesktopComponent.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

const TopbarDesktop = compose(withRouter, injectIntl)(TopbarDesktopComponent);
export default TopbarDesktop;
