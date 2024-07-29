import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const SignupModalInformation = () => {
  const intl = useIntl();
  const mailTo = `mailto:info@swappiamo.it`;
  return (
    <div>
      <h1>{intl.formatMessage({ id: 'Topbar.SignupModalInformation.heading' })}</h1>
      <p>
        {
          <FormattedMessage
            id="Topbar.SignupModalInformation.text"
            values={{
              link: <a href={mailTo}>info@swappiamo.it </a>,
            }}
          />
        }
      </p>
    </div>
  );
};

export default SignupModalInformation;
