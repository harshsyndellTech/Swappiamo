import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
// 
import {
  FieldPhoneNumberInput,
  Form,
  PrimaryButton,
  FieldTextInput,
  FieldPhoneInput,
} from '../../components';

import css from './DeleteAccountForm.module.css';
import { deleteAccountError } from '../../ducks/user.duck';

const SHOW_EMAIL_SENT_TIMEOUT = 2000;

class DeleteAccountFormComponent extends Component {
  constructor(props) {
    super(props);
    // this.state={error:deleteAccountError?.status}
   
    this.submittedValues = {};
  }

  componentWillUnmount() {
    window.clearTimeout(this.emailSentTimeoutId);
    // console.log("ist time")
    // deleteAccountError.status=null;

  }
 

 
 
  render() {
    // console.log("dele",deleteAccountError.status)
  

   
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            rootClassName,
            className,
            deleteAccountError,
            // saveEmailError,
            // savePhoneNumberError,
            // currentUser,
            // formId,
            handleSubmit,
            onChange,
            inProgress,
            intl,
            invalid,
            // sendVerificationEmailError,
            // sendVerificationEmailInProgress,
            // resetPasswordInProgress,
            values,
          } = fieldRenderProps;
          

          // this.setState({error:deleteAccountError?.status})
          // console.log(handleSubmit)
  // console.log("delete account error values are",deleteAccountError?.status)

          const passwordPlaceholder = intl.formatMessage({
            id: 'DeleteAccountForm.passwordPlaceholder',
          });  
           const currentPasswordLabel = intl.formatMessage({
            id: 'DeleteAccountForm.passwordLabel',
          });

          //password
      //     const passwordLabel = intl.formatMessage({
      //   id: 'SignupForm.passwordLabel',
      // });
      // const passwordPlaceholder = intl.formatMessage({
      //   id: 'SignupForm.passwordPlaceholder',
      // });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'SignupForm.passwordRequired',
      });
      const passwordMinLengthMessage = intl.formatMessage(
        {
          id: 'SignupForm.passwordTooShort',
        },
        {
          minLength: validators.PASSWORD_MIN_LENGTH,
        }
      );
      const passwordMaxLengthMessage = intl.formatMessage(
        {
          id: 'SignupForm.passwordTooLong',
        },
        {
          maxLength: validators.PASSWORD_MAX_LENGTH,
        }
      );
      const passwordMinLength = validators.minLength(
        passwordMinLengthMessage,
        validators.PASSWORD_MIN_LENGTH
      );
      const passwordMaxLength = validators.maxLength(
        passwordMaxLengthMessage,
        validators.PASSWORD_MAX_LENGTH
      );
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
      const passwordValidators = validators.composeValidators(
        passwordRequired,
        passwordMinLength,
        passwordMaxLength
      );

      const classes = classNames(rootClassName || css.root, className);
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid ||
            // pristineSinceLastSubmit ||
            inProgress ;
            // !(emailChanged || phoneNumberChanged);



          return (
            <Form
              className={classes}
              onSubmit={e => {
                handleSubmit(e);
              }}
              onChange={()=>{onChange()}}
            >
           

          
             <FieldTextInput
                  className={css.password}
                  type="password"
                  name="Password"
                  id="password"
                  label={currentPasswordLabel}
                  placeholder={passwordPlaceholder}
              validate={passwordValidators}

                  // validate={validators.required("password is required")}
                />
                   {deleteAccountError?.status==403?<p className={css.error}>
              <FormattedMessage id="ErrorMessage"/> 
            </p>:null}
               

                 <PrimaryButton
                  type="submit"
                  inProgress={inProgress}
                  ready={pristineSinceLastSubmit}
                  disabled={submitDisabled}
                >
                  <FormattedMessage id="DeleteAccount" />
                </PrimaryButton>
             
            </Form>
          );
        }}
      />
    );
  }
}

DeleteAccountFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  // formId: null,
  // saveEmailError: null,
  // savePhoneNumberError: null,
  inProgress: false,
  // sendVerificationEmailError: null,
  // sendVerificationEmailInProgress: false,
  // email: null,
  // phoneNumber: null,
  // resetPasswordInProgress: false,
  resetPasswordError: null,
};

const { bool, func, string } = PropTypes;

DeleteAccountFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  formId: string,
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  inProgress: bool,
  intl: intlShape.isRequired,
  // onResendVerificationEmail: func.isRequired,
  // ready: bool.isRequired,
  // sendVerificationEmailError: propTypes.error,
  // sendVerificationEmailInProgress: bool,
  // resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,
};

const DeleteAccountForm = compose(injectIntl)(DeleteAccountFormComponent);

DeleteAccountForm.displayName = 'DeleteAccountForm';

export default DeleteAccountForm;
