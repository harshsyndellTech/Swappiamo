import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './FAQs.module.css';
import { ExternalLink } from '../../components';

const FAQs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <h3>Does Swappiamo provide insurance?</h3>
      <p>
        As majority of swaps happen within local communities, the members are in control of the
        exchange. We don’t provide insurance of the exchanges.
      </p>
      <p>
        Remember, if the item you swap doesn't bring you joy, or something didn’t work duirng your
        swap you can always send an email to{' '}
        <ExternalLink href="mailto:info@swappiamo.com">info@swappiamo.com</ExternalLink>
      </p>
      <p>We rely on our members and we want to build an healthy community</p>
      <p>That's the beauty of swapping!</p>
      <h3>In which countries do you operate?</h3>
      <p>
        We currently only operate in Italy. By 2023 we hope to expand into Netherlands and then in
        Belgium. Watch this space for updates.
      </p>
      <h3>Do you provide shipping labels?</h3>
      <p>
        At this time the majority of our swaps happen within local communities. As the number of
        items being shipped increases, we will review our shipping policy.
      </p>
      <h3>How will I receive notifications from swappiamo?</h3>
      <p>
        You will receive an email once you subscribe. Check your junk mail or promotions folder for
        the emails and save swap-studio as a safe contact to ensure our messages land in your inbox.
        You will receive and email notifications when someone requests an item from you. You will
        continue to be notified via email when someone replies to your request and all other stages
        of the transaction process.
      </p>
    </div>
  );
};

FAQs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

FAQs.propTypes = {
  rootClassName: string,
  className: string,
};

export default FAQs;
