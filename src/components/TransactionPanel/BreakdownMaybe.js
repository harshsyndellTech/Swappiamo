import React from 'react';
import classNames from 'classnames';
import config from '../../config';
import { DATE_TYPE_DATETIME } from '../../util/types';
import { ensureListing } from '../../util/data';
import { BookingBreakdown } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build BookingBreakdown
const BreakdownMaybe = props => {
  const {
    className,
    rootClassName,
    breakdownClassName,
    transaction,
    transactionRole,
    priceValues,
    isEventListing,
    isVacanzeCategory,
    isProductCategory = false,
    category,
  } = props;
  const loaded = isProductCategory
    ? transaction && transaction.id
    : transaction && transaction.id && transaction.booking && transaction.booking.id;

  const listingAttributes = ensureListing(transaction.listing).attributes;
  const timeZone =
    loaded && listingAttributes.availabilityPlan
      ? listingAttributes.availabilityPlan.timezone
      : 'Etc/UTC';

  const classes = classNames(rootClassName || css.breakdownMaybe, className);
  const breakdownClasses = classNames(breakdownClassName || css.breakdown);
  let updatedUnitType;
  switch (category) {
    case 'event':
      updatedUnitType = 'line-item/hour';
      break;
    case 'vacanze':
      updatedUnitType = 'line-item/night';
      break;
    case 'service':
      updatedUnitType = 'line-item/hour';
      break;
    default:
      updatedUnitType = 'line-item/units';
      break;
  }

  return loaded ? (
    <div className={classes}>
      <BookingBreakdown
        className={breakdownClasses}
        userRole={transactionRole}
        unitType={isVacanzeCategory ? 'line-item/night' : updatedUnitType}
        transaction={transaction}
        booking={transaction.booking}
        dateType={DATE_TYPE_DATETIME}
        timeZone={timeZone}
        priceValues={priceValues}
        isEventListing={isEventListing}
        isProductCategory={isProductCategory}
        category={category}
      />
    </div>
  ) : null;
};

export default BreakdownMaybe;
