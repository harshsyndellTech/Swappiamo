import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  Button,
  Form,
  FieldCurrencyInput,
  FieldTextInput,
  FieldSelectModern,
} from '../../components';
import css from './EditListingPricingForm.module.css';
const { Money } = sdkTypes;
const MINIMUM_SUNE_VALUE = 1;
const MINIMUM_SUNE_VALUE_EVENT = 5;
export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    // initialValues={{
    //   stock: props.category === 'product' ? 1 : undefined,
    // }}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        publicData,
        category,
        payoutDetails,
        showPayoutDetails,
      } = formRenderProps;
      const isPayoutValidation = values?.pricee?.amount > 0 ? !payoutDetails : false;
      const isEvent = category === 'event';
      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });
      const pricePerAmountMsg = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerAmountMsg',
      });
      const serviceLabelOption = intl.formatMessage({
        id: 'EditListingPricingForm.serviceLabelOption',
      });
      const pricePerHour = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerHour',
      });
      const pricePerDay = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerDay',
      });
      const pricePerWeek = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerWeek',
      });
      const pricePerMonth = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerMonth',
      });
      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      // || isPayoutValidation;
      // !payoutDetails;
      const { updateListingError, showListingsError } = fetchErrors || {};

      const deliveryLabel = intl.formatMessage({
        id: 'EditListingPricingForm.deliveryLabel',
      });
      return (
        <Form onSubmit={handleSubmit} className={classes} style={{ gap: '20px' }}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}
          <FieldTextInput
            pricingInput={true}
            id="price"
            name="price"
            type="number"
            className={css.priceInput}
            label={category === 'service' ? pricePerUnitMessage : pricePerAmountMsg}
            placeholder={pricePlaceholderMessage}
            validate={validators.composeValidators(
              validators.minSuneValue(
                intl.formatMessage(
                  {
                    id: 'EditListingPricingForm.suneTooLow',
                  },
                  {
                    minPrice: isEvent ? MINIMUM_SUNE_VALUE_EVENT : MINIMUM_SUNE_VALUE,
                  }
                ),
                isEvent ? MINIMUM_SUNE_VALUE_EVENT : MINIMUM_SUNE_VALUE
              )
            )}
          />
          <div>
            {!payoutDetails ? (
              <p
                className={css.payOutNote}
                onClick={() => {
                  showPayoutDetails();
                }}
              >
                {intl.formatMessage({
                  id: 'EditListingPricingPanel.EditListingPricingPanel.payoutDetailsAddMessage',
                })}
              </p>
            ) : null}
            <FieldCurrencyInput
              id="pricee"
              name="pricee"
              className={css.priceInput}
              label={intl.formatMessage({
                id: 'EditListingPricingForm.EditListingPricingForm.priceeLabel',
              })}
              placeholder={intl.formatMessage({
                id: 'EditListingPricingForm.EditListingPricingForm.priceePlaceholder',
              })}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            />{' '}
          </div>
          {category === 'product' ? (
            <FieldTextInput
              className={css.priceInput}
              id="stock"
              name="stock"
              type="number"
              initialValue={1}
              disabled
              // label={intl.formatMessage({ id: 'EditListingPricingForm.stock' })}
              placeholder={intl.formatMessage({ id: 'EditListingPricingForm.stockPlaceholder' })}
              validate={validators.required(
                intl.formatMessage({ id: 'EditListingPricingForm.stockRequired' })
              )}
              style={{display: "none"}}
            />
          ) : null}
          {category === 'product' ? (
            <div className={css.formRow}>
              <FieldSelectModern
                id="delivery_option"
                className={css.priceInput}
                name="delivery_option"
                label={category === 'service' ? serviceLabelOption : deliveryLabel}
                placeholder={intl.formatMessage({
                  id: 'EditListingPricingForm.deliveryOptionPlaceholder',
                })}
                options={config.custom.deliveryOptions?.map(i => ({
                  ...i,
                  label: intl.formatMessage({ id: i.label }),
                }))}
                validate={validators.fieldSelectModernRequired(
                  intl.formatMessage({ id: 'EditListingPricingForm.deliveryOptionRequired' })
                )}
                multiple={true}
              />
            </div>
          ) : null}
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
