export const types = {
  SIGN_UP_BONUS: 'SIGN_UP_BONUS',
  FIVE_STAR_REVIEWS_BONUS: '5_STAR_REVIEWS_BONUS',
  REFERRAL_BONUS: 'REFERRAL_BONUS',
  SUBSCRIPTION: 'SUBSCRIPTION',
  CUSTOMER_ORDER: 'CUSTOMER_ORDER',
  PROVIDER_SALE: 'PROVIDER_SALE',
  CANCEL_SUBSCRIPTION: 'CANCEL_SUBSCRIPTION',
  SIGN_UP_BONUS: 'SIGN_UP_BONUS',
  NEW_LISTING_BONUS: 'NEW_LISTING_BONUS',
  REVIEW_BONUS: 'REVIEW_BONUS',
  INVIO_SUNE: 'INVIO_SUNE',
  PROFILE_BONUS: 'PROFILE BONUS',
};

export const statuses = { PENDING: 'PENDING', COMPLETED: 'COMPLETED' };

export const evaluateLabel = (type, intl) => {
  switch (type) {
    case types.SIGN_UP_BONUS:
      return intl.formatMessage({ id: 'TransactionHistoryTable.signUpBonus' });
    case types.FIVE_STAR_REVIEWS_BONUS:
      return intl.formatMessage({ id: 'TransactionHistoryTable.fiveStarReviewsBonus' });
    case types.REFERRAL_BONUS:
      return intl.formatMessage({ id: 'TransactionHistoryTable.referralBonus' });
    case types.SUBSCRIPTION:
      return intl.formatMessage({ id: 'TransactionHistoryTable.subscription' });
    case types.CUSTOMER_ORDER:
      return intl.formatMessage({ id: 'TransactionHistoryTable.customerOrder' });
    case types.PROVIDER_SALE:
      return intl.formatMessage({ id: 'TransactionHistoryTable.providerSale' });
    case types.CANCEL_SUBSCRIPTION:
      return intl.formatMessage({ id: 'TransactionHistoryTable.cancelSubscription' });
    case types.NEW_LISTING_BONUS:
      return intl.formatMessage({ id: 'TransactionHistoryTable.newListingBonus' });
    case types.REVIEW_BONUS:
      return intl.formatMessage({ id: 'TransactionHistoryTable.reviewBonus' });
    case types.INVIO_SUNE:
      return intl.formatMessage({ id: 'TransactionHistoryTable.replaceBonus' });
    case types.PROFILE_BONUS:
      return intl.formatMessage({ id: 'TransactionHistoryTable.profileBonus' });
  }
};
