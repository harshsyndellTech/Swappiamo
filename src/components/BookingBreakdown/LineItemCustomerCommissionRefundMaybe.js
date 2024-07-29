import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { propTypes, LINE_ITEM_CUSTOMER_COMMISSION } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './BookingBreakdown.module.css';
const { Money } = sdkTypes;
const LineItemCustomerCommissionRefundMaybe = props => {
  const { transaction, isCustomer, intl } = props;

  const refund = transaction.attributes.lineItems.find(
    item => item.code === LINE_ITEM_CUSTOMER_COMMISSION && item.reversal
  );
  const lineTotal = refund?.lineTotal?.amount;
  const positiveLineTotal = lineTotal < 0 ? lineTotal * -1 : lineTotal;
  const refundMoney = new Money(positiveLineTotal, refund?.lineTotal?.currency);
  return isCustomer && refund ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.refundCustomerFee" />
      </span>
      <span className={css.itemValue}> {formatMoney(intl, refundMoney)}</span>
    </div>
  ) : null;
};

LineItemCustomerCommissionRefundMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemCustomerCommissionRefundMaybe;
