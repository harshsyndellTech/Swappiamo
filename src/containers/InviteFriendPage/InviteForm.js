import React, { useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { injectIntl } from '../../util/reactIntl';
import { Button, FieldTextInput, Form } from '../../components';
import { composeValidators, emailFormatValid, required } from '../../util/validators';
import css from './InviteFriendPage.module.css';

function InviteForm(props) {
  return (
    <FinalForm
      {...props}
      render={formRenderProps => {
        const { handleSubmit, errors, intl, inviteInProgress, values } = formRenderProps;
        const [copied, setcopied] = useState(false);
        const onCopy = () => {
          navigator.clipboard.writeText(values?.invite_link).then(res => {
            setcopied(true);
          });
        };
        const submitDisabled = Object.keys(errors).length > 0 || inviteInProgress;

        const emailRequiredMessage = intl.formatMessage({
          id: 'InviteForm.emailRequired',
        });

        const emailInvalidMessage = intl.formatMessage({
          id: 'InviteForm.emailInvalid',
        });

        const emailPlaceholder = intl.formatMessage({
          id: 'InviteForm.emailPlaceholder',
        });

        const emailLabel = intl.formatMessage({
          id: 'InviteForm.emailLabel',
        });

        const submitButtonLabel = intl.formatMessage({
          id: 'InviteForm.submitButtonLabel',
        });

        const inviteLinkPlaceholder = intl.formatMessage({
          id: 'InviteForm.inviteLinkPlaceholder',
        });

        const emailRequired = required(emailRequiredMessage);
        const emailValid = emailFormatValid(emailInvalidMessage);

        return (
          <Form onSubmit={handleSubmit}>
            <FieldTextInput
              label={inviteLinkPlaceholder}
              id="invite_link"
              name="invite_link"
              type="text"
              variant="copy"
              readOnly
            />
            <>
              <div className={css.submitButtonWrapper}>
                <Button type="button" onClick={onCopy}>
                  {copied
                    ? intl.formatMessage({ id: 'InviteFriendPage.InviteForm.copiedLabel' })
                    : intl.formatMessage({ id: 'InviteFriendPage.InviteForm.copyButtonLabel' })}
                </Button>
              </div>
            </>
            <h4 className="text-center m-2">OR</h4>
            <FieldTextInput
              type="email"
              name="email"
              label={emailLabel}
              id="email"
              placeholder={emailPlaceholder}
              validate={composeValidators(emailRequired, emailValid)}
            />
            <>
              <div className={css.submitButtonWrapper}>
                <Button type="submit" disabled={submitDisabled} inProgress={inviteInProgress}>
                  {submitButtonLabel}
                </Button>
              </div>
            </>
          </Form>
        );
      }}
    />
  );
}

export default injectIntl(InviteForm);
