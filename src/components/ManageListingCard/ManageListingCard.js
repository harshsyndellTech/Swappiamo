import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import {
  LINE_ITEM_NIGHT,
  LINE_ITEM_DAY,
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_CLOSED,
  LISTING_STATE_DRAFT,
  propTypes,
} from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureOwnListing } from '../../util/data';
import {
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  LISTING_PAGE_DRAFT_VARIANT,
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
} from '../../util/urlHelpers';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import config from '../../config';
import {
  InlineTextButton,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  IconSpinner,
  ResponsiveImage,
} from '../../components';

import MenuIcon from './MenuIcon';
import Overlay from './Overlay';
import css from './ManageListingCard.module.css';
import {
  listingClosedByLogic,
  listingClosedByUser,
  listingDraft,
  listingPendingApproval,
  listingPublished,
} from './helpers';
import MenuItemWrapper from './MenuItemWrapper';

// Menu content needs the same padding
const MENU_CONTENT_OFFSET = -12;
const MAX_LENGTH_FOR_WORDS_IN_TITLE = 7;

const getMenuItem = (onClick, label, key, listing, menuItemClasses) => {
  return (
    <MenuItem key={key}>
      <InlineTextButton
        rootClassName={menuItemClasses}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          onClick(listing.id);
        }}
      >
        <span>{label}</span>
      </InlineTextButton>
    </MenuItem>
  );
};

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const createListingURL = (routes, listing) => {
  const id = listing.id.uuid;
  const slug =
    listing?.attributes?.title == config.temporaryTitle
      ? createSlug(listing.attributes.title)
      : createSlug(listing.attributes.title);
  const isPendingApproval = listing.attributes.state === LISTING_STATE_PENDING_APPROVAL;
  const isDraft = listing.attributes.state === LISTING_STATE_DRAFT;
  const variant = isDraft
    ? LISTING_PAGE_DRAFT_VARIANT
    : isPendingApproval
    ? LISTING_PAGE_PENDING_APPROVAL_VARIANT
    : null;

  const linkProps =
    isPendingApproval || isDraft
      ? {
          name: 'ListingPageVariant',
          params: {
            id,
            slug,
            variant,
          },
        }
      : {
          name: 'ListingPage',
          params: { id, slug },
        };

  return createResourceLocatorString(linkProps.name, routes, linkProps.params, {});
};

// Cards are not fixed sizes - So, long words in title make flexboxed items to grow too big.
// 1. We split title to an array of words and spaces.
//    "foo bar".split(/([^\s]+)/gi) => ["", "foo", " ", "bar", ""]
// 2. Then we break long words by adding a '<span>' with word-break: 'break-all';
const formatTitle = (title, maxLength) => {
  const nonWhiteSpaceSequence = /([^\s]+)/gi;
  return title.split(nonWhiteSpaceSequence).map((word, index) => {
    return word.length > maxLength ? (
      <span key={index} style={{ wordBreak: 'break-all' }}>
        {word}
      </span>
    ) : (
      word
    );
  });
};

const AD_TYPE_CHANGE_CLOSE_REASON = 'ad-type-change-close-reason';
const CATEGORY_CHANGE_CLOSE_REASON = 'category-change-close-reason';
const NO_IMAGE_ON_BUY_OR_SELL_REASON = 'no-image-on-buy-or-sell-reason';
const CLOSE_ON_CATEGORY_NOT_AVAILABLE_REASON = 'close-on-category-not-available-reason';

