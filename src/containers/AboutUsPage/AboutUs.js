import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './AboutUs.module.css';

const AboutUs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        We are a company that aims to build a community of people that care about each other and
        puts its best effort to create a mutual beneficial marketplace. We offer a platform through
        which you, as a member, can swap your items or services for sune. With your sune you can
        obtain other members’ items or services. We trust our members and that our members wish to
        share items and services through the website and require our members to comply with these
        conditions and our policies as set out on the website. In doing so we facility each other to
        share their goods in very good conditions and provide services with the best performance
        they can. Everybody in the community is trying to do his best.
      </p>
    </div>
  );
};

AboutUs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

AboutUs.propTypes = {
  rootClassName: string,
  className: string,
};

export default AboutUs;
