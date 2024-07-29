import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { createSlug, stringify } from '../../util/urlHelpers';
import { NamedLink } from '../../components';

import css from './TransactionPanel.module.css';

export const HEADING_ENQUIRED = 'enquired';
export const HEADING_PAYMENT_PENDING = 'pending-payment';
export const HEADING_PAYMENT_EXPIRED = 'payment-expired';
export const HEADING_REQUESTED = 'requested';
export const HEADING_ACCEPTED = 'accepted';
export const HEADING_DECLINED = 'declined';
export const HEADING_CANCELED = 'canceled';
export const HEADING_DELIVERED = 'delivered';
export const HEADING_OFFER_EXPIRED = 'expire';
export const HEADING_RECEIVED = 'received';
export const HEADING_PREAUTHORIZED = 'preauthorized';
export const HEADING_ACCEPTED_CUSTOMER = 'customer-accepted';
export const HEADING_DECLINED_CUSTOMER = 'customer-declined';
export const HEADING_SERVICE_COMPLETE = 'complete-service';
const createListingLink = (listingId, label, listingDeleted, searchParams = {}, className = '') => {
  if (!listingDeleted) {
    const params = { id: listingId, slug: createSlug(label) };
    const to = { search: stringify(searchParams) };
    return (
      <NamedLink className={className} name="ListingPage" params={params} to={to}>
        {label}
      </NamedLink>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

const ListingDeletedInfoMaybe = props => {
  return props.listingDeleted ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.messageDeletedListing" />
    </p>
  ) : null;
};

const HeadingCustomer = props => {
  const { className, id, values, listingDeleted } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const HeadingCustomerWithSubtitle = props => {
  const { className, id, values, subtitleId, subtitleValues, children, listingDeleted } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
        <FormattedMessage id={subtitleId} values={subtitleValues} />
      </h1>
      {children}
      <ListingDeletedInfoMaybe listingDeleted={listingDeleted} />
    </React.Fragment>
  );
};

const CustomerBannedInfoMaybe = props => {
  return props.isCustomerBanned ? (
    <p className={css.transactionInfoMessage}>
      <FormattedMessage id="TransactionPanel.customerBannedStatus" />
    </p>
  ) : null;
};

const HeadingProvider = props => {
  const { className, id, values, isCustomerBanned, children } = props;
  return (
    <React.Fragment>
      <h1 className={className}>
        <span className={css.mainTitle}>
          <FormattedMessage id={id} values={values} />
        </span>
      </h1>
      {children}
      <CustomerBannedInfoMaybe isCustomerBanned={isCustomerBanned} />
    </React.Fragment>
  );
};

// Functional component as a helper to choose and show Order or Sale heading info:
// title, subtitle, and message
const PanelHeading = props => {
  const {
    className,
    rootClassName,
    panelHeadingState,
    customerName,
    providerName,
    listingId,
    listingTitle,
    listingDeleted,
    isCustomerBanned,
    isProduct,
    currentListing,
  } = props;

  const isListingTypeProduct = currentListing?.attributes?.publicData?.category === 'product';
  const isCustomer = props.transactionRole === 'customer';

  const defaultRootClassName = isCustomer ? css.headingOrder : css.headingSale;
  const titleClasses = classNames(rootClassName || defaultRootClassName, className);
  const listingLink = createListingLink(listingId, listingTitle, listingDeleted);
  switch (panelHeadingState) {
    case HEADING_ENQUIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderEnquiredTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isListingTypeProduct
              ? 'TransactionPanel.saleEnquiredTitleProduct'
              : 'TransactionPanel.saleEnquiredTitle'
          }
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_PAYMENT_PENDING:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderPaymentPendingTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.salePaymentPendingTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        >
          <p className={css.transactionInfoMessage}>
            <FormattedMessage
              id="TransactionPanel.salePaymentPendingInfo"
              values={{ customerName }}
            />
          </p>
        </HeadingProvider>
      );
    case HEADING_OFFER_EXPIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.orderOfferExpiredTitleProduct'
              : 'TransactionPanel.orderOfferExpiredTitle'
          }
          values={{ listingLink, providerName }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.saleOfferExpiredTitleProduct'
              : 'TransactionPanel.saleOfferExpiredTitle'
          }
          values={{ listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_PAYMENT_EXPIRED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderPaymentExpiredTitle"
          values={{ listingLink }}
          listingDeleted={listingDeleted}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.salePaymentExpiredTitle"
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_REQUESTED:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderPreauthorizedTitle"
          values={{ customerName }}
          subtitleId={
            isProduct
              ? 'TransactionPanel.orderPreauthorizedSubtitleProduct'
              : 'TransactionPanel.orderPreauthorizedSubtitle'
          }
          subtitleValues={{ listingLink }}
        >
          {!listingDeleted ? (
            <p className={css.transactionInfoMessage}>
              <FormattedMessage
                id={
                  isProduct
                    ? 'TransactionPanel.orderPreauthorizedInfoProduct'
                    : 'TransactionPanel.orderPreauthorizedInfo'
                }
                values={{ providerName }}
              />
            </p>
          ) : null}
        </HeadingCustomerWithSubtitle>
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.saleRequestedTitleProduct'
              : 'TransactionPanel.saleRequestedTitle'
          }
          values={{ customerName, listingLink }}
        >
          {!isCustomerBanned ? (
            <p className={titleClasses}>
              <FormattedMessage id="TransactionPanel.saleRequestedInfo" values={{ customerName }} />
            </p>
          ) : null}
        </HeadingProvider>
      );
    case HEADING_ACCEPTED:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderPreauthorizedTitle"
          values={{ customerName }}
          subtitleId={
            isProduct
              ? 'TransactionPanel.orderAcceptedSubtitleProduct'
              : 'TransactionPanel.orderAcceptedSubtitle'
          }
          subtitleValues={{ listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.saleAcceptedTitleProduct'
              : 'TransactionPanel.saleAcceptedTitle'
          }
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_ACCEPTED_CUSTOMER:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderAcceptedByCustomerTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderAcceptedByCustomerSubTitle"
          subtitleValues={{ listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.orderAcceptedByCustomerTitleProduct'
              : 'TransactionPanel.orderAcceptedByCustomerTitleForProvider'
          }
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_SERVICE_COMPLETE:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderServiceCompleteCustomerTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderServiceCompleteCustomerSubTitle"
          subtitleValues={{ listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.orderServiceCompleteTitleProduct"
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_DECLINED_CUSTOMER:
      return isCustomer ? (
        <HeadingCustomerWithSubtitle
          className={titleClasses}
          id="TransactionPanel.orderDeclinedByCustomerTitle"
          values={{ customerName }}
          subtitleId="TransactionPanel.orderDeclinedByCustomerSubTitle"
          subtitleValues={{ listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.orderDeclinedByCustomerTitleProduct'
              : 'TransactionPanel.orderDeclinedByCustomerTitleForProvider'
          }
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_DECLINED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.orderDeclinedTitleProduct'
              : 'TransactionPanel.orderDeclinedTitle'
          }
          values={{ customerName, listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.saleDeclinedTitleProduct'
              : 'TransactionPanel.saleDeclinedTitle'
          }
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_CANCELED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id="TransactionPanel.orderCancelledTitle"
          values={{ customerName, listingLink }}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id="TransactionPanel.saleCancelledTitle"
          values={{ customerName, listingLink }}
        />
      );
    case HEADING_DELIVERED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.orderDeliveredTitleProduct'
              : 'TransactionPanel.orderDeliveredTitle'
          }
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.saleDeliveredTitleProduct'
              : 'TransactionPanel.saleDeliveredTitle'
          }
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    case HEADING_PREAUTHORIZED:
      return isCustomer ? (
        <HeadingCustomer
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.orderDeliveredTitleProduct'
              : 'TransactionPanel.orderDeliveredTitle'
          }
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      ) : (
        <HeadingProvider
          className={titleClasses}
          id={
            isProduct
              ? 'TransactionPanel.saleDeliveredTitleProduct'
              : 'TransactionPanel.saleDeliveredTitle'
          }
          values={{ customerName, listingLink }}
          isCustomerBanned={isCustomerBanned}
        />
      );
    default:
      console.warn('Unknown state given to panel heading.');
      return null;
  }
};

export default PanelHeading;
