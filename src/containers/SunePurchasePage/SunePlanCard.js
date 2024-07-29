import React, { useEffect, useMemo, useState } from 'react';
import css from './SunePurchasePage.module.css';
import planImage from '../../assets/plan.svg';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
import { IconSpinner, Modal, SecondaryButton } from '../../components';
import { fetchCurrentUser } from '../../ducks/user.duck';
import { useDispatch } from 'react-redux';
import { injectIntl } from '../../util/reactIntl';
import moment from 'moment';

function SunePlanCard({ label, planId, description, id, currentUser, intl }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isAlreadyActive, setisAlreadyActive] = useState(false);

  const activePlans = currentUser?.attributes?.profile?.metadata?.activePlans ?? null;

  useEffect(() => {
    const value =
      activePlans &&
      activePlans[planId] &&
      moment(activePlans[planId]?.activationDate).isValid() &&
      moment().diff(activePlans[planId].activationDate, 'days') < 365;
    setisAlreadyActive(value);
  }, [currentUser]);
  const handleClick = () =>
    history.push({
      pathname: `/topup/${planId}`,
      state: {
        planId: planId,
      },
    });

  console.log({ isAlreadyActive, activePlans });
  const onCancelSubscription = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post('/cancel-subscription', {
        planId,
      });
      setOpen(false);
      dispatch(fetchCurrentUser());
    } catch (e) {
      const error = e?.response?.data?.message ?? e?.message;
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelModalHeading = intl.formatMessage({
    id: 'SubscriptionPage.cancelModalHeading',
  });
  const cancelModalBody = intl.formatMessage({
    id: 'SubscriptionPage.cancelModalBody',
  });
  const cancelModalProceedButton = intl.formatMessage({
    id: 'SubscriptionPage.cancelModalProceedButton',
  });
  const cancelSubscriptionButton = intl.formatMessage({
    id: 'SubscriptionPage.cancelSubscriptionButton',
  });

  const planLabel = intl.formatMessage({
    id: label,
  });

  const descriptionLabel = intl.formatMessage({
    id: description,
  });

  const subscribedLabel = intl.formatMessage({
    id: 'SubscriptionPage.subscribedLabel',
  });
  const subscribeLabel = intl.formatMessage({
    id: 'SubscriptionPage.subscribeLabel',
  });

  // const confirmationModal = (
  //   <Modal
  //     id="confirmation-modal"
  //     name="confirmation-modal"
  //     usePortal
  //     isOpen={open}
  //     onClose={() => setOpen(false)}
  //     onManageDisableScrolling={() => {}}
  //   >
  //     <div>
  //       <h1>{cancelModalHeading}</h1>
  //       <p className={css.text}>{cancelModalBody}</p>
  //       <SecondaryButton type="button" onClick={onCancelSubscription} inProgress={loading}>
  //         {cancelModalProceedButton}
  //       </SecondaryButton>
  //     </div>
  //   </Modal>
  // );

  return (
    <div className={css.cardContainer}>
      <header>{planLabel}</header>
      <figure>
        <img src={planImage} alt={planLabel} className={css.figure} />
        <figcaption>{descriptionLabel}</figcaption>
      </figure>
      <div className={css.flex}>
        <button
          type="button"
          className={css.button}
          disabled={isAlreadyActive}
          onClick={handleClick}
        >
          {isAlreadyActive ? subscribedLabel : subscribeLabel}
        </button>
        {/* {isAlreadyActive && (
          <button
            type="button"
            className={classNames(css.button, css.cancelButton)}
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            {cancelSubscriptionButton}
          </button>
        )} */}
        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </div>
      {/* {confirmationModal} */}
    </div>
  );
}

export default injectIntl(SunePlanCard);
