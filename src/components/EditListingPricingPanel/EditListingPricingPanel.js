import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.module.css';
import useInitialValues from '../UseInitialValuesHook/useInitialValues';
import { getDefaultTimeZoneOnBrowser } from '../../util/dates';

const { Money } = sdkTypes;

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    handleShowPayoutDetails,
    showPayoutDetails,
  } = props;
  const [payoutDetails, setPayoutDetails] = useState(false);
  // useEffect(() => {
  //   setPayoutDetails(handleShowPayoutDetails());
  // }, []);

  const intl = useIntl();
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price, publicData } = currentListing.attributes;

  const currentStockRaw = currentListing?.currentStock?.attributes?.quantity;
  // console.log({ currentStockRaw });
  const currentStock = typeof currentStockRaw != null ? currentStockRaw : 1;
  // console.log({ currentStockRaw, currentStock });
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingPricingPanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const showInitialValues = {
    pricee: price,
    price: publicData.price ? publicData.price : undefined,
    delivery_option: publicData.deliveryOption
      ? config.custom.deliveryOptions
          ?.map(k => ({ ...k, label: intl.formatMessage({ id: k.label }) }))
          .find(i => i.key === publicData.deliveryOption)
      : undefined,
    stock: currentStock,
  };
  const { initialValues, updateInitialValues } = useInitialValues(showInitialValues);
  const { category, subcategory } = publicData;
  const defaultAvailabilityPlan =
    category === 'service'
      ? {
          type: 'availability-plan/time',
          timezone: getDefaultTimeZoneOnBrowser(),
          entries: [
            { dayOfWeek: 'mon', startTime: '00:00', endTime: '00:00', seats: 1 },
            { dayOfWeek: 'tue', startTime: '00:00', endTime: '00:00', seats: 1 },
            { dayOfWeek: 'wed', startTime: '00:00', endTime: '00:00', seats: 1 },
            { dayOfWeek: 'thu', startTime: '00:00', endTime: '00:00', seats: 1 },
            { dayOfWeek: 'fri', startTime: '00:00', endTime: '00:00', seats: 1 },
            { dayOfWeek: 'sat', startTime: '00:00', endTime: '00:00', seats: 1 },
            { dayOfWeek: 'sun', startTime: '00:00', endTime: '00:00', seats: 1 },
          ],
        }
      : category === 'event'
      ? {
          type: 'availability-plan/time',
          timezone: getDefaultTimeZoneOnBrowser(),
          entries: [
            { dayOfWeek: 'mon', startTime: '00:00', endTime: '00:00', seats: 9999 },
            { dayOfWeek: 'tue', startTime: '00:00', endTime: '00:00', seats: 9999 },
            { dayOfWeek: 'wed', startTime: '00:00', endTime: '00:00', seats: 9999 },
            { dayOfWeek: 'thu', startTime: '00:00', endTime: '00:00', seats: 9999 },
            { dayOfWeek: 'fri', startTime: '00:00', endTime: '00:00', seats: 9999 },
            { dayOfWeek: 'sat', startTime: '00:00', endTime: '00:00', seats: 9999 },
            { dayOfWeek: 'sun', startTime: '00:00', endTime: '00:00', seats: 9999 },
          ],
        }
      : category === 'vacanze'
      ? {
          type: 'availability-plan/day',
          entries: [
            { dayOfWeek: 'mon', seats: 1 },
            { dayOfWeek: 'tue', seats: 1 },
            { dayOfWeek: 'wed', seats: 1 },
            { dayOfWeek: 'thu', seats: 1 },
            { dayOfWeek: 'fri', seats: 1 },
            { dayOfWeek: 'sat', seats: 1 },
            { dayOfWeek: 'sun', seats: 1 },
          ],
        }
      : null;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={initialValues}
      publicData={publicData}
      payoutDetails={payoutDetails}
      showPayoutDetails={showPayoutDetails}
      onSubmit={values => {
        const { price, pricee, delivery_option, stock } = values;
        const hasStockQuantityChanged = stock && currentStockRaw !== stock;
        const oldTotal = currentStockRaw != null ? currentStockRaw : null;
        const stockUpdateMaybe =
          hasStockQuantityChanged && category == 'product'
            ? {
                stockUpdate: {
                  oldTotal,
                  newTotal: parseInt(stock),
                },
              }
            : {};

        const updateValues = {
          ...stockUpdateMaybe,
          availabilityPlan: defaultAvailabilityPlan,
          price: pricee,
          publicData: {
            price: +price,
            deliveryOption: category === 'product' ? delivery_option?.key : undefined,
          },
        };
        updateInitialValues({ ...values });
        onSubmit(updateValues);
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
      category={category}
      handleShowPayoutDetails={handleShowPayoutDetails}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );
  const note = <FormattedMessage id="DescriptionForm.note" />;
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>

      <h4 className={css.note}>{note}</h4>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;
