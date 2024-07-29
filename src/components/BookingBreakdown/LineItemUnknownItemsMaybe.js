/**
 * Renders non-reversal line items that are not listed in the
 * `LINE_ITEMS` array in util/types.js
 *
 * The line items are rendered so that the line item code is formatted to human
 * readable form and the line total is printed as price.
 *
 * If you require another kind of presentation for your line items, add them to
 * the `LINE_ITEMS` array in util/types.js and create a specific line item
 * component for them that can be used in the `BookingBreakdown` component.
 */
import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { humanizeLineItemCode } from '../../util/data';
import { LINE_ITEMS, LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemUnknownItemsMaybe = props => {
  const {
    transaction,
    isProvider,
    intl,
    isEventListing,
    unitType,
    isProductCategory,
    category,
  } = props;
  // resolve unknown non-reversal line items
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const isUnit = unitType === 'line-item/units';
  let priceLabel;
  if (category === 'event') {
    priceLabel = 'event.breakdownInfo';
  } else if (category === 'vacanze') {
    priceLabel = '';
  } else if (category === 'service') {
    priceLabel = 'service.breakdownInfo';
  } else {
    priceLabel = 'product.breakdownInfo';
  }
  const payIn = transaction?.attributes?.payinTotal?.amount;
  if (payIn === 0) return null;
  const allItems = transaction.attributes.lineItems.filter(
    item =>
      (LINE_ITEMS.indexOf(item.code) === -1 ||
        LINE_ITEMS.indexOf(item.code) === 0 ||
        LINE_ITEMS.indexOf(item.code) === 1 ||
        LINE_ITEMS.indexOf(item.code) === 2) &&
      !item.reversal
  );
  let translationKey = isNightly
    ? 'BookingBreakdown.night'
    : isDaily
    ? 'BookingBreakdown.day'
    : // : isEventListing
      // ? 'BookingBreakdown.unit'
      'BookingBreakdown.unitQuantity';
  translationKey = isProductCategory ? 'BookingBreakdown.unit' : translationKey;
  const items = isProvider
    ? allItems.filter(item => item.includeFor.includes('provider'))
    : allItems.filter(item => item.includeFor.includes('customer'));
  return items.length > 0 ? (
    <React.Fragment>
      {items.map((item, i) => {
        const quantity = item?.quantity || 1;
        // console.log('item', item);
        const price = formatMoney(intl, item.unitPrice);
        // const label =
        //   quantity && quantity > 1
        //     ? `${humanizeLineItemCode(item.code)} x ${quantity}`
        //     : humanizeLineItemCode(item.code);
        const label =
          quantity &&
          `${price} x ${quantity} ${
            category == 'vacanze'
              ? intl.formatMessage({
                  id: quantity > 1 ? 'BookingBreakdown.nightGreater' : translationKey,
                })
              : ''
          } ${
            category != 'vacanze'
              ? intl.formatMessage({
                  id: `${quantity > 1 ? priceLabel + 'Greater' : priceLabel}`,
                })
              : ''
          }`;

        // quantity && quantity > 1
        //   ? `${price} x ${quantity} ${intl.formatMessage({
        //       id: translationKey,
        //     })}`
        //   : `${price} ${intl.formatMessage({
        //       id: translationKey,
        //     })}
        //     `;

        const formattedTotal = formatMoney(intl, item.lineTotal);
        return (
          <div key={`${i}-item.code`} className={css.lineItem}>
            <span className={css.itemLabel}>{label}</span>
            <span className={css.itemValue}>{formattedTotal}</span>
          </div>
        );
      })}
    </React.Fragment>
  ) : null;
};

LineItemUnknownItemsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnknownItemsMaybe;
