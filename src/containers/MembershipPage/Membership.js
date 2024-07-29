import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Membership.module.css';

const Membership = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        You can easily get more Sune subscribing a membership. There are two plans a monthly plan of
        1.99Eur that gives you 20 Sune per month and Yearly plan of 11.99Eur that gives you 200 Sune
        per year.
      </p>
      <p>
        200 is the maximum sune anyone can receive when subscribe the membership. We do this because
        we realise that the community needs a start to grow.
      </p>

      <p>To keep things fair and our community thriving, we have set a few boundaries:</p>
      <p>You can choose either the monthly or the yearly plan not both;</p>
      <p>You need to wait for you membership subscription deadline to renew it;</p>
      <p>As long as your subscription is active you will continue to earn Sune.</p>
    </div>
  );
};

Membership.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Membership.propTypes = {
  rootClassName: string,
  className: string,
};

export default Membership;
