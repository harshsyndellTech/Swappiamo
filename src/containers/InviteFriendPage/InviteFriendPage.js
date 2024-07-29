import React from 'react';
import { injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { compose } from 'redux';
import {
  Footer,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  Page,
  UserNav,
} from '../../components';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { showToast } from '../../util/toast';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import InviteForm from './InviteForm';
import { inviteFriend } from './InviteFriendPage.duck';
import css from './InviteFriendPage.module.css';

function InviteFriendPage(props) {
  const { scrollingDisabled, onInviteSubmit, inviteInProgress, intl, currentUser } = props;
  const currentUserId = currentUser?.id?.uuid;

  const inviteLink = `${process.env.REACT_APP_CANONICAL_ROOT_URL}/join/${currentUserId}`;

  const onSubmit = (values, form) => {
    onInviteSubmit(values)
      .then(() => {
        const successMessage = intl.formatMessage({ id: 'InviteFriendPage.inviteSuccess' });
        showToast(successMessage, 'success');
        form.restart({
          email: null,
          invite_link: inviteLink,
        });
      })
      .catch(message => showToast(message, 'error'));
  };

  const subheading = intl.formatMessage({
    id: 'InviteFriendPage.subheading',
  });
  const title = intl.formatMessage({ id: 'InviteFriendPage.title' });
  const heading = intl.formatMessage({ id: 'InviteFriendPage.heading' });

  return (
    <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="InviteFriendPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.content}>
            <div className={css.inviteFormContainer}>
              <h1 className={css.heading}>{heading}</h1>
              <p className={css.subheading}>{subheading}</p>
            </div>

            <div className={css.inviteFormContainer}>
              <InviteForm
                onSubmit={onSubmit}
                initialValues={{
                  email: '',
                  invite_link: inviteLink,
                }}
                inviteInProgress={inviteInProgress}
              />
            </div>
            <ToastContainer />
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
  const { currentUser } = state.user;
  const { inviteInProgress, inviteError } = state.InviteFriendPage;

  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
    inviteInProgress,
    inviteError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInviteSubmit: values => dispatch(inviteFriend(values)),
  };
};

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(InviteFriendPage);
