import React, { useEffect } from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.module.css';
import { useDispatch } from 'react-redux';
import { clearPreviousListingData } from '../../containers/EditListingPage/EditListingPage.duck';

const EditListingDescriptionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    params,
    sectionCategoryLabel,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;
  const typeOfListing = publicData.category;
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && clearPreviousListingData) {
      dispatch(clearPreviousListingData());
    }
  }, []);

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingDescriptionPanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  const note = <FormattedMessage id="DescriptionForm.note" />;

  const category = publicData?.category ?? params.category;
  let subCategory = publicData?.subCategory ?? params.subcategory;
  if (category === 'event') {
    subCategory = 'event';
  }
  return (
    <div className={classes}>
      {/* {sectionCategoryLabel} */}
      <h1 className={css.title}>{panelTitle}</h1>
      {/* <h4 className={css.note}>{note}</h4> */}
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{ title, description, condition: publicData.condition }}
        saveActionMsg={submitButtonText}
        category={category}
        onSubmit={values => {
          const { title, condition, description, certificate } = values;
          const updateValues = {
            title: title.trim(),
            description,
            publicData: { category: category, subCategory: subCategory, condition: condition },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingDescriptionPanel;
