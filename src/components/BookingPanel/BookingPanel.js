import React, { useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { array, bool, func, node, object, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { propTypes, LISTING_STATE_CLOSED, LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { parse, stringify } from '../../util/urlHelpers';
import config from '../../config';
import { ModalInMobile, Button, SecondaryButton } from '../../components';
import { BookingTimeForm } from '../../forms';

import css from './BookingPanel.module.css';
import BookingFullForm from '../../forms/BookingTimeForm/BookingFullForm';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;
const TODAY = new Date();

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

const openBookModal = (isOwnListing, isClosed, history, location) => {
  if (isOwnListing || isClosed) {
    window.scrollTo(0, 0);
  } else {
    const { pathname, search, state } = location;
    const searchString = `?${stringify({ ...parse(search), book: true })}`;
    history.push(`${pathname}${searchString}`, state);
  }
};

const closeBookModal = (history, location) => {
  const { pathname, search, state } = location;
  const searchParams = omit(parse(search), 'book');
  const searchString = `?${stringify(searchParams)}`;
  history.push(`${pathname}${searchString}`, state);
};

const dateFormattingOptions = { month: 'short', day: 'numeric', weekday: 'short' };

const BookingPanel = props => {
  const {
    rootClassName,
    className,
    titleClassName,
    listing,
    isOwnListing,
    unitType,
    onSubmit,
    title,
    subTitle,
    onManageDisableScrolling,
    onFetchTimeSlots,
    monthlyTimeSlots,
    history,
    location,
    intl,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    currentUser,
    isCategoryService,
    loading,
    showContactUser,
    onContactUser,
    isEventListing,
    isVacanzeCategory,
    timeSlots,
    isProductCategory,
    priceLabel,
    authorDisplayName,
  } = props;
  const [addressFlag, setAddressFlag] = useState(false);
  const price = listing.attributes?.publicData?.price;
  const listingPrice = listing?.attributes?.price;
  const deliveryMethod =
    listing.attributes?.publicData?.deliveryOption?.key ||
    listing.attributes?.publicData?.deliveryOption;
  const timeZone =
    listing.attributes.availabilityPlan && listing.attributes.availabilityPlan.timezone;
  const hasListingState = !!listing.attributes.state;
  const isClosed = hasListingState && listing.attributes.state === LISTING_STATE_CLOSED;
  const showBookingTimeForm = hasListingState && !isClosed;
  const showClosedListingHelpText = listing.id && isClosed;
  const publicData = listing.attributes.publicData;
  const suneCreditPrice = publicData.price;
  const formattedPrice =
    listingPrice && listingPrice.amount > 0 ? formatMoney(intl, listingPrice) : null;
  const { priceTitle } = priceData(suneCreditPrice, intl);
  const isBook = !!parse(location.search).book;
  const subTitleText = !!subTitle
    ? subTitle
    : showClosedListingHelpText
    ? intl.formatMessage({ id: 'BookingPanel.subTitleClosedListing' })
    : null;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'BookingPanel.perNight'
    : isDaily
    ? 'BookingPanel.perDay'
    : 'BookingPanel.perUnit';

  const classes = classNames(rootClassName || css.root, className);
  const titleClasses = classNames(titleClassName || css.bookingTitle);
  return (
    <div className={classes}>
      <ModalInMobile
        containerClassName={css.modalContainer}
        id="BookingTimeFormInModal"
        isModalOpenOnMobile={isBook}
        onClose={() => closeBookModal(history, location)}
        showAsModalMaxWidth={MODAL_BREAKPOINT}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div className={css.modalHeading}>
          <h1 className={css.title}>{title}</h1>
        </div>
        {showContactUser ? (
          <div className={css.contactButtonContainer}>
            <SecondaryButton
              rootClassName={css.contactLink}
              onClick={onContactUser}
              enforcePagePreloadFor="LoginPage"
            >
              <FormattedMessage id="UserCard.heading" values={{ name: authorDisplayName }} />
            </SecondaryButton>
            <p className={css.orText}>
              <FormattedMessage id="BookingPanel.BookingPanel.orText" />
            </p>
          </div>
        ) : null}

        <div className={css.bookingHeading}>
          <div className={css.bookingHeadingContainer}>
            <h2 className={titleClasses}>{title}</h2>
            {subTitleText ? <div className={css.bookingHelp}>{subTitleText}</div> : null}
          </div>
          <div className={css.desktopPriceContainer}>
            <div className={css.desktopPriceValue} title={priceTitle}>
              <img
                src={config.custom.suneCurrencySymbolBlack}
                style={{ width: '15px', marginRight: '3px', marginBottom: '2px' }}
                alt="Sune Currency Symbol"
              />
              {suneCreditPrice}
              {listingPrice && listingPrice.amount > 0 ? (
                <>
                  <span className={css.mainPrice}> + {formattedPrice}</span>
                </>
              ) : (
                ''
              )}
            </div>
            <div className={css.desktopPerUnit}>
              {priceLabel}
              {/* {isCategoryService && !isEventListing ? (
                <FormattedMessage id={unitTranslationKey} />
              ) : null} */}
            </div>
          </div>
          {/* <div className={css.bookingHeadingContainer}>
            <h2 className={titleClasses}>{title}</h2>
            {subTitleText ? <div className={css.bookingHelp}>{subTitleText}</div> : null}
          </div> */}
        </div>
        {isVacanzeCategory ? (
          <BookingFullForm
            className={css.bookingForm}
            formId="BookingPanel"
            submitButtonWrapperClassName={css.submitButtonWrapper}
            unitType={'line-item/night'}
            onSubmit={onSubmit}
            price={price}
            listingId={listing.id}
            isOwnListing={isOwnListing}
            // monthlyTimeSlots={monthlyTimeSlots}
            // onFetchTimeSlots={onFetchTimeSlots}
            // startDatePlaceholder={intl.formatDate(TODAY, dateFormattingOptions)}
            // endDatePlaceholder={intl.formatDate(TODAY, dateFormattingOptions)}
            timeZone={timeZone}
            onFetchTransactionLineItems={onFetchTransactionLineItems}
            lineItems={lineItems}
            fetchLineItemsInProgress={fetchLineItemsInProgress}
            fetchLineItemsError={fetchLineItemsError}
            currentUser={currentUser}
            isCategoryService={isCategoryService}
            deliveryMethod={deliveryMethod}
            submitInProgress={loading}
            onManageDisableScrolling={onManageDisableScrolling}
            isEventListing={isEventListing}
            isVacanzeCategory={isVacanzeCategory}
            timeSlots={timeSlots}
            listingPrice={listingPrice}
            listing={listing}
          />
        ) : showBookingTimeForm && !isVacanzeCategory ? (
          <BookingTimeForm
            className={css.bookingForm}
            formId="BookingPanel"
            submitButtonWrapperClassName={css.submitButtonWrapper}
            unitType={unitType}
            onSubmit={onSubmit}
            price={price}
            listingId={listing.id}
            isOwnListing={isOwnListing}
            monthlyTimeSlots={monthlyTimeSlots}
            onFetchTimeSlots={onFetchTimeSlots}
            startDatePlaceholder={intl.formatDate(TODAY, dateFormattingOptions)}
            endDatePlaceholder={intl.formatDate(TODAY, dateFormattingOptions)}
            timeZone={timeZone}
            onFetchTransactionLineItems={onFetchTransactionLineItems}
            lineItems={lineItems}
            fetchLineItemsInProgress={fetchLineItemsInProgress}
            fetchLineItemsError={fetchLineItemsError}
            currentUser={currentUser}
            isCategoryService={isCategoryService}
            deliveryMethod={deliveryMethod}
            submitInProgress={loading}
            onManageDisableScrolling={onManageDisableScrolling}
            isEventListing={isEventListing}
            isVacanzeCategory={isVacanzeCategory}
            timeSlots={timeSlots}
            isProductCategory={isProductCategory}
            listingPrice={listingPrice}
            listing={listing}
          />
        ) : null}
      </ModalInMobile>
      <div className={css.openBookingForm}>
        <div className={css.priceContainer}>
          <div className={css.priceValue} title={priceTitle}>
            <img
              src={config.custom.suneCurrencySymbolBlack}
              style={{ width: '20px', height: '16px', marginBottom: '2px' }}
              alt="Sune Currency Symbol"
            />
            {suneCreditPrice}
            {listingPrice && listingPrice.amount > 0 ? (
              <>
                <span className={css.mainPrice}> + {formattedPrice}</span>
              </>
            ) : (
              ''
            )}
          </div>
          <div className={css.perUnit}>
            {priceLabel}
            {/* {isCategoryService && !isEventListing ? (
              <FormattedMessage id={unitTranslationKey} />
            ) : null} */}
          </div>
        </div>
        {showContactUser ? (
          <div className={css.contactContainer}>
            <SecondaryButton
              rootClassName={css.contactLink}
              onClick={onContactUser}
              enforcePagePreloadFor="LoginPage"
            >
              <FormattedMessage id="ListingPage.contactUser" values={{ name: authorDisplayName }} />
            </SecondaryButton>
          </div>
        ) : null}
        {showBookingTimeForm ? (
          <Button
            rootClassName={css.bookButton}
            onClick={() => openBookModal(isOwnListing, isClosed, history, location)}
          >
            {isCategoryService ? (
              <FormattedMessage id="BookingTimeForm.requestToBook" />
            ) : isVacanzeCategory ? (
              <FormattedMessage id="BookingTimeForm.requestToBook" />
            ) : (
              // <FormattedMessage id="BookingPanel.ctaButtonMessage" />
              <FormattedMessage id="BookingTimeForm.requestToBookProduct" />
            )}
          </Button>
        ) : isClosed ? (
          <div className={css.closedListingButton}>
            <FormattedMessage id="BookingPanel.closedListingButtonText" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

BookingPanel.defaultProps = {
  rootClassName: null,
  className: null,
  titleClassName: null,
  isOwnListing: false,
  subTitle: null,
  unitType: config.bookingUnitType,
  monthlyTimeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingPanel.propTypes = {
  rootClassName: string,
  className: string,
  titleClassName: string,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]),
  isOwnListing: bool,
  unitType: propTypes.bookingUnitType,
  onSubmit: func.isRequired,
  title: oneOfType([node, string]).isRequired,
  subTitle: oneOfType([node, string]),
  authorDisplayName: oneOfType([node, string]).isRequired,
  onManageDisableScrolling: func.isRequired,
  onFetchTimeSlots: func.isRequired,
  monthlyTimeSlots: object,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withRouter, injectIntl)(BookingPanel);
