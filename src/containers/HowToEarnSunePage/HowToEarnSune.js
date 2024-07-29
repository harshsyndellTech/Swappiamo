import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowToEarnSune.module.css';
import { NamedLink } from '../../components';

const HowToEarnSune = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        Sune cannot be exchanged for money but there are many ways you can earn sune when you join
        our community.
      </p>
      <p>We give to new members 10 Sune at the sign up, so you can start swapping right away.</p>
      <p>
        As we want our community to grow you can earn 10 Sune anytime you invite a friend that
        successfully sing up into Swappiamo.
      </p>
      <p>
        You can also earn Sune if you are a valuable good and services provider, so you will get 50
        Sune bonus when you get 5 times consequently 5 stars reviews. We want to prize our loyal and
        valuable members.
      </p>
      <p>
        If you want to get more Sune please go the{' '}
        <NamedLink name="SunePurchasePage">Membership page</NamedLink>.
      </p>
    </div>
  );
};

HowToEarnSune.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowToEarnSune.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowToEarnSune;
