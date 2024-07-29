import React from 'react';
import { bool } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { txIsCanceled, txIsDelivered, txIsDeclined } from '../../util/transaction';
import { propTypes } from '../../util/types';
import config from '../../config';
import css from './BookingBreakdown.module.css';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;
const LineItemUnitPrice = props => {
  const { transaction, isProvider, intl, price, totalAmount, isRefund } = props;
  const payIn = transaction?.attributes?.payinTotal;
  const lineItems = transaction?.attributes?.lineItems;
  const lineItemsWithOutReversal = lineItems.filter(item => !item.reversal);
  const refundTotal = lineItemsWithOutReversal.reduce((total, item) => {
    return total + item.lineTotal.amount;
  }, 0);
  const refundTotalMoney = new Money(refundTotal, payIn.currency);
  const formattedRefundTotal = formatMoney(intl, refundTotalMoney);

  let providerTotalMessageId = 'BookingBreakdown.providerTotalDefault';
  if (txIsDelivered(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDelivered';
  } else if (txIsDeclined(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalDeclined';
  } else if (txIsCanceled(transaction)) {
    providerTotalMessageId = 'BookingBreakdown.providerTotalCanceled';
  }

  const totalLabel = isProvider ? (
    <FormattedMessage id={providerTotalMessageId} />
  ) : (
    <FormattedMessage id="BookingBreakdown.total" />
  );

  const totalPrice = isProvider
    ? transaction.attributes.payoutTotal
    : transaction.attributes.payinTotal;
  const formattedTotalPrice = formatMoney(intl, totalPrice);
  // console.log('formattedTotalPrice: ', formattedTotalPrice);
  return (
    <>
      <hr className={css.totalDivider} />
      <div className={css.lineItemTotal}>
        <div className={css.totalLabel}>
          {isRefund ? <FormattedMessage id="BookingBreakdown.totalRefund" /> : totalLabel}
        </div>
        <div className={css.totalPrice}>
          {/* {isRefund ? (
            <span>
              <img className={css.logo} src={config.custom.suneCurrencySymbolBlack} />
              <span className={css.itemValue}>
                {0}
                {' + ' + formattedTotalPrice}
              </span>
            </span>
          ) : ( */}
          <span>
            <img className={css.logo} src={config.custom.suneCurrencySymbolBlack} />
            <span className={css.itemValue}>
              {totalAmount || price}
              {isRefund
                ? refundTotal != 0
                  ? ' + ' + formattedRefundTotal
                  : null
                : ' + ' + formattedTotalPrice}
              {/* + {formattedTotalPrice} */}
            </span>
          </span>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  isProvider: bool.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
