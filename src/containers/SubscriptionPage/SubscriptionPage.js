import React, { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionPaymentForm from './SubscriptionPaymentForm/SubscriptionPaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import {
  Footer,
  IconSpinner,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  NamedRedirect,
  Page,
} from '../../components';
import { TopbarContainer } from '..';
import css from './SubscriptionPage.module.css';
import { connect, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { ensureCurrentUser } from '../../util/data';
import { createPaymentIntentFromAPI } from '../../util/api';
import moment from 'moment';

function SubscriptionPage(props) {
  const { user, isAuthenticated } = props;
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [planData, setPlanData] = useState(null);
  const currentUser = ensureCurrentUser(user);
  const { id: planId } = useParams();
  let isMounted = false;
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const data = await createPaymentIntentFromAPI({ plan: planId });
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPlanData({ amount: data.amount, currency: data.currency });
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    if (!isMounted) fetchData();

    isMounted = true;

    return () => {
      isMounted = false;
      setClientSecret(null);
      setPlanData(null);
    };
  }, []);

  const activePlans = currentUser?.attributes?.profile?.metadata?.activePlans ?? null;

  const isAlreadyActive = useMemo(() => {
    return (
      activePlans &&
      activePlans[planId] &&
      moment(activePlans[planId]?.activationDate).isValid() &&
      moment().diff(activePlans[planId].activationDate, 'days') < 365
    );
  }, [currentUser]);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const currentUserFetchLoading = useSelector(store => store.user.currentUserLoading);

  const shouldRedirectBack = !(isAuthenticated || currentUser?.id?.uuid || id);
  if (shouldRedirectBack) return <Redirect to="/" />;

  const topbar = <TopbarContainer />;

  if (currentUserFetchLoading || loading) {
    return (
      <Page title="Subscription Payment Page" contentType="website">
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.paymentFormContainer}>
              <div className={css.loadingContainer}>
                <IconSpinner className={css.loading} />
              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
  if (!clientSecret) {
    return (
      <Page title="Subscription Payment Page" contentType="website">
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.paymentFormContainer}>
              <div className={css.loadingContainer}>
                <h4>Something went wrong. Please try again later.</h4>
              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }

  if (isAlreadyActive) {
    return <NamedRedirect name="LandingPage" />;
  }
  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Page title="Subscription Payment Page" contentType="website">
      <LayoutSingleColumn className={css.pageRoot}>
        <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.paymentFormContainer}>
            <Elements stripe={stripePromise} options={options}>
              <SubscriptionPaymentForm
                currentUser={currentUser}
                clientSecret={clientSecret}
                plan={planId}
              />
            </Elements>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const { currentUser } = state.user;
  return {
    isAuthenticated,
    user: currentUser,
  };
};

export default connect(
  mapStateToProps,
  null
)(SubscriptionPage);
