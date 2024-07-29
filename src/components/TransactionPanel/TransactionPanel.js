import React, { Component } from 'react';
import { array, arrayOf, bool, func, number, object, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY,
  txIsAccepted,
  txIsCanceled,
  txIsDeclined,
  txIsEnquired,
  txIsPaymentExpired,
  txIsPaymentPending,
  txIsRequested,
  txHasBeenDelivered,
  txIsOfferExpired,
  txIsInFirstReviewBy,
  TRANSITION_ACCEPT,
  txIsAcceptedByCustomer,
  txIsDeclinedByCustomer,
  TRANSITION_ACCEPT_CUSTOMER,
  txIsServiceComplete,
} from '../../util/transaction';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import {
  ensureListing,
  ensureTransaction,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { isMobileSafari } from '../../util/userAgent';
import { formatMoney } from '../../util/currency';
import {
  AvatarLarge,
  BookingPanel,
  NamedLink,
  ReviewModal,
  UserDisplayName,
  PrimaryButton,
  SecondaryButton,
} from '../../components';
import { SendMessageForm } from '../../forms';
import config from '../../config';

// These are internal components that make this file more readable.
import AddressLinkMaybe from './AddressLinkMaybe';
import BreakdownMaybe from './BreakdownMaybe';
import DetailCardHeadingsMaybe from './DetailCardHeadingsMaybe';
import DetailCardImage from './DetailCardImage';
import FeedSection from './FeedSection';
import SaleActionButtonsMaybe from './SaleActionButtonsMaybe';
import PanelHeading, {
  HEADING_ENQUIRED,
  HEADING_PAYMENT_PENDING,
  HEADING_PAYMENT_EXPIRED,
  HEADING_REQUESTED,
  HEADING_ACCEPTED,
  HEADING_DECLINED,
  HEADING_CANCELED,
  HEADING_DELIVERED,
  HEADING_OFFER_EXPIRED,
  HEADING_PREAUTHORIZED,
  HEADING_RECEIVED,
  HEADING_ACCEPTED_CUSTOMER,
  HEADING_DECLINED_CUSTOMER,
  HEADING_SERVICE_COMPLETE,
} from './PanelHeading';

import css from './TransactionPanel.module.css';
import {
  customerAcceptOffer,
  customerCancelOffer,
  customerReceivedProduct,
} from '../../containers/TransactionPage/TransactionPage.duck';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Helper function to get display names for different roles
const displayNames = (currentUser, currentProvider, currentCustomer, intl) => {
  const authorDisplayName = <UserDisplayName user={currentProvider} intl={intl} />;
  const customerDisplayName = <UserDisplayName user={currentCustomer} intl={intl} />;

  let otherUserDisplayName = '';
  let otherUserDisplayNameString = '';
  const currentUserIsCustomer =
    currentUser.id && currentCustomer.id && currentUser.id.uuid === currentCustomer.id.uuid;
  const currentUserIsProvider =
    currentUser.id && currentProvider.id && currentUser.id.uuid === currentProvider.id.uuid;

  if (currentUserIsCustomer) {
    otherUserDisplayName = authorDisplayName;
    otherUserDisplayNameString = userDisplayNameAsString(currentProvider, '');
  } else if (currentUserIsProvider) {
    otherUserDisplayName = customerDisplayName;
    otherUserDisplayNameString = userDisplayNameAsString(currentCustomer, '');
  }

  return {
    authorDisplayName,
    customerDisplayName,
    otherUserDisplayName,
    otherUserDisplayNameString,
  };
};

export class TransactionPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageFormFocused: false,
      isReviewModalOpen: false,
      reviewSubmitted: false,
      suneError: false,
      suneDeclineError: false,
    };
    this.isMobSaf = false;
    this.sendMessageFormName = 'TransactionPanel.SendMessageForm';

    this.onOpenReviewModal = this.onOpenReviewModal.bind(this);
    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.onSendMessageFormFocus = this.onSendMessageFormFocus.bind(this);
    this.onSendMessageFormBlur = this.onSendMessageFormBlur.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.scrollToMessage = this.scrollToMessage.bind(this);
  }

  componentDidMount() {
    this.isMobSaf = isMobileSafari();
  }

  onOpenReviewModal() {
    this.setState({ isReviewModalOpen: true });
  }

  onSubmitReview(values) {
    const { onSendReview, transaction, transactionRole } = this.props;
    const currentTransaction = ensureTransaction(transaction);
    const { reviewRating, reviewContent } = values;
    const rating = Number.parseInt(reviewRating, 10);
    onSendReview(transactionRole, currentTransaction, rating, reviewContent)
      .then(r => this.setState({ isReviewModalOpen: false, reviewSubmitted: true }))
      .catch(e => {
        // Do nothing.
      });
  }

  onSendMessageFormFocus() {
    this.setState({ sendMessageFormFocused: true });
    if (this.isMobSaf) {
      // Scroll to bottom
      window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    }
  }

  onSendMessageFormBlur() {
    this.setState({ sendMessageFormFocused: false });
  }

  onMessageSubmit(values, form) {
    const message = values.message ? values.message.trim() : null;
    const { transaction, onSendMessage } = this.props;
    const ensuredTransaction = ensureTransaction(transaction);

    if (!message) {
      return;
    }
    onSendMessage(ensuredTransaction.id, message)
      .then(messageId => {
        form.reset();
        this.scrollToMessage(messageId);
      })
      .catch(e => {
        // Ignore, Redux handles the error
      });
  }

  scrollToMessage(messageId) {
    const selector = `#msg-${messageId.uuid}`;
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }

  render() {
    const {
      rootClassName,
      className,
      currentUser,
      transaction,
      totalMessagePages,
      oldestMessagePageFetched,
      messages,
      initialMessageFailed,
      savePaymentMethodFailed,
      fetchMessagesInProgress,
      fetchMessagesError,
      sendMessageInProgress,
      sendMessageError,
      sendReviewInProgress,
      sendReviewError,
      onFetchTimeSlots,
      onManageDisableScrolling,
      onShowMoreMessages,
      transactionRole,
      intl,
      onAcceptSale,
      customerOffer,
      onDeclineSale,
      acceptInProgress,
      declineInProgress,
      acceptSaleError,
      declineSaleError,
      onSubmitBookingRequest,
      monthlyTimeSlots,
      nextTransitions,
      onFetchTransactionLineItems,
      // lineItems,
      fetchLineItemsInProgress,
      fetchLineItemsError,
      acceptCustomerProgress,
      acceptCustomerError,
      declineCustomerProgress,
      declineCustomerError,
      customerDeclineOffer,
      customerReceiveOrder,
      productReceivedInProgress,
      productReceivedError,
    } = this.props;
    // console.log('tralineItemsnsaction', lineItems);
    const currentTransaction = ensureTransaction(transaction);

    const currentListing = ensureListing(currentTransaction.listing);
    const currentProvider = ensureUser(currentTransaction.provider);
    const currentCustomer = ensureUser(currentTransaction.customer);
    const lineItems = currentTransaction.attributes?.lineItems;
    const isCustomer = transactionRole === 'customer';
    const isProvider = transactionRole === 'provider';
    const lastTransition = currentTransaction?.attributes.lastTransition;
    // console.log('lastTransition', lastTransition);
    const priceValues = currentTransaction?.attributes?.metadata?.priceValues;
    const category = currentTransaction?.attributes?.metadata?.category;
    const isProduct = category === 'product';
    const isVacanzeCategory = category === 'vacanze';
    const deliveryMethod = currentTransaction?.attributes?.metadata?.deliveryMethod;
    const deliveryMethodLabel = deliveryMethod
      ? config.custom.bookingDeliveryMethods
          ?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }))
          ?.find(i => i.key === deliveryMethod)?.label
      : null;
    const isEventListing = currentTransaction?.attributes?.metadata?.category === 'event';
    const categoryType = currentListing?.attributes?.publicData?.category;
    let priceLabel;
    if (categoryType === 'event') {
      priceLabel = 'event.priceInfo';
    } else if (categoryType === 'vacanze') {
      priceLabel = 'vacanze.priceInfo';
    } else if (categoryType === 'service') {
      priceLabel = 'service.priceInfo';
    } else {
      priceLabel = 'product.priceInfo';
    }
    const listingLoaded = !!currentListing.id;
    const listingDeleted = listingLoaded && currentListing.attributes.deleted;
    const iscustomerLoaded = !!currentCustomer.id;
    const isCustomerBanned = iscustomerLoaded && currentCustomer.attributes.banned;
    const isCustomerDeleted = iscustomerLoaded && currentCustomer.attributes.deleted;
    const isProviderLoaded = !!currentProvider.id;
    const isProviderBanned = isProviderLoaded && currentProvider.attributes.banned;
    const isProviderDeleted = isProviderLoaded && currentProvider.attributes.deleted;

    const stateDataFn = tx => {
      if (txIsEnquired(tx)) {
        const transitions = Array.isArray(nextTransitions)
          ? nextTransitions.map(transition => {
              return transition.attributes.name;
            })
          : [];
        const hasCorrectNextTransition =
          transitions.length > 0 && transitions.includes(TRANSITION_REQUEST_PAYMENT_AFTER_ENQUIRY);
        return {
          headingState: HEADING_ENQUIRED,
          showBookingPanel: isCustomer && !isProviderBanned && hasCorrectNextTransition,
        };
      } else if (txIsRequested(tx)) {
        return {
          headingState: HEADING_REQUESTED,
          showDetailCardHeadings: isCustomer,
          showSaleButtons: isProvider && !isCustomerBanned,
        };
      } else if (txIsPaymentPending(tx)) {
        return {
          headingState: HEADING_PAYMENT_PENDING,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsPaymentExpired(tx)) {
        return {
          headingState: HEADING_PAYMENT_EXPIRED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsOfferExpired(tx)) {
        return {
          headingState: HEADING_OFFER_EXPIRED,
          showDetailCardHeadings: true,
        };
      } else if (txIsAccepted(tx)) {
        return {
          headingState: HEADING_ACCEPTED,
          showDetailCardHeadings: isCustomer,
          showAddress: isCustomer,
        };
      } else if (txIsDeclined(tx)) {
        return {
          headingState: HEADING_DECLINED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsCanceled(tx)) {
        return {
          headingState: HEADING_CANCELED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txHasBeenDelivered(tx)) {
        return {
          headingState: HEADING_DELIVERED,
          showDetailCardHeadings: isCustomer,
        };
      } else if (txIsAcceptedByCustomer(tx)) {
        return {
          headingState: HEADING_ACCEPTED_CUSTOMER,
          showDetailCardHeadings: isProvider,
        };
      } else if (txIsDeclinedByCustomer(tx)) {
        return {
          headingState: HEADING_DECLINED_CUSTOMER,
          showDetailCardHeadings: isProvider,
        };
      } else if (txIsServiceComplete(tx)) {
        return {
          headingState: HEADING_ACCEPTED,
          showDetailCardHeadings: isProvider,
        };
      } else {
        return { headingState: 'unknown' };
      }
    };
    const stateData = stateDataFn(currentTransaction);

    const deletedListingTitle = intl.formatMessage({
      id: 'TransactionPanel.deletedListingTitle',
    });

    const {
      authorDisplayName,
      customerDisplayName,
      otherUserDisplayName,
      otherUserDisplayNameString,
    } = displayNames(currentUser, currentProvider, currentCustomer, intl);

    const { publicData, geolocation } = currentListing.attributes;
    const location = publicData && publicData.location ? publicData.location : {};
    const listingTitle = currentListing.attributes.deleted
      ? deletedListingTitle
      : currentListing.attributes.title;

    const unitType = config.bookingUnitType;
    const isNightly = unitType === LINE_ITEM_NIGHT;
    const isDaily = unitType === LINE_ITEM_DAY;

    const unitTranslationKey = priceLabel;
    // isNightly
    //   ? 'TransactionPanel.perNight'
    //   : isDaily
    //   ? 'TransactionPanel.perDay'
    //   : isEventListing
    //   ? 'TransactionPanel.event'
    //   : isVacanzeCategory
    //   ? 'TransactionPanel.perDay'
    //   : 'TransactionPanel.perUnit';
    const sunePrice = priceValues?.price || null;
    const suneSymbol = (
      <img
        src={config.custom.suneCurrencySymbolBlack}
        style={{ width: '10px', marginRight: '3px', marginBottom: '2px' }}
        alt="Sune Currency Symbol"
      />
    );
    const price = currentListing.attributes.price;
    const bookingSubTitle = price ? (
      sunePrice ? (
        <div>
          <span>{suneSymbol}</span>
          {`${sunePrice} + ${formatMoney(intl, price)} ${intl.formatMessage({
            id: unitTranslationKey,
          })}`}
        </div>
      ) : (
        `${formatMoney(intl, price)} ${intl.formatMessage({ id: unitTranslationKey })}`
      )
    ) : (
      ''
    );

    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const saleButtons = (
      <SaleActionButtonsMaybe
        showButtons={stateData.showSaleButtons}
        acceptInProgress={acceptInProgress}
        declineInProgress={declineInProgress}
        acceptSaleError={acceptSaleError}
        declineSaleError={declineSaleError}
        onAcceptSale={() => onAcceptSale(currentTransaction.id)}
        onDeclineSale={() => onDeclineSale(currentTransaction.id)}
      />
    );

    const showSendMessageForm =
      !isCustomerBanned && !isCustomerDeleted && !isProviderBanned && !isProviderDeleted;

    const sendMessagePlaceholder = intl.formatMessage(
      { id: 'TransactionPanel.sendMessagePlaceholder' },
      { name: otherUserDisplayNameString }
    );

    const sendingMessageNotAllowed = intl.formatMessage({
      id: 'TransactionPanel.sendingMessageNotAllowed',
    });

    const paymentMethodsPageLink = (
      <NamedLink name="PaymentMethodsPage">
        <FormattedMessage id="TransactionPanel.paymentMethodsPageLink" />
      </NamedLink>
    );
    const suneErrorMessage = isProduct
      ? intl.formatMessage({ id: 'TransactionPanel.suneErrorProductMessage' })
      : intl.formatMessage({ id: 'TransactionPanel.suneErrorServiceMessage' });

    const customerDeclineErrorMessage = intl.formatMessage({
      id: 'TransactionPanel.customerDeclineErrorMessage',
    });
    const classes = classNames(rootClassName || css.root, className);
    const processVersion = transaction?.attributes?.processVersion;

    const processName = transaction?.attributes?.processName;

    const isNewProcess = true;
    // (processVersion >= +process.env.REACT_APP_SERVICE_NEW_PROCESS &&
    //   processName == 'flex-hourly-default-process') ||
    // (processVersion >= +process.env.REACT_APP_PRODUCT_NEW_PROCESS &&
    //   processName == 'flex-product-default-process') ||
    // processName == 'flex-daily-default-process' ||
    // processName == 'flex-hourly-paid-default-process/release-1' ||
    // processName == 'flex-product-paid-default-process/release-1' ||
    // processName == 'flex-daily-paid-default-process/release-1';
    // const isNewProcess = processVersion === 29 || processVersion === 45;
    return (
      <div className={classes}>
        <div className={css.container}>
          <div className={css.txInfo}>
            <DetailCardImage
              rootClassName={css.imageWrapperMobile}
              avatarWrapperClassName={css.avatarWrapperMobile}
              listingTitle={listingTitle}
              image={firstImage}
              provider={currentProvider}
              isCustomer={isCustomer}
              listingId={currentListing.id && currentListing.id.uuid}
              listingDeleted={listingDeleted}
            />
            {isProvider ? (
              <div className={css.avatarWrapperProviderDesktop}>
                <AvatarLarge user={currentCustomer} className={css.avatarDesktop} />
              </div>
            ) : null}
            <PanelHeading
              panelHeadingState={stateData.headingState}
              transactionRole={transactionRole}
              providerName={authorDisplayName}
              customerName={customerDisplayName}
              isCustomerBanned={isCustomerBanned}
              listingId={currentListing.id && currentListing.id.uuid}
              listingTitle={listingTitle}
              listingDeleted={listingDeleted}
              isProduct={isProduct}
              currentListing={currentListing}
            />
            <div className={css.bookingDetailsMobile}>
              <AddressLinkMaybe
                rootClassName={css.addressMobile}
                location={location}
                geolocation={geolocation}
                showAddress={stateData.showAddress}
              />
              {/* phone breakdown */}
              {category && (
                <div className={css.serviceMobile}>
                  {
                    config.custom.listingTypes
                      ?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }))
                      ?.find(cat => cat.key === category)?.label
                  }
                </div>
              )}
              {deliveryMethod && (
                <div className={css.deliveryMethodMobile}>
                  {/* Delivery Method: &nbsp; &nbsp; */}
                  {deliveryMethodLabel}
                </div>
              )}
              {lineItems?.length ? (
                <BreakdownMaybe
                  transaction={currentTransaction}
                  transactionRole={transactionRole}
                  priceValues={priceValues}
                  isEventListing={isEventListing}
                  isVacanzeCategory={isVacanzeCategory}
                  isProductCategory={isProduct}
                  category={category}
                />
              ) : null}
              {isProduct && lineItems?.length == 0 ? (
                <div className={css.productContainerMobile}>
                  <h4>
                    <FormattedMessage id="TransactionPanel.productDetailsTotal" />
                  </h4>
                  <h4>
                    <img className={css.icon} src={config.custom.suneCurrencySymbolBlack} />
                    {priceValues?.totalAmount}
                  </h4>
                </div>
              ) : null}
            </div>
            {savePaymentMethodFailed ? (
              <p className={css.genericError}>
                <FormattedMessage
                  id="TransactionPanel.savePaymentMethodFailed"
                  values={{ paymentMethodsPageLink }}
                />
              </p>
            ) : null}
            <FeedSection
              rootClassName={css.feedContainer}
              currentTransaction={currentTransaction}
              currentUser={currentUser}
              fetchMessagesError={fetchMessagesError}
              fetchMessagesInProgress={fetchMessagesInProgress}
              initialMessageFailed={initialMessageFailed}
              messages={messages}
              oldestMessagePageFetched={oldestMessagePageFetched}
              onOpenReviewModal={this.onOpenReviewModal}
              onShowMoreMessages={() => onShowMoreMessages(currentTransaction.id)}
              totalMessagePages={totalMessagePages}
              isProduct={isProduct}
            />
            {showSendMessageForm ? (
              <SendMessageForm
                formId={this.sendMessageFormName}
                rootClassName={css.sendMessageForm}
                messagePlaceholder={sendMessagePlaceholder}
                inProgress={sendMessageInProgress}
                sendMessageError={sendMessageError}
                onFocus={this.onSendMessageFormFocus}
                onBlur={this.onSendMessageFormBlur}
                onSubmit={this.onMessageSubmit}
              />
            ) : (
              <div className={css.sendingMessageNotAllowed}>{sendingMessageNotAllowed}</div>
            )}
            {stateData.showSaleButtons ? (
              <div className={css.mobileActionButtons}>{saleButtons}</div>
            ) : null}
            {lastTransition === TRANSITION_ACCEPT && isCustomer && !isNewProcess ? (
              <div className={css.customerContainerMobile}>
                {acceptCustomerError ? (
                  <p className={css.suneErrorMessage}>
                    {acceptCustomerError?.message ?? suneErrorMessage}
                  </p>
                ) : null}

                {this.state.suneDeclineError ? (
                  <p className={css.suneErrorMessage}> {customerDeclineErrorMessage}</p>
                ) : null}
                <div className={css.customerButtons}>
                  <PrimaryButton
                    className={css.acceptButton}
                    type="button"
                    inProgress={acceptCustomerProgress}
                    onClick={async e => {
                      try {
                        const res = await customerOffer(
                          currentTransaction.id,
                          currentCustomer,
                          priceValues
                        );
                      } catch (err) {
                        console.log('e', err);
                        this.setState({ suneError: true });
                      }
                    }}
                  >
                    <FormattedMessage id="TransactionPanel.accept" />
                  </PrimaryButton>
                  <SecondaryButton
                    className={css.declineButton}
                    type="button"
                    inProgress={declineCustomerProgress}
                    onClick={async e => {
                      try {
                        await customerDeclineOffer(currentTransaction.id);
                      } catch (err) {
                        this.setState({ suneDeclineError: true });
                        console.log('e', err);
                      }
                    }}
                  >
                    <FormattedMessage id="TransactionPanel.decline" />
                  </SecondaryButton>
                </div>
              </div>
            ) : null}
            {isProduct &&
            (isNewProcess
              ? lastTransition === TRANSITION_ACCEPT
              : lastTransition === TRANSITION_ACCEPT_CUSTOMER) &&
            isCustomer ? (
              <div className={css.customerContainerMobile}>
                <div className={css.customerButtons}>
                  <PrimaryButton
                    className={css.acceptButton}
                    type="button"
                    inProgress={productReceivedInProgress}
                    onClick={async e => {
                      try {
                        const res = await customerReceiveOrder(currentTransaction.id);
                      } catch (err) {
                        console.log('e', err);
                      }
                    }}
                  >
                    <FormattedMessage id="TransactionPanel.productReceived" />
                  </PrimaryButton>
                </div>
              </div>
            ) : null}
          </div>

          <div className={css.asideDesktop}>
            <div className={css.detailCard}>
              <DetailCardImage
                avatarWrapperClassName={css.avatarWrapperDesktop}
                listingTitle={listingTitle}
                image={firstImage}
                provider={currentProvider}
                isCustomer={isCustomer}
                listingId={currentListing.id && currentListing.id.uuid}
                listingDeleted={listingDeleted}
              />
              <DetailCardHeadingsMaybe
                showDetailCardHeadings={stateData.showDetailCardHeadings}
                listingTitle={listingTitle}
                subTitle={bookingSubTitle}
                location={location}
                geolocation={geolocation}
                showAddress={stateData.showAddress}
              />
              {stateData.showBookingPanel ? (
                <BookingPanel
                  className={css.bookingPanel}
                  titleClassName={css.bookingTitle}
                  isOwnListing={false}
                  listing={currentListing}
                  title={listingTitle}
                  subTitle={bookingSubTitle}
                  authorDisplayName={authorDisplayName}
                  onSubmit={onSubmitBookingRequest}
                  onManageDisableScrolling={onManageDisableScrolling}
                  monthlyTimeSlots={monthlyTimeSlots}
                  onFetchTimeSlots={onFetchTimeSlots}
                  onFetchTransactionLineItems={onFetchTransactionLineItems}
                  lineItems={lineItems}
                  fetchLineItemsInProgress={fetchLineItemsInProgress}
                  fetchLineItemsError={fetchLineItemsError}
                />
              ) : null}
              {category && (
                <div className={css.serviceDesktop}>
                  {
                    config.custom.listingTypes
                      ?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }))
                      ?.find(cat => cat.key === category)?.label
                  }
                </div>
              )}
              {deliveryMethod && (
                <div className={css.deliveryMethodDesktop}>
                  {/* <p className={css.deliveryMethodLabel}>Delivery Method =</p> */}
                  {deliveryMethodLabel}
                </div>
              )}
              {lineItems?.length ? (
                <BreakdownMaybe
                  className={css.breakdownContainer}
                  transaction={currentTransaction}
                  transactionRole={transactionRole}
                  priceValues={priceValues}
                  isEventListing={isEventListing}
                  isVacanzeCategory={isVacanzeCategory}
                  isProductCategory={isProduct}
                  category={category}
                />
              ) : null}
              {isProduct && lineItems?.length == 0 ? (
                <div className={css.productContainer}>
                  <h4>
                    <FormattedMessage id="TransactionPanel.productDetailsTotal" />
                  </h4>
                  <h4>
                    <img className={css.icon} src={config.custom.suneCurrencySymbolBlack} />
                    {priceValues?.totalAmount}
                  </h4>
                </div>
              ) : null}
              {stateData.showSaleButtons ? (
                <div className={css.desktopActionButtons}>{saleButtons}</div>
              ) : null}
              {lastTransition === TRANSITION_ACCEPT && isCustomer && !isNewProcess ? (
                <div className={css.customerContainerDesktop}>
                  {acceptCustomerError ? (
                    <p className={css.suneErrorMessage}>
                      {acceptCustomerError?.message ?? suneErrorMessage}
                    </p>
                  ) : null}

                  {this.state.suneDeclineError ? (
                    <p className={css.suneErrorMessage}>{customerDeclineErrorMessage}</p>
                  ) : null}
                  <div className={css.customerButtons}>
                    <PrimaryButton
                      className={css.acceptButton}
                      type="button"
                      inProgress={acceptCustomerProgress}
                      onClick={async e => {
                        try {
                          const res = await customerOffer(
                            currentTransaction.id,
                            currentCustomer,
                            priceValues
                          );
                        } catch (err) {
                          console.log('e', err);
                          this.setState({ suneError: true });
                        }
                      }}
                    >
                      <FormattedMessage id="TransactionPanel.accept" />
                    </PrimaryButton>
                    <SecondaryButton
                      className={css.declineButton}
                      type="button"
                      inProgress={declineCustomerProgress}
                      onClick={async e => {
                        try {
                          await customerDeclineOffer(currentTransaction.id);
                        } catch (err) {
                          this.setState({ suneDeclineError: true });
                          console.log('e', err);
                        }
                      }}
                    >
                      <FormattedMessage id="TransactionPanel.decline" />
                    </SecondaryButton>
                  </div>
                </div>
              ) : null}
              {isProduct &&
              (isNewProcess
                ? lastTransition === TRANSITION_ACCEPT
                : lastTransition === TRANSITION_ACCEPT_CUSTOMER) &&
              isCustomer ? (
                <div className={css.customerContainerDesktop}>
                  <div className={css.customerButtons}>
                    <PrimaryButton
                      className={css.acceptButton}
                      type="button"
                      inProgress={productReceivedInProgress}
                      onClick={async e => {
                        try {
                          const res = await customerReceiveOrder(currentTransaction.id);
                        } catch (err) {
                          console.log('e', err);
                        }
                      }}
                    >
                      <FormattedMessage id="TransactionPanel.productReceived" />
                    </PrimaryButton>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <ReviewModal
          id="ReviewOrderModal"
          isOpen={this.state.isReviewModalOpen}
          onCloseModal={() => this.setState({ isReviewModalOpen: false })}
          onManageDisableScrolling={onManageDisableScrolling}
          onSubmitReview={this.onSubmitReview}
          revieweeName={otherUserDisplayName}
          reviewSent={this.state.reviewSubmitted}
          sendReviewInProgress={sendReviewInProgress}
          sendReviewError={sendReviewError}
        />
      </div>
    );
  }
}

TransactionPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  acceptSaleError: null,
  declineSaleError: null,
  fetchMessagesError: null,
  initialMessageFailed: false,
  savePaymentMethodFailed: false,
  sendMessageError: null,
  sendReviewError: null,
  monthlyTimeSlots: null,
  nextTransitions: null,
  lineItems: null,
  fetchLineItemsError: null,
};

TransactionPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  totalMessagePages: number.isRequired,
  oldestMessagePageFetched: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailed: bool,
  savePaymentMethodFailed: bool,
  fetchMessagesInProgress: bool.isRequired,
  fetchMessagesError: propTypes.error,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  sendReviewInProgress: bool.isRequired,
  sendReviewError: propTypes.error,
  onFetchTimeSlots: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  onSendReview: func.isRequired,
  onSubmitBookingRequest: func.isRequired,
  monthlyTimeSlots: object,
  nextTransitions: array,

  // Sale related props
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  customerAcceptOffer: func.isRequired,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,

  // line items
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape,
};
const mapStateToProps = state => {
  const {
    acceptCustomerProgress,
    acceptCustomerError,
    declineCustomerProgress,
    declineCustomerError,
    productReceivedInProgress,
    productReceivedError,
  } = state.TransactionPage;
  return {
    acceptCustomerProgress,
    acceptCustomerError,
    declineCustomerProgress,
    declineCustomerError,
    productReceivedInProgress,
    productReceivedError,
  };
};
const mapDispatchToProps = dispatch => ({
  customerOffer: (transactionId, customer, priceValues) =>
    dispatch(customerAcceptOffer(transactionId, customer, priceValues)),
  customerDeclineOffer: transactionId => dispatch(customerCancelOffer(transactionId)),
  customerReceiveOrder: transactionId => dispatch(customerReceivedProduct(transactionId)),
});
const TransactionPanel = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(TransactionPanelComponent);

export default TransactionPanel;
