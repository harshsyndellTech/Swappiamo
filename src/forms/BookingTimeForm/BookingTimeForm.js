import React, { Component, useEffect } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { calculateQuantityFromHours, timestampToDate } from '../../util/dates';
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
import moment from 'moment';
import css from './BookingTimeForm.module.css';
import { composeValidators, quantityValidation, required } from '../../util/validators';
const { Money } = sdkTypes;
const identity = v => v;
export class BookingTimeFormComponent extends Component {
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
    this.props.onSubmit(e);
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues, form) {
    const { bookingStartTime, bookingEndTime } = formValues.values;
    const { listing } = this.props;
    const category = listing?.attributes?.publicData?.category;
    const startDate = bookingStartTime ? timestampToDate(bookingStartTime) : null;
    let endDate = bookingEndTime ? timestampToDate(bookingEndTime) : null;
    if (category === 'event') {
      const remainingStartHours = 24 - moment(startDate).hours();
      endDate = new Date(moment(startDate).add(remainingStartHours, 'hours'));
    }

    const availableSune = this?.props?.currentUser?.attributes?.profile?.metadata?.sune;
    const price = this.props.price;
    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;
    const quantity = calculateQuantityFromHours(startDate, endDate);
    const totalAmount = category === 'event' ? price : quantity ? price * quantity : null;
    if (totalAmount) {
      form.change('price', price);
      form.change('totalAmount', totalAmount);
      form.change('category', 'service');
    }
    // if (availableSune < totalAmount) {
    //   this.setState({ suneError: true });
    // } else {
    //   this.setState({ suneError: false });
    // }
    // We expect values bookingStartTime and bookingEndTime to be strings
    // which is the default case when the value has been selected through the form
    const isSameTime = bookingStartTime === bookingEndTime;

    if (bookingStartTime && bookingEndTime && !isSameTime && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate },
        listingId,
        isOwnListing,
      });
    }
  }

  render() {
    const { rootClassName, className, listingPrice, price, ...rest } = this.props;
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
            isProductCategory,
            onFetchTransactionLineItems,
            listing,
          } = fieldRenderProps;
          const currentStock = listing.currentStock?.attributes?.quantity;
          const category = listing?.attributes?.publicData?.category;
          const isOutOfStock = currentStock === 0;
          useEffect(() => {
            if (isProductCategory && values?.quantity) {
              form.change('totalAmount', +values?.quantity * price);
              onFetchTransactionLineItems({
                bookingData: {
                  startDate: new Date(),
                  endDate: new Date(),
                  quantity: values?.quantity,
                },
                listingId,
                isOwnListing,
              });
            }
          }, [values?.quantity]);

          if (isProductCategory && isOutOfStock) {
            return (
              <div className={classes}>
                <p className={css.error}>
                  <FormattedMessage id="BookingTimeForm.listingOutOfStock" />
                </p>
              </div>
            );
          }
          const isMethodDelivery =
            values?.delivery_method?.key === 'delivery_only' || deliveryMethod === 'delivery_only';
          const startTime = values && values.bookingStartTime ? values.bookingStartTime : null;
          const endTime = values && values.bookingEndTime ? values.bookingEndTime : null;
          const availableSune = this?.props?.currentUser?.attributes?.profile?.metadata?.sune;
          const price = this.props.price;
          const isProductSuneError = isCategoryService ? null : availableSune < price;
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingTimeForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({
            id: 'BookingTimeForm.bookingEndTitle',
          });

          const startDate = startTime ? timestampToDate(startTime) : null;
          let endDate = endTime ? timestampToDate(endTime) : null;
          if (category === 'event') {
            const remainingStartHours = startDate ? 24 - moment(startDate)?.hours() : 0;
            endDate = new Date(moment(startDate)?.add(remainingStartHours, 'hours'));
          }
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
              : isProductCategory && values?.quantity
              ? {
                  unitType,
                  startDate: new Date(),
                  endDate: new Date(),
                }
              : null;
          const showEstimatedBreakdown =
            bookingData && lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;
          const priceValues = {
            price: values?.price,
            totalAmount: values?.totalAmount,
          };

          const bookingInfoMaybe =
            showEstimatedBreakdown || (isProductCategory && values?.quantity) ? (
              <div className={css.priceBreakdownContainer}>
                <h3 className={css.priceBreakdownTitle}>
                  <FormattedMessage id="BookingTimeForm.priceBreakdownTitle" />
                </h3>
                <EstimatedBreakdownMaybe
                  bookingData={bookingData}
                  lineItems={lineItems}
                  priceValues={priceValues}
                  isEventListing={isEventListing}
                  isProductCategory={isProductCategory}
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
              {}
              {deliveryMethod === 'pick_or_delivery' ? (
                <FieldSelectModern
                  className={css.select}
                  id="delivery_method"
                  name="delivery_method"
                  label={intl.formatMessage({ id: 'BookingTimeForm.deliveryMethod' })}
                  options={config.custom.bookingDeliveryMethods?.map(m => ({
                    ...m,
                    label: intl.formatMessage({ id: m.label }),
                  }))}
                  placeholder={<FormattedMessage id="BookingTimeForm.deliveryMethodPlaceholder" />}
                  validate={required(
                    intl.formatMessage({ id: 'BookingTimeForm.deliveryMethodRequired' })
                  )}
                />
              ) : null}
              {isProductCategory ? (
                <FieldTextInput
                  className={css.select}
                  id="quantity"
                  name="quantity"
                  type="number"
                  initialValue="1"
                  disabled
                  label={intl.formatMessage({ id: 'BookingTimeForm.quantity' })}
                  placeholder={intl.formatMessage({ id: 'BookingTimeForm.quantityPlaceholder' })}
                  validate={composeValidators(
                    quantityValidation(
                      <FormattedMessage
                        id="BookingTimeForm.maxQuantity"
                        values={{ currentStock }}
                      />,
                      currentStock
                    ),
                    required(intl.formatMessage({ id: 'BookingTimeForm.quantityRequired' }))
                  )}
                />
              ) : null}
              <Modal
                className={css.modal}
                isOpen={this.state.addressFlag}
                onManageDisableScrolling={onManageDisableScrolling}
                onClose={() => this.setState({ addressFlag: false })}
              >
                {isMethodDelivery && !isOwnListing ? (
                  <div>
                    <h2>
                      <FormattedMessage id="BookingTimeForm.deliveryAddress" />
                    </h2>

                    <div className={css.address}>
                      <FieldTextInput
                        className={css.select}
                        id="address"
                        name="address"
                        type="text"
                        label={intl.formatMessage({ id: 'BookingTimeForm.address' })}
                        placeholder={intl.formatMessage({
                          id: 'BookingTimeForm.addressPlaceholder',
                        })}
                        validate={required(
                          intl.formatMessage({ id: 'BookingTimeForm.addressRequired' })
                        )}
                        autoFocus
                      />
                      <FieldTextInput
                        className={css.select}
                        id="postal"
                        name="postal"
                        type="number"
                        label={intl.formatMessage({ id: 'BookingTimeForm.postal' })}
                        placeholder={intl.formatMessage({
                          id: 'BookingTimeForm.postalPlaceholder',
                        })}
                        validate={required(
                          intl.formatMessage({ id: 'BookingTimeForm.postalRequired' })
                        )}
                      />
                      <FieldTextInput
                        className={css.select}
                        id="city"
                        name="city"
                        type="text"
                        label={<FormattedMessage id="BookingTimeForm.city" />}
                        placeholder={intl.formatMessage({ id: 'BookingTimeForm.cityPlaceholder' })}
                        validate={required(
                          intl.formatMessage({ id: 'BookingTimeForm.cityRequired' })
                        )}
                      />
                      {/* <FieldTextInput
                        className={css.select}
                        id="state"
                        name="state"
                        type="text"
                        label="State"
                        placeholder="Enter your State"
                        validate={required(
                          intl.formatMessage({ id: 'BookingTimeForm.stateRequired' })
                        )}
                      /> */}
                      <FieldSelectModern
                        className={css.select}
                        id="country"
                        name="country"
                        type="text"
                        label={<FormattedMessage id="BookingTimeForm.country" />}
                        options={config.custom.countries?.filter(c => c.key === 'IT')}
                        placeholder={<FormattedMessage id="BookingTimeForm.countryPlaceholder" />}
                        validate={required(
                          intl.formatMessage({ id: 'BookingTimeForm.countryRequired' })
                        )}
                      />
                    </div>
                    <PrimaryButton
                      type="submit"
                      inProgress={submitInProgress}
                      disabled={submitDisabled}
                    >
                      <FormattedMessage id="BookingTimeForm.saveAddress" />
                    </PrimaryButton>
                  </div>
                ) : null}
              </Modal>
              {monthlyTimeSlots && timeZone && isVacanzeCategory ? (
                <FieldDateRangeInput
                  className={css.bookingDates}
                  name="bookingDates"
                  unitType={unitType}
                  startDateId={`${formId}.bookingStartDate`}
                  startDateLabel={'Start Date'}
                  startDatePlaceholderText={'Start Date'}
                  endDateId={`${formId}.bookingEndDate`}
                  endDateLabel={'End Date'}
                  endDatePlaceholderText={'End Date'}
                  focusedInput={this.state.focusedInput}
                  onFocusedInputChange={this.onFocusedInputChange}
                  format={identity}
                  timeSlots={timeSlots}
                  useMobileMargins
                  validate={composeValidators(
                    required('Please select a start date.')
                    // bookingDatesRequired(startDateErrorMessage, endDateErrorMessage),
                  )}
                  disabled={fetchLineItemsInProgress}
                />
              ) : null}
              {monthlyTimeSlots && timeZone && isCategoryService ? (
                <FieldDateAndTimeInput
                  {...dateInputProps}
                  className={css.bookingDates}
                  listingId={listingId}
                  bookingStartLabel={bookingStartLabel}
                  onFetchTimeSlots={onFetchTimeSlots}
                  monthlyTimeSlots={monthlyTimeSlots}
                  values={values}
                  intl={intl}
                  form={form}
                  pristine={pristine}
                  timeZone={timeZone}
                  category={category}
                />
              ) : null}
              {/* {isCategoryService || isVacanzeCategory ? null : (
                <div className={css.productContainer}>
                  <p>
                    <FormattedMessage id="BookingTimeForm.total" />
                  </p>
                  <p>
                    <img src={config.custom.suneCurrencySymbolBlack} className={css.icon} />
                    {price}{' '}
                  </p>
                </div>
              )} */}
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

              {/* {this.state.suneError || isProductSuneError ? (
                <>
                  {fetchLineItemsInProgress ? null : (
                    <p className={css.error}>
                      {isCategoryService ? (
                        <FormattedMessage id="BookingTimeForm.suneErrorMessage" />
                      ) : (
                        <FormattedMessage id="BookingTimeForm.suneErrorMessageProduct" />
                      )}
                    </p>
                  )}
                </>
              ) : ( */}

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
                    {isCategoryService ? (
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

BookingTimeFormComponent.defaultProps = {
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

BookingTimeFormComponent.propTypes = {
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

const BookingTimeForm = compose(injectIntl)(BookingTimeFormComponent);
BookingTimeForm.displayName = 'BookingTimeForm';

export default BookingTimeForm;
