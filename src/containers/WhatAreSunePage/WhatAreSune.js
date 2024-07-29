import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './WhatAreSune.module.css';

const WhatAreSune = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>On swappiamo we don't buy and sell for money, but using a points system called Sune.</p>
      <p>Sune is not money. It’s just a means of exchange.</p>
      <p>
        Is Sune legal? yes. Sune, as a system of rights and duties, is legally supported by
        Swappiamo internal regulations approved by each marketplace members.
      </p>
      <p>
        The legal basis is the Italian Civil Code Art. 1552 that is regulating exchanges and
        barters.
      </p>
      <p>
        Can I Convert Sune in Euros? No. Sune, whose value is linked to the Euro (1SUNE = 1EUR),
        cannot be converted into official currency but can only be converted into products and
        services offered by members of the marketplace.
      </p>
      <p>
        The value that an item has in sune is the same value it has in Euro. So 1 Sune counts 1
        Euro. This one is just to make it easy on you to list your product or service. We do this to
        promote Sune as merely a means of fair exchange and not as a price for a good.
      </p>
      <p>
        Once you sign up, you accept to use Sune and you can then shop for free! When you request
        something, you will swap with the sune in your account. Similarly, when someone takes
        something from you, they will swap with you with their sune.
      </p>
      <p>You can always check your Sune balances and transactions in your Sune account.</p>
    </div>
  );
};

WhatAreSune.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

WhatAreSune.propTypes = {
  rootClassName: string,
  className: string,
};

export default WhatAreSune;
