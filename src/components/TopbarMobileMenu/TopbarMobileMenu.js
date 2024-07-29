/**
 *  TopbarMobileMenu prints the menu content for authenticated user or
 * shows login actions for those who are not authenticated.
 */
import React from 'react';
import { bool, func, number, string } from 'prop-types';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import {
  AvatarLarge,
  InlineTextButton,
  NamedLink,
  NotificationBadge,
  OwnListingLink,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
} from '../../components';
import { useLocation } from 'react-router-dom';
import css from './TopbarMobileMenu.module.css';

const TopbarMobileMenu = props => {
  const {
    isAuthenticated,
    currentPage,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    currentUser,
    notificationCount,
    onLogout,
    intl,
  } = props;

  const user = ensureCurrentUser(currentUser);
  const location = useLocation();
  const pathname = location?.pathname;
  if (!isAuthenticated) {
    // const signup = (
    //   <NamedLink name="SignupPage" className={css.signupLink}>
    //     <FormattedMessage id="TopbarMobileMenu.signupLink" />
    //   </NamedLink>
    // );

    const login = (
      <NamedLink name="LoginPage" className={css.loginLink}>
        <FormattedMessage id="TopbarMobileMenu.loginLink" />
      </NamedLink>
    );

    const signupOrLogin = (
      <span className={css.authenticationLinks}>
        <FormattedMessage id="TopbarMobileMenu.signupOrLogin" values={{ signup: '', login }} />
      </span>
    );
    return (
      <div className={css.root}>
        <div className={css.content}>
          <div className={css.authenticationGreeting}>
            <FormattedMessage
              id="TopbarMobileMenu.unauthorizedGreeting"
              values={{ lineBreak: <br />, signupOrLogin }}
            />
          </div>
          <p className={css.subHeading}>
            <FormattedMessage
              id="LoginForm.LoginForm.note"
              values={{
                link: <a href="mailto:info@swappiamo.it">info@swappiamo.it </a>,
              }}
            />
          </p>
          {/* <NamedLink name="CMSPage" params={{ pageId: 'blog' }} className={css.navigationLink}>
            <span className={css.menuItemBorder} />{' '}
            <FormattedMessage id="Footer.Footer.blogLabel" />
          </NamedLink> */}
        </div>

        {/* {currentUserHasListings ? null : (
          <>
            <NamedLink
              name="SelectCategoryPage"
              className={css.servicePopupLink}
              params={{ category: 'service', type: 'new' }}
            >
              <span className={css.menuItemBorder} />
              <span>Service</span>
            </NamedLink>
            <NamedLink
              name="NewListingPageWithCategories"
              className={css.jobseekerPopupLink}
              params={{ category: 'product', type: 'new' }}
            >
              <span className={css.menuItemBorder} />
              <span>Product</span>
            </NamedLink>
          </>
        )} */}
      </div>
    );
  }

  const notificationCountBadge =
    notificationCount > 0 ? (
      <NotificationBadge className={css.notificationBadge} count={notificationCount} />
    ) : null;

  const displayName = user.attributes.profile.firstName;
  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };
  const suneBalance = (
    <NamedLink className={css.navigationLink} name="SuneBalancePage">
      <span className={css.navigationLink}>
        <FormattedMessage id="TopbarMobileMenu.suneBalance" />
      </span>
    </NamedLink>
  );

  return (
    <div className={css.root}>
      <AvatarLarge className={css.avatar} user={currentUser} />
      <div className={css.content}>
        <span className={css.greeting}>
          <FormattedMessage id="TopbarMobileMenu.greeting" values={{ displayName }} />
        </span>
        <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
          <FormattedMessage id="TopbarMobileMenu.logoutLink" />
        </InlineTextButton>
        {/* <Menu className={classNames(css.listingLink, currentPageClass('SelectCategoryPage'))}>
          <MenuLabel>
            {isAuthenticated ? (
              <span className={css.createListingLink}>
                + {intl.formatMessage({ id: 'listingType.listingAdd' })}
              </span>
            ) : null}
          </MenuLabel>
          <MenuContent
            style={{ padding: '1rem 0', width: '220px' }}
            className={css.profileMenuContent}
          >
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
            <MenuItem key="b">
              <NamedLink
                name="SelectCategoryPage"
                className={css.servicePopupLink}
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
          </MenuContent>
        </Menu> */}
        {/* <NamedLink
          className={classNames(css.inbox, currentPageClass('InboxPage'))}
          name="InboxPage"
          params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
        >
          <FormattedMessage id="TopbarMobileMenu.inboxLink" />
          {notificationCountBadge}
        </NamedLink> */}
        {/* <OwnListingLink
          listing={currentUserListing}
          listingFetched={currentUserListingFetched}
          className={css.navigationLink}
        /> */}
        <NamedLink
          className={classNames(css.invitationLink, currentPageClass('InviteFriendPage'))}
          name="InviteFriendPage"
        >
          <span className={css.menuItemBorder} />
          <FormattedMessage id="TopbarDesktop.inviteFriend" />
        </NamedLink>
        <NamedLink
          name="SunePurchasePage"
          className={classNames(css.purchase, currentPageClass('SunePurchasePage'))}
        >
          <span className={css.menuItemBorder} />
          <span>{intl.formatMessage({ id: 'Topbar.purchaseSune' })}</span>
        </NamedLink>
        <NamedLink
          className={classNames(css.purchase, currentPageClass('ManageListingsPage'))}
          name="ManageListingsPage"
          params={{ tab: 'published-or-waiting-approval' }}
        >
          <span className={css.menuItemBorder} />
          <FormattedMessage id="TopbarDesktop.yourListingsLink" />
        </NamedLink>
        <NamedLink
          className={classNames(css.thirdLink, currentPageClass('ProfileSettingsPage'))}
          name="ProfileSettingsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.profileSettingsLink" />
        </NamedLink>
        <NamedLink
          className={classNames(css.thirdLink, currentPageClass('AccountSettingsPage'))}
          name="AccountSettingsPage"
        >
          <FormattedMessage id="TopbarMobileMenu.accountSettingsLink" />
        </NamedLink>

        {/* {suneBalance} */}

        {/* <NamedLink
          name="SelectCategoryPage"
          className={css.navigationLink}
          params={{ category: 'service', type: 'new' }}
        >
          <span className={css.menuItemBorder} />
          <span>{intl.formatMessage({ id: 'listingType.service' })}</span>
        </NamedLink>
        <NamedLink
          name="SelectCategoryPage"
          className={css.navigationLink}
          params={{ category: 'product', type: 'new' }}
        >
          <span className={css.menuItemBorder} />
          <span>{intl.formatMessage({ id: 'listingType.product' })}</span>
        </NamedLink>
        <NamedLink name="CMSPage" params={{ pageId: 'blog' }} className={css.navigationLink}>
          <span className={css.menuItemBorder} /> <FormattedMessage id="Footer.Footer.blogLabel" />
        </NamedLink> */}
      </div>
    </div>
  );
};

TopbarMobileMenu.defaultProps = {
  currentUser: null,
  notificationCount: 0,
  currentPage: null,
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarMobileMenu.propTypes = {
  isAuthenticated: bool.isRequired,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  notificationCount: number,
  onLogout: func.isRequired,
};

export default injectIntl(TopbarMobileMenu);
