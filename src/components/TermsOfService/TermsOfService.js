import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.module.css';
import NamedLink from '../NamedLink/NamedLink';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <h3>1. How a swap works</h3>
      <p>
        Items can be swapped and services can be provided for the amount of sune as indicated on the
        website. If a member wants to obtain an item or a book a service for the amount of sune
        displayed, he can send a message through the website to the member. If the member accepts
        the swap, the transaction is completed. In case of goods members shall determine how the
        items shall be delivered. The receiving member shall pay the delivery costs to the providing
        member. When the seller has confirmed the swap through the website, i.e. sale of an item or
        service the sune will be swapped between the members.
      </p>
      <p>
        A swap is considered complete and when sune shall be transferred between the members
        involved.
      </p>

      <h3>2. Listing product and services on the website</h3>
      <p>
        As a member you can post items on the website in the categories selected by us. You can
        upload the items and services on the website, indicating your location, pricing in Sune and
        delivery method. You can indicate the amount of sune you want for sale and offer. You may
        always take an item off the website, unless you have already agreed to a swap in respect of
        that item
      </p>

      <h3>3. Parties to a swap</h3>
      <p>
        Only the members that exchange items for sune are parties to a swap. Members that have
        agreed to a swap, accept the exchange of sune and the exchange of the service as it will be
        provided and goods delivered.
      </p>
      <p>
        We have no role in a transaction and take no responsibility for the items and services that
        are exchanged. We do not deliver goods or a service ourselves, but provide a platform
        through which members can agree on a swap.
      </p>
      <p>
        Members of a swap will be reviewed by both parties involved. Swappiamo takes the option to
        remove a user from the platform without giving any refund back in case he has less than 3
        stars reviews or he received two or more complaints about his behaviour in a swap.
      </p>

      <h3>4. Membership of swappiamo</h3>
      <p>
        Swappiamo is a community and it is for members only. As a member you can invite other
        persons to become a member. You become a member by signing up through our website and
        subscribing our plans.
      </p>
      <p>You can deregister at any time and with deregistration you will lose your sune balance.</p>
      <p>
        We can suspend and/or terminate your membership at any time, if we take the view that you
        have acted in breach with our policies or desired code of conduct.
      </p>

      <h3>5. Sune and subscriptions</h3>
      <p>
        A swap is an exchange of an item for a number of sune. There is no money transferred between
        members in a swap. We are not an online reseller. Sune cannot and shall in no event be
        exchanged for money. At the moment you subscribe, you will be awarded a number of sune. This
        amount of Sune is clearly determined in the subscription plans. We can also award sune after
        tree successful sales of goods or service as explained on our website.
      </p>
      <p>
        The subscription is monthly or yearly and it will be automatically renewed unless you
        unsubscribe.
      </p>

      <h3>6. Quality of the items on the website</h3>
      <p>
        We wish to have a high of quality of items and services placed on our website. Items and
        services shall be in line with the guidelines and policies as set out on our website, which
        we may upload from time to time.
      </p>
      <p>
        We curate the items and services to be displaced, meaning that we can reject items and
        services that we consider not to comply with our policies and/or which we consider, at our
        sole discretion, not to be fit for our website.
      </p>
      <p>We can at all time take items and services off the website.</p>
      <p>
        Placing items and services on our website that would conflict with laws, rules or
        regulations, let alone illegal or prohibited items and services are of course prohibited.
      </p>

      <h3>7. No liability</h3>
      <p>
        We accept no liability for our service, for items and services displayed or swapped through
        our website, for the delivery of these items, for loss or theft of items in the delivery
        process and/or for any deficiency, malfunction or damage caused by items swapped.
      </p>
      <p>However you can always contact us to info@swappiamo.com</p>

      <h3>8. Costs of subscriptions</h3>
      <p>
        Subscriptions to Swappiamo are monthly or yearly as explained on the website. These fees are
        clearly indicated in the website, and you are notified before being charged.
      </p>

      <h3>9. Privacy statement</h3>
      <p>
        Refer to our <NamedLink name="PrivacyPolicyPage">Privacy Policy</NamedLink>.
      </p>

      <h3>10. Force Major</h3>
      <p>
        We will not be liable to the members for any delay or non-performance of the platform due to
        any cause or causes beyond our reasonable control including, without limitation, any of the
        following: acts of God, governmental acts, war, fire, flood, explosion and commotion, lack
        of electricity, bombs ecc. We shall use all reasonable endeavors to minimize the effect of
        any such delays.
      </p>

      <h3>11. Termination</h3>
      <p>
        In case on insolvency we can cease to have the marketplace Swappiamo in place. Upon
        termination for any reason other than the insolvency, we will cease to conduct business in
        the ordinary course and our obligations hereunder are not assumed by a third party.
      </p>

      <h3>12. Applicability of terms</h3>
      <p>
        These terms apply to our relationship and the use of our website. By registering to our
        website, you accept the applicability of these terms. These terms may be adjusted by us at
        all times. Adjusted terms shall apply after one month from the date on which we placed the
        new terms on our website.
      </p>
      <p>
        We can publish and amend guidelines and policies on our website regarding the use of our
        website, the sune and the items that may be placed on the website. These guidelines and
        policies apply to our website and shall be adhered to by our members when using our website.
        Cyprus law applies to these terms and the use of our website.
      </p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
