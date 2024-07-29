import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes, LINE_ITEMS } from '../../util/types';
import config from '../../config';
import css from './BookingBreakdown.module.css';

const LineItemUnitPriceMaybe = props => {
  const {
    transaction,
    unitType,
    intl,
    price,
    sune = false,
    isEventListing = false,
    isProvider,
    totalAmount,
    category,
    isRefund = false,
  } = props;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  let priceLabel;
  if (category === 'event') {
    priceLabel = 'event.breakdownInfo';
  } else if (category === 'vacanze') {
    priceLabel = 'vacanze.breakdownInfo';
  } else if (category === 'service') {
    priceLabel = 'service.breakdownInfo';
  } else {
    priceLabel = 'product.breakdownInfo';
  }
  const translationKey = isNightly
    ? 'BookingBreakdown.pricePerNight'
    : isDaily
    ? 'BookingBreakdown.pricePerDay'
    : isEventListing
    ? 'BookingBreakdown.LineItemUnitPriceMaybe.price'
    : category === 'service'
    ? 'BookingBreakdown.perHour'
    : 'BookingBreakdown.pricePerQuantity';
  const allItems = transaction.attributes.lineItems.filter(
    item => LINE_ITEMS.indexOf(item.code) === -1 && !item.reversal
  );
  // console.log('translationKey', translationKey);

  const items = isProvider
    ? allItems.filter(item => item.includeFor.includes('provider'))
    : allItems.filter(item => item.includeFor.includes('customer'));

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );
  const formattedUnitPrice = unitPurchase ? formatMoney(intl, unitPurchase.unitPrice) : null;
  const unitPrice = (
    <span>
      <img className={css.logo} src={config.custom.suneCurrencySymbolBlack} />
      <span className={css.itemValue}>{price}</span>
    </span>
  );
  return sune ? (
    <React.Fragment>
      {items.map((item, i) => {
        const quantity = item.quantity;

        const label = <FormattedMessage id={translationKey} values={{ unitPrice, quantity }} />;
        // quantity && quantity > 1 ? `Sune x ${quantity}` : 'Sune';
        const formattedTotal = formatMoney(intl, item.lineTotal);
        return (
          <div key={`${i}-item.code`} className={css.lineItem}>
            {isRefund ? (
              <span className={css.itemLabel}>
                {intl.formatMessage({ id: 'BookingBreakdown.refundSune' })}
              </span>
            ) : (
              <span className={css.itemLabel}>
                {label}
                {quantity &&
                  ` x ${quantity} ${intl.formatMessage({
                    id: `${quantity > 1 ? priceLabel + 'Greater' : priceLabel}`,
                  })}`}
              </span>
            )}
            <div>
              {/* {isRefund ? '- ' : null} */}
              <img className={css.logo} src={config.custom.suneCurrencySymbolBlack} />
              <span className={css.itemValue}>{totalAmount}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  ) : null;
};

LineItemUnitPriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPriceMaybe;
