import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureCurrentUser, ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { getUserLists, searchUser, sendSuneUser, updateProfile, uploadImage } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import { BsTelephoneOutboundFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import BACKARROW from './img/back.svg';
import USERLISTIMG from './img/Default.png';
import SELECTEDUSER from './img/santhosh.jpg';
import SUNEPAYBUTTON from './img/thumbnail_SunePay_grigio.png';
import SELECTARROW from './img/rightArrow.svg';

import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  Reviews,
  ButtonTabNavHorizontal,
  ListingCard,
  Button,
} from '../../components';
import classNames from 'classnames';
import { TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';
import ReactStars from 'react-rating-stars-component';
import css from './ProfilePage.module.css';
import LoadingPage from '../LoadingPage/LoadingPage';
import { urlValidate } from '../../util/validators';

const MAX_MOBILE_SCREEN_WIDTH = 768;

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
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

    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);

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

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  render() {
    var {
      scrollingDisabled,
      currentUser,
      user,
      userShowError,
      queryListingsError,
      listings,
      reviews,
      queryReviewsError,
      viewport,
      intl,
      userLoading,
      filterdUser,
      handleSearchUser,
      handleSubmitSendSune,
      senSuneSuccess
    } = this.props;
    filterdUser = filterdUser?.filter(x => x?.id?.uuid != this.props?.currentUser?.id?.uuid)
    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUser(user);
    if (userLoading) {
      <LoadingPage />;
    }
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

            <p>{user?.attributes?.profile?.firstName + ' ' + user?.attributes?.profile?.lastName}</p>
          </span>

          <Button className={css.userListSelectButton} onClick={() => { onselectUser(user) }}>
            <img src={SELECTARROW} width={32} />
          </Button>
        </div>
      </div >)
    };

    const usersMetadata = profileUser?.attributes?.profile?.metadata;
    const { avgRating, rating, totalReviews } = usersMetadata ?? {};
    const userPublicData = profileUser?.attributes?.profile?.privateData;
    const email = profileUser?.attributes?.email || null;
    console.log('email', email);
    const { phoneNumber } = userPublicData || {};
    const ratings = {
      size: 18,
      value: avgRating ? avgRating : rating,
      edit: false,
      isHalf: true,
    };
    // console.log('usersMetadata', usersMetadata);
    var Balance = this?.props?.currentUser?.attributes?.profile?.metadata?.sune;
    const isCurrentUser =
      ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser?.attributes?.profile?.firstName ? (profileUser?.attributes?.profile?.firstName+' '+profileUser?.attributes?.profile?.lastName) : '';
    const bio = profileUser.attributes.profile.bio;
    const hasBio = !!bio;
    const hasListings = listings.length > 0;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

    const editLinkMobile = isCurrentUser ? (
      <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
      </NamedLink>
    ) : null;
    const editLinkDesktop = isCurrentUser ? (
      <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
      </NamedLink>
    ) : null;

    const asideContent = (
      <div className={css.asideContent}>
        <AvatarLarge className={css.avatar} user={user} disableProfileLink />

        <h1 className={css.mobileHeading}>
          {displayName ? (
            <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
          ) : null}
        </h1>
        <button onClick={() => this.SuneTransferClick()} className={css.inviaButton}>
          <img src={SUNEPAYBUTTON} width={124} />
        </button>

        {editLinkMobile}
        {editLinkDesktop}
        {/* <div className={css.showInDesktop}>
          {phoneNumber && currentUser ? (
            <a href={`tel:${phoneNumber}`} className={css.phoneNumber}>
              <BsTelephoneOutboundFill className={css.icons} /> <sapn>{phoneNumber}</sapn>
            </a>
          ) : null}
          <br />
          {email && currentUser ? (
            <a href={`mailto:${email}`} className={css.phoneNumber}>
              <MdEmail className={css.icons} /> <span>{email}</span>
            </a>
          ) : null}
        </div> */}
      </div>
    );
    const listingsContainerClasses = classNames(css.listingsContainer, {
      [css.withBioMissingAbove]: !hasBio,
    });

    const reviewsError = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
      </p>
    );

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    const mobileReviews = (
      <div className={css.mobileReviews}>
        {/* <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfProviderTitle"
            values={{ count: reviewsOfProvider.length }}
          />
        </h2> */}
        {queryReviewsError ? reviewsError : null}
        {/* <Reviews reviews={reviewsOfProvider} /> */}
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfCustomerTitle"
            values={{ count: reviews.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviews} />
      </div>
    );

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
      if (existingbalance < parseFloat(e.currentTarget.value)) {
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
      const { firstName, lastName, bio: rawBio } = values;

      // Ensure that the optional bio is a string
      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio,
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;

      onUpdateProfile(updatedValues);
    };
    const desktopReviewTabs = [
      // {
      //   text: (
      //     <h3 className={css.desktopReviewsTitle}>
      //       <FormattedMessage
      //         id="ProfilePage.reviewsOfProviderTitle"
      //         values={{ count: reviewsOfProvider.length }}
      //       />
      //     </h3>
      //   ),
      //   selected: this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER,
      //   onClick: this.showOfProviderReviews,
      // },
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfCustomerTitle"
            // values={{ count: reviewsOfCustomer.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
        onClick: this.showOfCustomerReviews,
      },
    ];

    const desktopReviews = (
      <div className={css.desktopReviews}>
        <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

        {queryReviewsError ? reviewsError : null}

        {this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
          <Reviews reviews={reviews} />
        ) : (
          <Reviews reviews={reviews} />
        )}
      </div>
    );

    const mainContent = (
      <div>
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

                <div>

                </div>
              </div>

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
                  <b>{this.state.selectedUser?.attributes?.profile?.firstName + " " + this.state.selectedUser?.attributes?.profile?.lastName}</b>
                  <div>
                    <input type='number' placeholder={intl.formatMessage({ id: 'ProfileSettingsPage.amountPlaceHolder' })} min={1} className={css.userAmountEnter} onChange={onChangeAmount} />
                    {this.state.showError ? <p className={css.showError}> <FormattedMessage id="ProfileSettingsPage.amountzero" /></p> : null}
                    {Balance == 0 || Balance == null ? <p className={css.showError}> <FormattedMessage id="ProfileSettingsPage.sunezero" /></p> : null}
                    {this.state.showshowInsuffcienttBalanceError ? <p className={css.showError}><FormattedMessage id="ProfileSettingsPage.insuffientBalance" /></p> : null}
                  </div>

                  <div>
                    <textarea rows={1} placeholder={intl.formatMessage({ id: 'ProfileSettingsPage.messagePlaceHolder' })} c className={css.messageEnter} onChange={onChangemessage} />
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
                        <Button className={css.sendButton}  >123
                          <FormattedMessage id="ProfileSettingsPage.homeButtonText" /></Button>
                      </div>
                    </NamedLink>
                  </div>
                </div>


              </div> : null}


            </div> : null
          }


        </div>
        <h1 className={css.desktopHeading}>
          <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
        </h1>

        {
          (avgRating || rating) && (
            <div className={css.reviewContainer}>
              <div className={css.rating}>
                <ReactStars {...ratings} />
              </div>

              <div className={css.totalreviews}>({totalReviews ? totalReviews : '0'})</div>
            </div>
          )
        }
        {/* <div className={css.showInMobile}>
          {phoneNumber && currentUser ? (
            <a href={`tel:${phoneNumber}`} className={css.phoneNumber}>
              <BsTelephoneOutboundFill className={css.icons} /> <span>{phoneNumber}</span>
            </a>
          ) : null}
          <br />
          {email && currentUser ? (
            <a href={`mailto:${email}`} className={css.phoneNumber}>
              <MdEmail className={css.icons} />
              <span> {email}</span>
            </a>
          ) : null}
        </div> */}

        {
          hasBio ? (
            <p className={css.bio} >
              {bio}
            </p>
          ) : null
        }
        {
          hasListings ? (
            <div className={listingsContainerClasses}>
              <h2 className={css.listingsTitle}>
                <FormattedMessage
                  id="ProfilePage.listingsTitle"
                  values={{ count: listings.length }}
                />
              </h2>
              <ul className={css.listings}>
                {listings.map(l => (
                  <li className={css.listing} key={l.id.uuid}>
                    <ListingCard listing={l} showAuthorInfo={false} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        }
        {isMobileLayout ? mobileReviews : desktopReviews}
      </div >
    );

    let content;

    if (userShowError && userShowError.status === 404) {
      return <NotFoundPage />;
    } else if (userShowError) {
      content = (
        <p className={css.error}>
          <FormattedMessage id="ProfilePage.loadingDataFailed" />
        </p>
      );
    } else {
      content = mainContent;
    }

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: displayName,
        siteTitle: config.siteTitle,
      }
    );

    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProfilePage',
          name: schemaTitle,
        }}
      >
        <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfilePage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav>
          <LayoutWrapperMain>{content}</LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSideNavigation>
      </Page>
    );
  }
}

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  reviews: [],
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    userId,
    userShowError,
    reviews,
    queryReviewsError,
    queryListingsError,
    userListingRefs,
    user,
    userLoading,
  } = state.ProfilePage;

  const {
    filterdUser,
    senSuneSuccess
  } = state.ProfileSettingsPage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const userData = currentUser ? user : userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user: userData,
    userShowError,
    reviews,
    queryReviewsError,
    queryListingsError,
    listings,
    userLoading,
    filterdUser,
    senSuneSuccess
  };
};

const mapDispatchToProps = dispatch => ({

  handleGetUserList: () => dispatch(getUserLists()),
  handleSearchUser: (searchInput) => dispatch(searchUser(searchInput)),
  handleSubmitSendSune: (data) => dispatch(sendSuneUser(data))


});
const ProfilePage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

export default ProfilePage;
