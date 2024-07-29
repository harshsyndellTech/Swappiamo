import React from 'react';
import { bool, oneOfType, object } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  LISTING_STATE_PENDING_APPROVAL,
  LISTING_STATE_CLOSED,
  LISTING_STATE_DRAFT,
  propTypes,
} from '../../util/types';
import { NamedLink } from '../../components';
import EditIcon from './EditIcon';
import { IoCloseCircleOutline } from 'react-icons/io5';
import css from './ListingPage.module.css';
import { useDispatch } from 'react-redux';
import { TiLockOpenOutline } from 'react-icons/ti';
import { closeListing, openListing } from './ListingPage.duck';
export const ActionBarMaybe = props => {
  const {
    isOwnListing,
    listing,
    editParams,
    closeListingLoading,
    openListingLoading,
    openingListingError,
    closingListingError,
  } = props;
  const state = listing.attributes.state;
  const hasError = openingListingError || closingListingError;

  const isPendingApproval = state === LISTING_STATE_PENDING_APPROVAL;
  const isClosed = state === LISTING_STATE_CLOSED;
  const isDraft = state === LISTING_STATE_DRAFT;
  const dispatch = useDispatch();
  const listingId = listing.id.uuid;
  if (isOwnListing) {
    let ownListingTextTranslationId = 'ListingPage.ownListing';

    if (isPendingApproval) {
      ownListingTextTranslationId = 'ListingPage.ownListingPendingApproval';
    } else if (isClosed) {
      ownListingTextTranslationId = 'ListingPage.ownClosedListing';
    } else if (isDraft) {
      ownListingTextTranslationId = 'ListingPage.ownListingDraft';
    }

    const message = isDraft ? 'ListingPage.finishListing' : 'ListingPage.editListing';

    const ownListingTextClasses = classNames(css.ownListingText, {
      [css.ownListingTextPendingApproval]: isPendingApproval,
    });

    return (
      <div className={css.actionBar}>
        {hasError ? (
          <p className={css.ownListingTextError}>
            <FormattedMessage id="ManageListingCard.actionFailed" />
          </p>
        ) : (
          <p className={ownListingTextClasses}>
            <FormattedMessage id={ownListingTextTranslationId} />
          </p>
        )}

        {isClosed ? (
          <div className={css.closeListingContainer}>
            <p
              className={css.editListingLink}
              onClick={() => {
                dispatch(openListing(listingId));
              }}
            >
              <TiLockOpenOutline className={css.editIcon} />
              {openListingLoading ? (
                <FormattedMessage id="ListingPage.ActionBarMaybe.openingListingLoading" />
              ) : (
                <FormattedMessage id="ListingPage.ActionBarMaybe.openListing" />
              )}
            </p>
            <NamedLink className={css.editListingLink} name="EditListingPage" params={editParams}>
              <EditIcon className={css.editIcon} />
              <FormattedMessage id={message} />
            </NamedLink>
          </div>
        ) : (
          <div className={css.closeListingContainer}>
            <p
              className={css.editListingLink}
              onClick={() => {
                dispatch(closeListing(listingId));
              }}
            >
              <IoCloseCircleOutline className={css.editIcon} />
              {closeListingLoading ? (
                <FormattedMessage id="ListingPage.ActionBarMaybe.closeListingLoading" />
              ) : (
                <FormattedMessage id="ListingPage.ActionBarMaybe.closeListing" />
              )}
            </p>
            <NamedLink className={css.editListingLink} name="EditListingPage" params={editParams}>
              <EditIcon className={css.editIcon} />
              <FormattedMessage id={message} />
            </NamedLink>
          </div>
        )}
      </div>
    );
  } else if (isClosed) {
    return (
      <div className={css.actionBar}>
        <p className={css.closedListingText}>
          <FormattedMessage id="ListingPage.closedListing" />
        </p>
      </div>
    );
  }
  return null;
};

ActionBarMaybe.propTypes = {
  isOwnListing: bool.isRequired,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]).isRequired,
  editParams: object.isRequired,
};

ActionBarMaybe.displayName = 'ActionBarMaybe';

export default ActionBarMaybe;
