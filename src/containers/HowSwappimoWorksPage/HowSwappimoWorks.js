import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowSwappimoWorks.module.css';
import { NamedLink } from '../../components';

const HowSwappimoWorks = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        Swappiamo is a platform that facilitates transactions between users. Do you have something
        you’re not using? Swap it. Is there any service you would like to offer? Swap it.
      </p>

      <p>
        Browse our listings and find something you like or you may need. Upload the things you
        no-longer need and swap them. Offer the things you can do and swap them with something you
        may need. Whether you are doing or just need a change, swappiamo can help.
      </p>

      <p>
        Once you sign in, you’ll be able to swap as much as you like using our community unit called
        Sune.
      </p>

      <h3>How a swap works</h3>
      <p>
        Items are listed by members at an amount of sune. When a buyer finds an item they like, they
        send a message through the website to the owner of the item. If the owner accepts the swap,
        the members agree delivery terms. When the swap is completed and the order status is updated
        to complete, the sune will be transferred between the members.
      </p>

      <h3>How does shipping work?</h3>
      <p>
        Swapping your goods is a great way to get to know your neighbours. 90% of the swaps
        completed are exchanged in person. For members who don’t live close by, shipping should be
        arranged by the member who is giving the item and paid by the person receiving the items.
      </p>

      <p>
        Read our <NamedLink name="TermsOfServicePage">Terms or Service</NamedLink> for more details.
      </p>
    </div>
  );
};

HowSwappimoWorks.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowSwappimoWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowSwappimoWorks;
