import React, { useEffect, useState } from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import './common.css';
import axios from 'axios';
import { NamedRedirect } from '../../../components';
import { injectIntl } from '../../../util/reactIntl';
import moment from 'moment';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const SubscriptionPaymentForm = ({ currentUser, plan, intl, clientSecret }) => {
  const elements = useElements();
  const stripe = useStripe();

  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [success, setSuccess] = useState(null);
  const [cardError, setCardError] = useState(null);
  const [expirationError, setExpirationError] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const submitDisabled = !stripe || !name || !postal || submitting;
  const handleSubmit = async event => {
    event.preventDefault();
    if (submitDisabled) return;

    setSubmitting(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setSubmitting(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: currentUser.attributes.email,
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (payload.error) {
      setErrorMessage(payload.error.message);
      setSubmitting(false);
    } else {
      setErrorMessage(null);
      setSubmitting(false);
      setSuccess(true);
    }
  };
  const buttonLabelNormal = intl.formatMessage({
    id: 'SubscriptionForm.buttonLabelNormal',
  });

  const buttonLabelProcessing = intl.formatMessage({
    id: 'SubscriptionForm.buttonLabelProcessing',
  });

  const fullNameLabel = intl.formatMessage({
    id: 'SubscriptionForm.fullNameLabel',
  });
  const fullNamePlaceholder = intl.formatMessage({
    id: 'SubscriptionForm.fullNamePlaceholder',
  });

  const cardNumberLabel = intl.formatMessage({
    id: 'SubscriptionForm.cardNumberLabel',
  });

  const cardExpirationLabel = intl.formatMessage({
    id: 'SubscriptionForm.cardExpirationLabel',
  });
  const cvcLabel = intl.formatMessage({
    id: 'SubscriptionForm.cvcLabel',
  });
  const postalCodeLabel = intl.formatMessage({
    id: 'SubscriptionForm.postalCodeLabel',
  });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'SubscriptionForm.postalCodePlaceholder',
  });

  return success ? (
    <NamedRedirect
      name="SubscriptionSuccessPage"
      state={{
        paymentSuccess: true,
        userId: currentUser.id.uuid,
        subscriptionData: JSON.stringify(subscriptionData),
      }}
    />
  ) : (
    <form onSubmit={handleSubmit} className="paymentForm">
      <label htmlFor="name">{fullNameLabel}</label>
      <input
        id="name"
        required
        placeholder={fullNamePlaceholder}
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <label htmlFor="cardNumber">{cardNumberLabel}</label>
      <CardNumberElement
        id="cardNumber"
        options={ELEMENT_OPTIONS}
        className="spacer"
        onChange={e => setCardError(e?.error?.message)}
      />
      {cardError && <span className="stripeError">{cardError}</span>}
      <label htmlFor="expiry">{cardExpirationLabel}</label>
      <CardExpiryElement
        id="expiry"
        options={ELEMENT_OPTIONS}
        className="spacer"
        onChange={e => {
          setExpirationError(e?.error?.message);
        }}
      />
      {expirationError && <span className="stripeError">{expirationError}</span>}
      <label htmlFor="cvc">{cvcLabel}</label>
      <CardCvcElement id="cvc" options={ELEMENT_OPTIONS} />
      <label htmlFor="postal">{postalCodeLabel}</label>
      <input
        id="postal"
        required
        placeholder={postalCodePlaceholder}
        value={postal}
        onChange={e => {
          setPostal(e.target.value);
        }}
      />

      {errorMessage && (
        <span
          style={{
            color: 'red',
            maxWidth: '800px',
            width: '500px',
            display: 'inline-block',
            lineHeight: '125%',
          }}
        >
          {errorMessage}
        </span>
      )}
      <button type="submit" disabled={submitDisabled}>
        {submitting ? buttonLabelProcessing : buttonLabelNormal}
      </button>
    </form>
  );
};

export default injectIntl(SubscriptionPaymentForm);
