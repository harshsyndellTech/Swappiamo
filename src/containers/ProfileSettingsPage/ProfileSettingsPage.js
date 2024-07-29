import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  FieldTextInput,
  Button,
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { getUserLists, searchUser, sendSuneUser, updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.module.css';
import BACKARROW from './img/back.svg';
import USERLISTIMG from './img/Default.png';
import SELECTEDUSER from './img/santhosh.jpg';
import SUNEPAYBUTTON from './img/thumbnail_SunePay_grigio.png';
import SELECTARROW from './img/rightArrow.svg';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.SuneTransferClick = this.SuneTransferClick.bind(this);
    this.state = {
      showInviteSune: false,
      showUserList: false,
      showPaymentuser: false,
      selectedUser: {},
      amount: 0,
      message: null,
      showSucess: false,
      showError: false,
      showInsuffcienttBalance: false

    };
  }
  componentDidMount() {
    this.props.handleGetUserList();
  }
  SuneTransferClick() {
    this.setState({
      showInviteSune: true,
      showUserList: true
    });
  }

  render() {
    var {
      currentUser,
      currentUserListing,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
      filterdUser,
      handleSearchUser,
      handleSubmitSendSune,
      senSuneSuccess,
      imagePristine
    } = this.props;
    filterdUser = filterdUser?.filter(x => x?.id?.uuid != this.props?.currentUser?.id?.uuid)
    var Balance = this?.props?.currentUser?.attributes?.profile?.metadata?.sune;
    const onSearchUser = (e) => {
      var searchInput = e.currentTarget.value
      this.props.handleSearchUser(searchInput)
    }
    const onChangeAmount = (e) => {
      var existingbalance = this?.props?.currentUser?.attributes?.profile?.metadata?.sune;
      if (e.currentTarget.value == 0) {
        this.setState({
          showError: true,
          amount: null
        });
      }
      else {
        this.setState({
          amount: e.currentTarget.value
        });
        this.setState({
          showError: false
        });
      }
      if (existingbalance < e.currentTarget.value) {
        this.setState({
          showshowInsuffcienttBalanceError: true
        });
      }
      else {
        this.setState({
          showshowInsuffcienttBalanceError: false
        });
      }

    }
    const onChangemessage = (e) => {
      this.setState({
        message: e.currentTarget.value
      });
    }
    const handleSendSune = () => {
      var data = {
        amount: this.state.amount,
        message: this.state.message,
        userId: this.state.selectedUser.id.uuid,
        userName: this.state.selectedUser.attributes.profile.firstName + ' ' + this.state.selectedUser.attributes.profile.lastName,
        currentuserId: this.props.currentUser.id.uuid,
        currentUserName: this.props.currentUser.attributes.profile.firstName + ' ' + this.props.currentUser.attributes.profile.lastName,
        senderOldSune: this.props.currentUser.attributes?.profile?.metadata?.sune,
        reciverOldSune: this.state.selectedUser.attributes?.profile?.metadata?.sune,
        userEmail:this.state.selectedUser?.attributes?.email,
      }
      this.props.handleSubmitSendSune(data).then(res => {
        this.setState({
          showUserList: false,
          showPaymentuser: false,
          showSucess: true
        });
      })
    }
    const onselectUser = (user) => {
      this.setState({
        selectedUser: user,
        showUserList: false,
        showPaymentuser: true
      });
    }
    const onBackarrowList = () => {
      this.setState({
        showUserList: false,
        showPaymentuser: false,
        showInviteSune: false,

      });
    }
    const onPaymentBackArrow = () => {
      this.setState({
        showUserList: true,
        showPaymentuser: false,
      });
    }
    const onPaymentSuccessBackaarow = () => {
      senSuneSuccess = false;
      this.setState({
        showPaymentuser: false,
        showUserList: true,
        showSucess: false
      });
    }
    const homeClick = () => {
      this.setState({
        showUserList: false,
        showPaymentuser: false,
        showInviteSune: false
      });
    }
    const handleSubmit = values => {
      const { firstName, lastName, bio: rawBio,location } = values;

      // Ensure that the optional bio is a string
      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio,
        publicData:{
          address: location.search ||location?.selectedPlace?.address,
        }
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;

      onUpdateProfile(updatedValues);
    };

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio } = user.attributes.profile;
    const search=user?.attributes?.profile?.publicData?.address;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };
    const profileSettingsForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{ firstName, lastName, bio,location:{search}, profileImage: user.profileImage }}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
        imagePristine={imagePristine}
      />
    ) : null;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    const suneLeft = user?.attributes?.profile?.metadata?.sune ?? 0;
    const userItem = user => {

      var profileImage = Object.keys(user.profileImage).length != 0 ? user?.profileImage?.image?.attributes.variants['square-small'].url : USERLISTIMG
      // Render InboxItem only if the latest transition of the transaction is handled in the `txState` function.
      return (<div>

        <div className={css.selectUserBlock}>
          <div>
            <img src={profileImage} width={50} className={css.userImage} />
          </div>
          <span
            className={css.payListName}
            name="ProfilePage"
            params={{ id: user.id.uuid }}
            onClick={() => { onselectUser(user) }}
          >

            {user?.attributes?.profile?.firstName + ' ' + user?.attributes?.profile?.lastName}
          </span>
          <Button className={css.userListSelectButton} onClick={() => { onselectUser(user) }}>
            <img src={SELECTARROW} width={32} />
          </Button>
        </div>
      </div >)
    };


    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled} >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" listing={currentUserListing} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>

            <div className={css.content}>
              {/* {user.id ? (
                <p className={css.suneLeftContainer}>Balance:&nbsp;{suneLeft} Sune</p>
              ) : null} */}
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>





                <div className={css.topContainer}>
                  <div className={css.userProfileSection}>
                    {user.id ? (
                      <NamedLink
                        className={css.profileLink}
                        name="ProfilePage"
                        params={{ id: user.id.uuid }}
                      >
                        <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                      </NamedLink>
                    ) : null}
                    <div>

                    </div>
                  </div>
                  <button onClick={() => this.SuneTransferClick()} className={css.inviaButton}>
                    <img src={SUNEPAYBUTTON} width={124} />
                  </button>

                  {/* {user.id ? (
                    <span className={css.suneLeft}>Balance:&nbsp;{suneLeft} Sune</span>
                  ) : null} */}
                </div>
              </div>
              {this.state.showInviteSune ?
                <div className={css.inviaSuneBlock} >

                  {/*{user search and List ListBLock}*/}

                  {this.state.showUserList ? <div className={css.userListBlock} >
                    <div className={css.inviaHeader}>
                      <div>
                        <img src={BACKARROW} width={25} className={css.baclArrow} onClick={onBackarrowList} />
                      </div>
                      <div>
                        <h2><FormattedMessage id="ProfileSettingsPage.inviteSune" /></h2>
                      </div>
                      <div>

                      </div>
                    </div>
                    <div className={css.search}>
                      <input type='text' placeholder='Search' className={css.searchInput} onChange={onSearchUser} />
                    </div>
                    <div className={css.userListHeading}><FormattedMessage id="ProfileSettingsPage.suneContacts" /></div>
                    <div className={css.listItemScroll}>
                      {
                        filterdUser.map(userItem)
                      }
                    </div>

                  </div> : null}

                  {/*{userSelect ListBLock}*/}
                  {this.state.showPaymentuser ? <div className={css.userSelectBlock}>
                    <div className={css.inviaHeader}>
                      <div>
                        <img src={BACKARROW} width={25} className={css.baclArrow} onClick={onPaymentBackArrow} />
                      </div>
                      <div>
                        <h2><FormattedMessage id="ProfileSettingsPage.inviteSune" /></h2>
                      </div>
                      <div>

                      </div>
                    </div>
                    <div className={css.selectedUserImage}>
                      {this.state?.selectedUser ? <img src={Object.keys(this.state?.selectedUser?.profileImage).length != 0 ? this.state.selectedUser?.profileImage?.image?.attributes.variants['square-small'].url : USERLISTIMG} width={150} className={css.selecteUser} />
                        : null}
                        <b>{this.state.selectedUser?.attributes?.profile?.firstName+ " " +this.state.selectedUser?.attributes?.profile?.lastName}</b>
                      <div>
                        <input type='number' placeholder={intl.formatMessage({ id: 'ProfileSettingsPage.amountPlaceHolder' })}


                          min={1} className={css.userAmountEnter} onChange={onChangeAmount} />
                        {this.state.showError ? <p className={css.showError}><FormattedMessage id="ProfileSettingsPage.amountzero" /></p> : null}
                        {Balance == 0 || Balance == null ? <p className={css.showError}> <FormattedMessage id="ProfileSettingsPage.sunezero" /></p> : null}
                        {this.state.showshowInsuffcienttBalanceError ? <p className={css.showError}><FormattedMessage id="ProfileSettingsPage.insuffientBalance" /></p> : null}
                      </div>

                      <div>
                        <textarea rows={1} placeholder={intl.formatMessage({ id: 'ProfileSettingsPage.messagePlaceHolder' })} className={css.messageEnter} onChange={onChangemessage} />
                      </div>
                      <div className={css.sendButtonBlock}>
                        <Button disabled={this.state.showError || this.state.showshowInsuffcienttBalanceError || !this.state.amount} className={css.sendButton} onClick={handleSendSune} ><FormattedMessage id="ProfileSettingsPage.sendButton" /></Button>
                      </div>


                    </div>
                  </div> : null}


                  {/*{success Message Block}*/}
                  {this.state.showSucess ? <div className={css.succesMessageBlock} >
                    <div className={css.inviaHeader}>
                      <div>
                        <img src={BACKARROW} width={25} className={css.baclArrow} onClick={onPaymentSuccessBackaarow} />
                      </div>
                      <div>
                        <h2><FormattedMessage id="ProfileSettingsPage.inviteSune" /></h2>
                      </div>
                      <div>

                      </div>
                    </div>
                    <div>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <svg className={css.star} height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z" >
                        </path></svg>
                      <div className={css.selectedUserImage}>
                        <img src={Object.keys(this.state.selectedUser.profileImage).length != 0 ? this.state.selectedUser?.profileImage?.image?.attributes.variants['square-small'].url : USERLISTIMG} width={150} className={css.selecteUser} />

                        <b>{this.state.selectedUser?.attributes?.profile?.firstName}</b>
                        <div className={css.successAmount}>
                          <FormattedMessage id="ProfileSettingsPage.successMessage" />
                          <p className={css.moneyClass}>{this.state.amount} Sune</p>
                        </div>
                        <NamedLink
                          className={css.listName}
                          name="SuneBalancePage"
                        >
                          <div className={css.buttonHOme}>
                            <Button className={css.sendButton}  >
                              <FormattedMessage id="ProfileSettingsPage.homeButtonText" /></Button>
                          </div>
                        </NamedLink>

                      </div>
                    </div>


                  </div> : null}


                </div> : null}

              {profileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  currentUserListing: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  currentUserListing: propTypes.ownListing,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser, currentUserListing } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
    filterdUser,
    senSuneSuccess,
    imagePristine,

  } = state.ProfileSettingsPage;
  return {
    currentUser,
    currentUserListing,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
    filterdUser,
    senSuneSuccess,
    
    imagePristine
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  handleGetUserList: () => dispatch(getUserLists()),
  handleSearchUser: (searchInput) => dispatch(searchUser(searchInput)),
  handleSubmitSendSune: (data) => dispatch(sendSuneUser(data))


});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;
