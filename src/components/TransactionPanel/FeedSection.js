import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ActivityFeed } from '../../components';

import css from './TransactionPanel.module.css';

// Functional component as a helper to build ActivityFeed section
const FeedSection = props => {
  const {
    className,
    rootClassName,
    currentTransaction,
    currentUser,
    fetchMessagesError,
    fetchMessagesInProgress,
    initialMessageFailed,
    messages,
    oldestMessagePageFetched,
    onShowMoreMessages,
    onOpenReviewModal,
    totalMessagePages,
    isProduct,
  } = props;

  const txTransitions = currentTransaction.attributes.transitions
    ? currentTransaction.attributes.transitions
    : [];
  const address = currentTransaction?.attributes?.metadata?.address;

  const hasOlderMessages = totalMessagePages > oldestMessagePageFetched;

  const showFeed =
    messages.length > 0 || txTransitions.length > 0 || initialMessageFailed || fetchMessagesError;

  const classes = classNames(rootClassName || css.feedContainer, className);

  return showFeed ? (
    <div className={classes}>
      {address ? (
        <div>
          <h3 className={css.addressHeading}>
            <FormattedMessage id="TransactionPanel.addressHeading" />
          </h3>
          <p className={css.addressText}>{address?.address}</p>
          <p className={css.addressText}>{address?.postal}</p>
          <p className={css.addressText}>{address?.city}</p>
          <p className={css.addressText}>{address?.state}</p>
          <p className={css.addressText}>{address?.country}</p>
        </div>
      ) : null}
      <h3 className={css.feedHeading}>
        <FormattedMessage id="TransactionPanel.activityHeading" />
      </h3>
      {initialMessageFailed ? (
        <p className={css.messageError}>
          <FormattedMessage id="TransactionPanel.initialMessageFailed" />
        </p>
      ) : null}
      {fetchMessagesError ? (
        <p className={css.messageError}>
          <FormattedMessage id="TransactionPanel.messageLoadingFailed" />
        </p>
      ) : null}

      <ActivityFeed
        className={css.feed}
        messages={messages}
        transaction={currentTransaction}
        currentUser={currentUser}
        hasOlderMessages={hasOlderMessages && !fetchMessagesInProgress}
        onOpenReviewModal={onOpenReviewModal}
        onShowOlderMessages={onShowMoreMessages}
        fetchMessagesInProgress={fetchMessagesInProgress}
        isProduct={isProduct}
      />
    </div>
  ) : null;
};

export default FeedSection;