export const ManageListingCardComponent = props => {
  const {
    className,
    rootClassName,
    hasClosingError,
    hasOpeningError,
    history,
    intl,
    isMenuOpen,
    actionsInProgressListingId,
    listing,
    onCloseListing,
    onOpenListing,
    onToggleMenu,
    renderSizes,
    availabilityEnabled,
    activeTab,
    onDeleteListing,
    deletingListing,
  } = props;
  const type = listing?.attributes?.publicData?.category;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price, state, publicData = {} } = currentListing.attributes;
  const slug = title == config.temporaryTitle ? createSlug('Listing') : createSlug(title);

  // const isPendingApproval = state === LISTING_STATE_PENDING_APPROVAL;
  const isClosed = state === LISTING_STATE_CLOSED;
  // const isDraft = state === LISTING_STATE_DRAFT;

  let menuContent = null;

  const isDraft = listingDraft(currentListing);
  const isPendingApproval = listingPendingApproval(currentListing);
  const isPublished = listingPublished(currentListing);
  const isClosedByLogic = listingClosedByLogic(currentListing);
  const isClosedByUser = listingClosedByUser(currentListing);
  const menuItemClasses = classNames(css.menuItem, {
    [css.menuItemDisabled]: !!actionsInProgressListingId,
  });

  const editListingLinkType = isDraft
    ? LISTING_PAGE_PARAM_TYPE_DRAFT
    : LISTING_PAGE_PARAM_TYPE_EDIT;

  // onDeleteListing,
  // deletingListing

  const alreadyScheduleForDelete = listing?.attributes?.metadata?.scheduled_to_delete == true;

  if (isDraft || isPendingApproval) {
    menuContent = (
      <>
        {alreadyScheduleForDelete ? null : (
          <MenuItemWrapper
            listing={currentListing}
            onClick={() => {
              onDeleteListing(currentListing.id.uuid);
              onToggleMenu(null);
            }}
            key="delete-listing"
            label={intl.formatMessage({
              id: 'ManageListingCard.ManageListingCard.deleteListingButtonText',
            })}
            menuItemClasses={menuItemClasses}
          />
        )}
        <MenuItemWrapper
          listing={currentListing}
          key="edit-listing"
          label={intl.formatMessage({
            id: 'ManageListingCard.ManageListingCard.editListingButtonText',
          })}
          menuItemClasses={menuItemClasses}
          onClick={() => history.push(`/l/${slug}/${id}/${editListingLinkType}/ad-type`)}
        />
      </>
    );
  }

  if (isPublished) {
    menuContent = (
      <>
        <MenuItemWrapper
          listing={currentListing}
          onClick={() => {
            onCloseListing(currentListing.id.uuid);
            onToggleMenu(null);
          }}
          key="close-listing"
          label={intl.formatMessage({
            id: 'ManageListingCard.ManageListingCard.closeListingButtonText',
          })}
          menuItemClasses={menuItemClasses}
        />
        <MenuItemWrapper
          listing={currentListing}
          key="edit-listing"
          label={intl.formatMessage({
            id: 'ManageListingCard.ManageListingCard.editListingButtonText',
          })}
          menuItemClasses={menuItemClasses}
          onClick={() => history.push(`/l/${slug}/${id}/${editListingLinkType}/ad-type`)}
        />
      </>
    );
  }

  if (isClosedByUser) {
    menuContent = (
      <>
        <MenuItemWrapper
          listing={currentListing}
          onClick={() => onOpenListing(currentListing.id.uuid)}
          key="open-listing"
          label={intl.formatMessage({
            id: 'ManageListingCard.ManageListingCard.openListingButtonText',
          })}
          menuItemClasses={menuItemClasses}
        />
      </>
    );
  }

  let showMenu = true;
  if (isClosedByLogic) {
    showMenu = false;
  }

  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const { formattedPrice, priceTitle } = priceData(price, intl);
  const suneCreditPrice = publicData.price;
  const hasError = hasOpeningError || hasClosingError;
  const thisListingInProgress =
    actionsInProgressListingId && actionsInProgressListingId.uuid === id;

  const onOverListingLink = () => {
    // Enforce preloading of ListingPage (loadable component)
    const { component: Page } = findRouteByRouteName('ListingPage', routeConfiguration());
    // Loadable Component has a "preload" function.
    if (Page.preload) {
      Page.preload();
    }
  };

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ManageListingCard.perNight'
    : isDaily
    ? 'ManageListingCard.perDay'
    : 'ManageListingCard.perUnit';

  const normalizedTitle = (thisListing = false) =>
    title == config.temporaryTitle ? (thisListing ? 'This listing' : 'Listing') : title;

  const closeReasons = publicData?.closeReasons ?? [];
  const hasCloseReasons = closeReasons.length > 0;

  const listing_type = publicData?.listing_type;

  let priceMessage = null;

  switch (listing_type) {
    case 'property_sale':
    case 'want_to_buy':
      priceMessage = (
        <div className={css.noPrice}>
          <FormattedMessage id="ManageListingCard.priceNotSet" />
        </div>
      );
      break;
    case 'property_rent':
    case 'want_to_rent':
      priceMessage = (
        <div className={css.noPrice}>
          <FormattedMessage id="ManageListingCard.pricePerMonthNotSet" />
        </div>
      );
      break;
  }

  const finishTab = closeReasons.includes(CLOSE_ON_CATEGORY_NOT_AVAILABLE_REASON)
    ? 'category'
    : !closeReasons.includes(NO_IMAGE_ON_BUY_OR_SELL_REASON)
    ? 'details'
    : 'photos';

  // const menuContent = (
  //   <>
  //     <MenuItem key="close-listing">
  //       <InlineTextButton
  //         rootClassName={menuItemClasses}
  //         onClick={event => {
  //           event.preventDefault();
  //           event.stopPropagation();
  //           if (!actionsInProgressListingId) {
  //             onToggleMenu(null);
  //             onCloseListing(currentListing.id);
  //           }
  //         }}
  //       >
  //         <FormattedMessage id="ManageListingCard.closeListing" />
  //       </InlineTextButton>
  //     </MenuItem>
  //   </>
  // );

  const isClosedListing = isClosedByUser || isClosedByLogic;

  const scheduledForDeleteLabel =
    !isPublished && currentListing?.attributes?.metadata?.scheduled_to_delete ? (
      <div className={css.deleteBox}>
        <span>
          {intl.formatMessage({ id: 'ManageListingCard.ManageListingCard.toBeDeletedSoonLabel' })}
        </span>
      </div>
    ) : null;

  const titleClasses = classNames(css.title, {
    [css.titlePending]: isPendingApproval,
    [css.titleDraft]: isDraft,
    [css.closed]: isClosedListing,
  });

  const category =
    type == 'service' ? (
      <div className={css.type} style={{ backgroundColor: '#ff4e50' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === type).label,
        })}
      </div>
    ) : type == 'event' ? (
      <div className={css.type} style={{ backgroundColor: '#87d152' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === type).label,
        })}
      </div>
    ) : type == 'vacanze' ? (
      <div className={css.type} style={{ backgroundColor: '#0cb5f2' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === type)?.label || 'Vacanze',
        })}
      </div>
    ) : (
      <div className={css.type} style={{ backgroundColor: '#ff9e28' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === type).label,
        })}
      </div>
    );

  return (
    <div className={classes}>
      {deletingListing == currentListing.id.uuid && (
        <div className={css.deletingOverlay}>
          <IconSpinner className={css.spinnerClass} />
        </div>
      )}
      <div
        className={css.threeToTwoWrapper}
        tabIndex={0}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();

          // ManageListingCard contains links, buttons and elements that are working with routing.
          // This card doesn't work if <a> or <button> is used to wrap events that are card 'clicks'.
          //
          // NOTE: It might be better to absolute-position those buttons over a card-links.
          // (So, that they have no parent-child relationship - like '<a>bla<a>blaa</a></a>')
          history.push(createListingURL(routeConfiguration(), listing));
        }}
        onMouseOver={onOverListingLink}
        onTouchStart={onOverListingLink}
      >
        <div className={css.aspectWrapper}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
            sizes={renderSizes}
          />
        </div>
        <div className={classNames(css.menuOverlayWrapper, { [css.menuOverlayOpen]: isMenuOpen })}>
          <div className={classNames(css.menuOverlay)} />
          <div className={css.menuOverlayContent}>
            <FormattedMessage id="ManageListingCard.viewListing" />
          </div>
        </div>
        {showMenu && (
          <div className={css.menubarWrapper}>
            <div className={css.menubarGradient} />
            <div className={css.menubar}>
              {category}
              <Menu
                className={classNames(css.menu, { [css.cardIsOpen]: !isClosed })}
                contentPlacementOffset={MENU_CONTENT_OFFSET}
                contentPosition="left"
                useArrow={false}
                onToggleActive={isOpen => {
                  const listingOpen = isOpen ? currentListing : null;
                  onToggleMenu(listingOpen);
                }}
                isOpen={isMenuOpen}
              >
                <MenuLabel className={css.menuLabel} isOpenClassName={css.listingMenuIsOpen}>
                  <div className={css.iconWrapper}>
                    <MenuIcon className={css.menuIcon} isActive={isMenuOpen} />
                  </div>
                </MenuLabel>
                <MenuContent rootClassName={css.menuContent}>
                  {/* <MenuItem key="close-listing">
                  <InlineTextButton
                    rootClassName={menuItemClasses}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (!actionsInProgressListingId) {
                        onToggleMenu(null);
                        onCloseListing(currentListing.id);
                      }
                    }}
                  >
                    <FormattedMessage id="ManageListingCard.closeListing" />
                  </InlineTextButton>
                </MenuItem> */}
                  {menuContent}
                </MenuContent>
              </Menu>
            </div>
          </div>
        )}
        {isDraft ? (
          <React.Fragment>
            <div className={classNames({ [css.draftNoImage]: !firstImage })} />
            <Overlay
              message={intl.formatMessage(
                { id: 'ManageListingCard.draftOverlayText' },
                { listingTitle: normalizedTitle(true) }
              )}
            >
              <NamedLink
                className={css.finishListingDraftLink}
                name="EditListingPage"
                params={{
                  id,
                  slug,
                  type: LISTING_PAGE_PARAM_TYPE_DRAFT,
                  tab: 'photos',
                }}
              >
                <FormattedMessage id="ManageListingCard.finishListingDraft" />
              </NamedLink>
            </Overlay>
          </React.Fragment>
        ) : null}
        {isClosedByLogic ? (
          <Overlay
            message={intl.formatMessage(
              { id: 'ManageListingCard.closedListing' },
              { listingTitle: title }
            )}
            custom
          >
            {/* <button
              className={css.openListingButton}
              disabled={!!actionsInProgressListingId}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                if (!actionsInProgressListingId) {
                  onOpenListing(currentListing.id);
                }
              }}
            >
              <FormattedMessage id="ManageListingCard.openListing" />
            </button> */}
          </Overlay>
        ) : null}
        {isClosedByUser ? (
          <Overlay
            message={intl.formatMessage(
              { id: 'ManageListingCard.closedListingByUser' },
              { listingTitle: title }
            )}
          >
            <button
              className={css.openListingButton}
              disabled={!!actionsInProgressListingId}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                if (!actionsInProgressListingId) {
                  onOpenListing(currentListing.id);
                  onToggleMenu(null);
                }
              }}
            >
              <FormattedMessage id="ManageListingCard.openListing" />
            </button>
          </Overlay>
        ) : null}
        {isPendingApproval ? (
          <Overlay
            message={intl.formatMessage(
              { id: 'ManageListingCard.pendingApproval' },
              { listingTitle: title }
            )}
          />
        ) : null}
        {thisListingInProgress ? (
          <Overlay>
            <IconSpinner />
          </Overlay>
        ) : hasError ? (
          <Overlay errorMessage={intl.formatMessage({ id: 'ManageListingCard.actionFailed' })} />
        ) : null}
      </div>

      <div className={css.info}>
        <div className={css.price}>
          {suneCreditPrice ? (
            <div className={css.priceValue} title={priceTitle}>
              <img
                src={config.custom.suneCurrencySymbolBlack}
                style={{ width: '15px', marginRight: '3px', marginBottom: '2px' }}
                alt="Sune Currency Symbol"
              />
              <span className={css.sunePrice}>{suneCreditPrice}</span>
            </div>
          ) : null}
          {formattedPrice && price && price?.amount > 0 ? (
            <React.Fragment>
              <div className={css.priceValue} title={priceTitle}>
                + {formattedPrice}
              </div>
              {/* <div className={css.perUnit}>
                <FormattedMessage id={unitTranslationKey} />
              </div> */}
            </React.Fragment>
          ) : (
            priceMessage
          )}
        </div>

        <div className={css.mainInfo}>
          <div className={css.titleWrapper}>
            <InlineTextButton
              rootClassName={titleClasses}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                if (!isClosedListing) history.push(createListingURL(routeConfiguration(), listing));
              }}
            >
              {formatTitle(normalizedTitle(), MAX_LENGTH_FOR_WORDS_IN_TITLE)}
            </InlineTextButton>
          </div>
        </div>

        <div className={css.manageLinks}>
          <NamedLink
            className={css.manageLink}
            name="EditListingPage"
            params={{
              id,
              slug,
              type: editListingLinkType,
              tab: 'ad-type',
            }}
          >
            <FormattedMessage id="ManageListingCard.editListing" />
          </NamedLink>

          {availabilityEnabled ? (
            <React.Fragment>
              <span className={css.manageLinksSeparator}>{' • '}</span>

              <NamedLink
                className={css.manageLink}
                name="EditListingPage"
                params={{
                  id,
                  slug,
                  type: editListingLinkType,
                  tab: 'availability',
                }}
              >
                <FormattedMessage id="ManageListingCard.manageAvailability" />
              </NamedLink>
            </React.Fragment>
          ) : null}
          {hasCloseReasons ? (
            <React.Fragment>
              <span className={css.manageLinksSeparator}>{' • '}</span>

              <NamedLink
                className={css.manageLink}
                name="EditListingPage"
                params={{
                  id,
                  slug,
                  type: editListingLinkType,
                  tab: finishTab,
                }}
              >
                <FormattedMessage id="ManageListingCard.finishListing" />
              </NamedLink>
            </React.Fragment>
          ) : null}
          {scheduledForDeleteLabel}
        </div>
      </div>
    </div>
  );
};

ManageListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  actionsInProgressListingId: null,
  renderSizes: null,
  availabilityEnabled: config.enableAvailability,
};

const { bool, func, shape, string } = PropTypes;

ManageListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  hasClosingError: bool.isRequired,
  hasOpeningError: bool.isRequired,
  intl: intlShape.isRequired,
  listing: propTypes.ownListing.isRequired,
  isMenuOpen: bool.isRequired,
  actionsInProgressListingId: shape({ uuid: string.isRequired }),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  onToggleMenu: func.isRequired,
  availabilityEnabled: bool,

  // Responsive image sizes hint
  renderSizes: string,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default compose(withRouter, injectIntl)(ManageListingCardComponent);
