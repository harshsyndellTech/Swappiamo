import React, { Component } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import {
  calculateQuantityFromDates,
  calculateQuantityFromHours,
  timestampToDate,
} from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  FieldDateRangeInput,
  FieldSelectModern,
  FieldTextInput,
  Form,
  IconSpinner,
  Modal,
  PrimaryButton,
} from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';
import FieldDateAndTimeInput from './FieldDateAndTimeInput';
import { types as sdkTypes } from '../../util/sdkLoader';
import { START_DATE, END_DATE } from '../../util/dates';
import moment from 'moment';
import css from './BookingTimeForm.module.css';
import { bookingDatesRequired, composeValidators, required } from '../../util/validators';
const { Money } = sdkTypes;
const identity = v => v;
export class BookingFullFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuneAvailable: true,
      suneError: false,
      addressFlag: false,
      focusedInput: null,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues, form) {
    const { startDate, endDate } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};
    const price = this.props.price;
    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;
    const quantity = calculateQuantityFromDates(startDate, endDate);
    const totalAmount = quantity ? price * quantity : null;
    if (totalAmount) {
      form.change('price', price);
      form.change('totalAmount', totalAmount);
      form.change('category', 'service');
    }

    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate },
        listingId,
        isOwnListing,
      });
    }
  }

  render() {
    const { rootClassName, className, price, listingPrice, ...rest } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const unitPrice = listingPrice
      ? listingPrice
      : price
      ? new Money(price, config.currency)
      : null;
    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingTimeForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingTimeForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            form,
            pristine,
            handleSubmit,
            intl,
            isOwnListing,
            listingId,
            submitButtonWrapperClassName,
            unitType,
            values,
            monthlyTimeSlots,
            onFetchTimeSlots,
            timeZone,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
            isCategoryService,
            invalid,
            disabled,
            submitInProgress,
            deliveryMethod,
            onManageDisableScrolling,
            currentUser,
            isEventListing,
            isVacanzeCategory,
            formId,
            timeSlots,
            listingPrice,
            listing,
          } = fieldRenderProps;
          const isMethodDelivery =
            values?.delivery_method?.key === 'delivery_only' || deliveryMethod === 'delivery_only';
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};
          const availableSune = this?.props?.currentUser?.attributes?.profile?.metadata?.sune;
          const price = this.props.price;
          const isProductSuneError = isCategoryService ? null : availableSune < price;
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingTimeForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({
            id: 'BookingTimeForm.bookingEndTitle',
          });
          const category = listing?.attributes?.publicData?.category;
          if (!isCategoryService) {
            form.change('price', price);
          }
          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData =
            startDate && endDate
              ? {
                  unitType,
                  startDate,
                  endDate,
                  timeZone,
                }
              : null;
          const showEstimatedBreakdown =
            bookingData && lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;
          const priceValues = {
            price: values?.price,
            totalAmount: values?.totalAmount,
          };
          const bookingInfoMaybe = showEstimatedBreakdown ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingTimeForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe
                bookingData={bookingData}
                lineItems={lineItems}
                priceValues={priceValues}
                isEventListing={isEventListing}
                category={category}
              />
            </div>
          ) : null;

          const loadingSpinnerMaybe = fetchLineItemsInProgress ? (
            <IconSpinner className={css.spinner} />
          ) : null;

          const bookingInfoErrorMaybe = fetchLineItemsError ? (
            <span className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.fetchLineItemsError" />
            </span>
          ) : null;
          const submitDisabled = invalid || disabled || submitInProgress;
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );
          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
          const startDateInputProps = {
            label: bookingStartLabel,
            placeholderText: startDatePlaceholder,
          };
          const endDateInputProps = {
            label: bookingEndLabel,
            placeholderText: endDatePlaceholder,
          };

          const dateInputProps = {
            startDateInputProps,
            endDateInputProps,
          };

          return (
            <Form onSubmit={handleSubmit} className={classes} enforcePagePreloadFor="CheckoutPage">
              <FormSpy
                subscription={{ values: true }}
                onChange={values => {
                  this.handleOnChange(values, form);
                }}
              />

              {timeSlots && isVacanzeCategory ? (
                <FieldDateRangeInput
                  className={css.bookingDates}
                  name="bookingDates"
                  unitType={unitType}
                  startDateId={`${formId}.bookingStartDate`}
                  startDateLabel={intl.formatMessage({
                    id: 'BookingTimeForm.BookingFullForm.startDateLabel',
                  })}
                  startDatePlaceholderText={startDatePlaceholderText}
                  endDateId={`${formId}.bookingEndDate`}
                  endDateLabel={intl.formatMessage({
                    id: 'BookingTimeForm.BookingFullForm.endDateLabel',
                  })}
                  endDatePlaceholderText={endDatePlaceholderText}
                  focusedInput={this.state.focusedInput}
                  onFocusedInputChange={this.onFocusedInputChange}
                  format={identity}
                  timeSlots={timeSlots}
                  useMobileMargins
                  validate={composeValidators(
                    required(
                      intl.formatMessage({
                        id: 'BookingTimeForm.BookingFullForm.dateRequiredMessage',
                      })
                    ),
                    bookingDatesRequired(
                      intl.formatMessage({
                        id: 'BookingTimeForm.BookingFullForm.startDateRequiredMessage',
                      }),
                      intl.formatMessage({
                        id: 'BookingTimeForm.BookingFullForm.endDateRequiredMessage',
                      })
                    )
                  )}
                  disabled={fetchLineItemsInProgress}
                />
              ) : null}

              {bookingInfoMaybe}
              {loadingSpinnerMaybe}
              {bookingInfoErrorMaybe}
              {!currentUser ? (
                <p className={css.notLogedInMessage}>
                  <FormattedMessage id="BookingTimeForm.BookingTimeForm.notLoggedInMessage" />
                </p>
              ) : null}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingTimeForm.ownListing'
                      : 'BookingTimeForm.youWontBeChargedInfo'
                  }
                />
              </p>

              <div className={submitButtonClasses}>
                {isMethodDelivery && !isOwnListing && currentUser ? (
                  <PrimaryButton
                    type="button"
                    // inProgress={submitInProgress}
                    onClick={() => this.setState({ addressFlag: true })}
                    // disabled={submitDisabled}
                  >
                    <FormattedMessage id="BookingTimeForm.requestToBookProduct" />
                  </PrimaryButton>
                ) : currentUser ? (
                  <PrimaryButton
                    type="submit"
                    inProgress={submitInProgress}
                    disabled={submitDisabled}
                  >
                    {isCategoryService || isVacanzeCategory ? (
                      <FormattedMessage id="BookingTimeForm.requestToBook" />
                    ) : (
                      <FormattedMessage id="BookingTimeForm.requestToBookProduct" />
                    )}
                  </PrimaryButton>
                ) : null}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingFullFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  listingId: null,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  monthlyTimeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingFullFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  listingId: propTypes.uuid,
  monthlyTimeSlots: object,
  onFetchTimeSlots: func.isRequired,

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingFullForm = compose(injectIntl)(BookingFullFormComponent);
BookingFullForm.displayName = 'BookingFullForm';

export default BookingFullForm;
