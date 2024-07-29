const {
  calculateQuantityFromHours,
  calculateTotalFromLineItems,
  calculateQuantityFromDates,
} = require('./lineItemHelpers');
const { types } = require('sharetribe-flex-sdk');

const { Money } = types;

// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/units';
const hourlyUnitType = 'line-item/hour';
const dailyUnitType = 'line-item/night';
const PROVIDER_COMMISSION_PERCENTAGE = -10;
const CUSTOMER_COMMISSION_PERCENTAGE = 100;
/** Returns collection of lineItems (max 50)
 *
 * Each line items has following fields:
 * - `code`: string, mandatory, indentifies line item type (e.g. \"line-item/cleaning-fee\"), maximum length 64 characters.
 * - `unitPrice`: money, mandatory
 * - `lineTotal`: money
 * - `quantity`: number
 * - `percentage`: number (e.g. 15.5 for 15.5%)
 * - `seats`: number
 * - `units`: number
 * - `includeFor`: array containing strings \"customer\" or \"provider\", default [\":customer\"  \":provider\" ]
 *
 * Line item must have either `quantity` or `percentage` or both `seats` and `units`.
 *
 * `includeFor` defines commissions. Customer commission is added by defining `includeFor` array `["customer"]` and provider commission by `["provider"]`.
 *
 * @param {Object} listing
 * @param {Object} bookingData
 * @returns {Array} lineItems
 */
exports.transactionLineItems = (listing, bookingData) => {
  // const unitPrice = listing.attributes.price;
  const { publicData, price } = listing.attributes;
  const { category } = publicData;
  const currency = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY || 'USD';
  const isDaily = category === 'vacanze';
  const isHourly =
    // category === 'event' ||
    category === 'service';
  const isEvent = category === 'event';
  const unitPrice = price ? price : new Money(0, currency);
  const { startDate, endDate, quantity = 1 } = bookingData;

  /**
   * If you want to use pre-defined component and translations for printing the lineItems base price for booking,
   * you should use code line-item/units
   *
   * Pre-definded commission components expects line item code to be one of the following:
   * 'line-item/provider-commission', 'line-item/customer-commission'
   *
   * By default BookingBreakdown prints line items inside LineItemUnknownItemsMaybe if the lineItem code is not recognized. */

  const booking = {
    code: isDaily ? dailyUnitType : isHourly || isEvent ? hourlyUnitType : bookingUnitType,
    unitPrice,
    quantity: isEvent
      ? 1
      : isDaily
      ? calculateQuantityFromDates(startDate, endDate)
      : isHourly
      ? calculateQuantityFromHours(startDate, endDate)
      : quantity,
    includeFor: ['customer', 'provider'],
  };
  const providerCommission = {
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems([booking]),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };
  const totalAmount = calculateTotalFromLineItems([booking])?.amount;
  //commission is 6% of total amount + 0.80eur
  const commissionAmount = totalAmount * 0.06 + 80;
  const commission = new Money(commissionAmount, currency);

  const customerCommission = {
    code: 'line-item/customer-commission',
    unitPrice: commission,
    quantity: 1,
    // percentage: CUSTOMER_COMMISSION_PERCENTAGE,
    includeFor: ['customer'],
  };
  //add customer commission line item to 0.70eur

  const lineItems = totalAmount ? [booking, customerCommission] : [booking];

  return lineItems;
};
