import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './ContactUs.module.css';
import { ExternalLink } from '../../components';

const ContactUs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        You can address any enquiry to{' '}
        <ExternalLink href="mailto:info@swappiamo.com">info@swappiamo.com</ExternalLink>
      </p>
    </div>
  );
};

ContactUs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

ContactUs.propTypes = {
  rootClassName: string,
  className: string,
};

export default ContactUs;
