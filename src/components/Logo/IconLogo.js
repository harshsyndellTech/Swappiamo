import React from 'react';
import PropTypes from 'prop-types';
import suneLogo from './sune-logo.png';
import css from './Logo.module.css';
const IconLogo = props => {
  const { className, format, type, ...rest } = props;

  if (format === 'desktop') {
    return (
      <img className={className} style={{ height: '30px' }} src={suneLogo} alt="logo" {...rest} />
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        className={css.imageMobile}
        // style={window.innerWidth <= 490 ? { width: '80%' } : { width: '40%' }}
        src={suneLogo}
        alt="logo"
        {...rest}
      />
    </div>
  );
};

const { string } = PropTypes;

IconLogo.defaultProps = {
  className: null,
};

IconLogo.propTypes = {
  className: string,
};

export default IconLogo;
