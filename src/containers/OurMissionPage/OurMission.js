import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './OurMission.module.css';

const OurMission = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        Our mission is to build a community of free and honest people who really want to support
        each other thru sharing goods and offer their own services. Without getting money back they
        can experience the freedom to share and build strong relationship with people inside the
        community. Not get paid gives the opportunity to get free of our egoism and start to feel
        the joy of sharing. It is a matter of change mentality.
      </p>
    </div>
  );
};

OurMission.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

OurMission.propTypes = {
  rootClassName: string,
  className: string,
};

export default OurMission;
