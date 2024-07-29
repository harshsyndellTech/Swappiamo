import React, { useEffect } from 'react';
import { bool, func } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { deleteCurrentUser, removeError, sendVerificationEmail } from '../../ducks/user.duck';
import {
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  Page,
  UserNav,
} from '../../components';
// import { ContactDetailsForm } from '../../forms';
import DeleteAccountForm from './DeleteAccountForm';
import { TopbarContainer } from '../../containers';
import {useDispatch,useSelector} from 'react-redux'
import { isScrollingDisabled } from '../../ducks/UI.duck';
// import {
//   saveContactDetails,
//   saveContactDetailsClear,
//   resetPassword,
// } from './ContactDetailsPage.duck';
import css from './DeleteAccountPage.module.css';
import { useDeferredValue } from 'react';

export const DeleteAccountPageComponent = props => {
  const {
    // saveEmailError,
    // savePhoneNumberError,
    // saveContactDetailsInProgress,
    currentUser,
    currentUserListing,
    contactDetailsChanged,
    onChange,
    scrollingDisabled,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    // onResendVerificationEmail,
    onSubmitContactDetails,
    onResetPassword,
    resetPasswordInProgress,
    resetPasswordError,
    intl,
  } = props;
const dispatch =useDispatch()
const state = useSelector(state=>state.user)
// console.log("state is",state)

const { deleteAccountLoading,
  deleteAccountError}=state

  useEffect(()=>()=>dispatch(removeError()),[])

  // console.log("de;eteaccount messaage",deleteAccountError)
  const user = ensureCurrentUser(currentUser);
  // const currentEmail = user.attributes.email || '';
  // const protectedData = user.attributes.profile.protectedData || {};
  // const privateData = user.attributes.profile.privateData || {};
  // const currentPhoneNumber = privateData.phoneNumber || '';
  const deleteAccountForm = user.id ? (
    <DeleteAccountForm
      className={css.form}
    
    
   
      currentUser={currentUser}
  
      onResetPassword={onResetPassword}
      onSubmit={values => {
   
    const {Password} =values 
  dispatch(deleteCurrentUser(Password))

      }}
      onChange={(e)=>dispatch(removeError())}
      inProgress={deleteAccountLoading}
      ready={contactDetailsChanged}
      deleteAccountError={deleteAccountError}
      sendVerificationEmailInProgress={sendVerificationEmailInProgress}
      sendVerificationEmailError={sendVerificationEmailError}
      resetPasswordInProgress={resetPasswordInProgress}
      resetPasswordError={resetPasswordError}
    />
  ) : null;

  const title = intl.formatMessage({ id: 'ContactDetailsPage.title' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            currentPage="DeleteAccountPage"
            desktopClassName={css.desktopTopbar}
            mobileClassName={css.mobileTopbar}
          />
          <UserNav selectedPageName="DeleteAccountPage" listing={currentUserListing} />
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav currentTab="DeleteAccountPage" />
        <LayoutWrapperMain>

          <div>
            <h1>
  
              <FormattedMessage id="DeleteAccountPageHeading"/>
            </h1>
<p>
  <FormattedMessage id="DeleteAccountPageParagraph"/>
</p>
            <h3 className={css.subheading}>
            <FormattedMessage id="DeleteAccountPageSubHeading"/>
            </h3>
        <p>
      <FormattedMessage id="DeleteAccountPageParagraphSecond"/>
        </p>
        {deleteAccountForm}
        
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

DeleteAccountPageComponent.defaultProps = {
  saveEmailError: null,
  savePhoneNumberError: null,
  currentUser: null,
  sendVerificationEmailError: null,
  resetPasswordInProgress: false,
  resetPasswordError: null,
};

DeleteAccountPageComponent.propTypes = {
  saveEmailError: propTypes.error,
  savePhoneNumberError: propTypes.error,
  saveContactDetailsInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  contactDetailsChanged: bool.isRequired,
  onChange: func.isRequired,
  onSubmitContactDetails: func.isRequired,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  resetPasswordInProgress: bool,
  resetPasswordError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  // Topbar needs user info.
  const {
    currentUser,
    currentUserListing,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    contactDetailsChanged,
    resetPasswordInProgress,
    resetPasswordError,
  } = state.ContactDetailsPage;
  return {
    saveEmailError,
    savePhoneNumberError,
    saveContactDetailsInProgress,
    currentUser,
    currentUserListing,
    contactDetailsChanged,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    resetPasswordInProgress,
    resetPasswordError,
  };
};

const mapDispatchToProps = dispatch => ({

});

const DeleteAccountPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(DeleteAccountPageComponent);

export default DeleteAccountPage;
