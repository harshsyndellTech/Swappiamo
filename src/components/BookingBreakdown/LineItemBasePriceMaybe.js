import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import config from '../../config';

import css from './BookingBreakdown.module.css';

const LineItemBasePriceMaybe = props => {
  const {
    transaction,
    unitType,
    intl,
    price,
    totalAmount,
    isEventListing,
    category,
    isRefund,
  } = props;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const isProduct = category === 'product' || category === 'vacanze';
  const translationKey = isNightly
    ? 'BookingBreakdown.baseUnitNight'
    : isDaily
    ? 'BookingBreakdown.baseUnitDay'
    : category === 'event'
    ? 'BookingBreakdown.baseUnitEvent'
    : category === 'product'
    ? 'BookingBreakdown.UnitQuantity'
    : 'BookingBreakdown.baseUnitQuantity';

  // console.log('translationKey', translationKey);
  // Find correct line-item for given unitType prop.
  // It should be one of the following: 'line-item/night, 'line-item/day', 'line-item/units', or 'line-item/time'
  // These are defined in '../../util/types';
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  const quantity = unitPurchase ? unitPurchase.quantity.toString() : null;
  const unitPrice = (
    <span>
      <img className={css.logo} src={config.custom.suneCurrencySymbolBlack} />
      <span className={css.itemValue}>{price || totalAmount}</span>
    </span>
  );
  // const unitPrice = unitPurchase ? formatMoney(intl, unitPurchase.unitPrice) : null;
  const total = unitPurchase ? formatMoney(intl, unitPurchase.lineTotal) : null;
  return quantity && total && isProduct ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        {isRefund ? (
          <FormattedMessage id="BookingBreakdown.refundSune" />
        ) : (
          <FormattedMessage id={translationKey} values={{ unitPrice, quantity }} />
        )}
        {/* <FormattedMessage id={translationKey} values={{ unitPrice, quantity }} /> */}
      </span>
      {/* <span className={css.itemValue}>{total}</span> */}
      <span>
        {/* {isRefund ? '- ' : ''} */}
        <img className={css.logo} src={config.custom.suneCurrencySymbolBlack} />
        <span className={css.itemValue}>{totalAmount || price}</span>
      </span>
    </div>
  ) : null;
};

LineItemBasePriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemBasePriceMaybe;
