import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldSelect } from '../../components';
import CustomCertificateSelectFieldMaybe from './CustomCertificateSelectFieldMaybe';

import css from './EditListingDescriptionForm.module.css';
import { useSelector } from 'react-redux';
import config from '../../config';

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        certificateOptions,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        category,
      } = formRenderProps;
      console.log('category', category);

      const conditionLabel = intl.formatMessage({
        id: 'EditListingDescriptionForm.conditionLabel',
      });
      const conditionrequired = intl.formatMessage({
        id: 'EditListingDescriptionForm.requiredMessage',
      });

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const productTitle = <FormattedMessage id="EditListingDescriptionForm.productLabel" />;
      const productPlaceholder = intl.formatMessage({
        id: 'EditListingDescriptionForm.productPlaceholder',
      });
      const productDescTitle = intl.formatMessage({
        id: 'EditListingDescriptionForm.productDescriptionLabel',
      });
      const productDescPlaceholder = intl.formatMessage({
        id: 'EditListingDescriptionForm.productDescriptionPlaceholder',
      });
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={category === 'service' || category === 'vacanze' ? titleMessage : productTitle}
            placeholder={
              category === 'service' || category === 'vacanze'
                ? titlePlaceholderMessage
                : productPlaceholder
            }
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          {category === 'product' ? (
            <FieldSelect
              id="condition"
              name="condition"
              className={css.title}
              label={conditionLabel}
              validate={composeValidators(required(conditionrequired))}
            >
              <option disabled value="">
                {conditionLabel}
              </option>
              {config.custom.condition?.map(val => (
                <option value={val.value}>
                  {intl.formatMessage({
                    id: val.label,
                  })}
                </option>
              ))}
            </FieldSelect>
          ) : null}

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={
              category === 'service' || category === 'vacanze'
                ? descriptionMessage
                : productDescTitle
            }
            placeholder={
              category === 'service' || category === 'vacanze'
                ? descriptionPlaceholderMessage
                : productDescPlaceholder
            }
            validate={composeValidators(required(descriptionRequiredMessage))}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  certificateOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
