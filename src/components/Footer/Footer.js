import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { twitterPageURL } from '../../util/urlHelpers';
import config from '../../config';
import {
  IconSocialMediaFacebook,
  IconSocialMediaInstagram,
  IconSocialMediaTwitter,
  Logo,
  ExternalLink,
  NamedLink,
} from '../../components';

import css from './Footer.module.css';
import { SiTiktok } from 'react-icons/si';
import { BsYoutube } from 'react-icons/bs';
import { FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
const renderSocialMediaLinks = intl => {
  const {
    siteTelegramPage,
  } = config;

  // const renderSocialMediaLinks = intl => {
  //   const {
  //     siteFacebookPage,
  //     siteInstagramPage,
  //     siteTwitterHandle,
  //     siteTiktokPage,
  //     siteTelegramPage,
  //     siteYoutubePage,
  //     siteLinkedinPage,
  //   } = config;
  // const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // const goToFb = intl.formatMessage({ id: 'Footer.goToFacebook' });
  // const goToInsta = intl.formatMessage({ id: 'Footer.goToInstagram' });
  // const goToTwitter = intl.formatMessage({ id: 'Footer.goToTwitter' });

  // const fbLink = siteFacebookPage ? (
  //   <ExternalLink key="linkToFacebook" href={siteFacebookPage} className={css.icon} title={goToFb}>
  //     <IconSocialMediaFacebook className={css.realicon} />
  //     <span className={css.socialMediaLabels}>Facebook</span>
  //   </ExternalLink>
  // ) : null;
  // const linkedinLink = siteLinkedinPage ? (
  //   <ExternalLink
  //     key="linkToLinkedin"
  //     href={siteLinkedinPage}
  //     className={css.icon}
  //     title={'Linkedin'}
  //   >
  //     <FaLinkedin className={css.iconYoutube} />
  //     <span className={css.socialMediaLabels}>
  //       <FormattedMessage id="Footer.Footer.linkedInLabel" />
  //     </span>
  //   </ExternalLink>
  // ) : null;
  // const twitterLink = siteTwitterPage ? (
  //   <ExternalLink
  //     key="linkToTwitter"
  //     href={siteTwitterPage}
  //     className={css.icon}
  //     title={goToTwitter}
  //   >
  //     <IconSocialMediaTwitter />
  //     <span className={css.socialMediaLabels}>Twitter</span>
  //   </ExternalLink>
  // ) : null;
  // const tiktokLink = siteTiktokPage ? (
  //   <ExternalLink key="linkToTiktok" href={siteTiktokPage} className={css.icon} title={goToTwitter}>
  //     <SiTiktok className={css.iconYoutube} />
  //     <span className={css.socialMediaLabels}>Tiktok</span>
  //   </ExternalLink>
  // ) : null;
  const telegramLink = siteTelegramPage ? (
    <ExternalLink key="linkToTelegram" href={siteTelegramPage} className={css.icon}>
      <FaTelegramPlane className={css.iconYoutube} />
      <span className={css.socialMediaLabels}>Telegram</span>
    </ExternalLink>
  ) : null;
  // const youtubeLink = siteYoutubePage ? (
  //   <ExternalLink
  //     key="linkToYoutube"
  //     href={siteYoutubePage}
  //     className={css.icon}
  //     title={goToTwitter}
  //   >
  //     <BsYoutube className={css.iconYoutube} />
  //     <span className={css.socialMediaLabels}>Youtube</span>
  //   </ExternalLink>
  // ) : null;
  // const instragramLink = siteInstagramPage ? (
  //   <ExternalLink
  //     key="linkToInstagram"
  //     href={siteInstagramPage}
  //     className={css.icon}
  //     title={goToInsta}
  //   >
  //     <IconSocialMediaInstagram />
  //     <span className={css.socialMediaLabels}>Instagram</span>
  //   </ExternalLink>
  // ) : null;
  return [telegramLink].filter(v => v != null);
};

const Footer = props => {
  const { rootClassName, className, intl } = props;
  const socialMediaLinks = renderSocialMediaLinks(intl);
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.topBorderWrapper}>
        <div className={css.content}>
          {/* <div className={css.someLiksMobile}>{socialMediaLinks}</div> */}
          <div className={css.links}>
            <div className={css.organization} id="organization">
              <NamedLink name="LandingPage" className={css.logoLink}>
                <span className={css.logo}>
                  <Logo format="desktop" type="footer" />
                </span>
              </NamedLink>
              <div className={css.organizationInfo}>
                {/* <p className={css.organizationDescription}>
                  <FormattedMessage id="Footer.organizationDescription" />
                </p> */}
                <p className={css.organizationCopyright}>
                  <NamedLink name="LandingPage" className={css.copyrightLink}>
                    <FormattedMessage id="Footer.copyright" />
                  </NamedLink>
                </p>
              </div>
            </div>
            <div className={css.infoLinks}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="AboutUsPage" className={css.link}>
                    <FormattedMessage id="Footer.toAboutPage" />
                  </NamedLink>
                </li>

                <li className={css.listItem}>
                  <NamedLink name="OurMissionPage" className={css.link}>
                    <FormattedMessage id="Footer.ourMission" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="ContactUsPage" className={css.link}>
                    <FormattedMessage id="Footer.contact" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="FAQsPage" className={css.link}>
                    <FormattedMessage id="Footer.toFAQPage" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searches}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="HowSwappiamoWorksPage" className={css.link}>
                    <FormattedMessage id="Footer.howSwappiamoWorks" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="WhatAreSunePage" className={css.link}>
                    <FormattedMessage id="Footer.whatAreSune" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="HowToEarnSunePage" className={css.link}>
                    <FormattedMessage id="Footer.howToEarnSune" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="MembershipPage" className={css.link}>
                    <FormattedMessage id="Footer.membership" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="HowProductExchangeWorksPage" className={css.link}>
                    <FormattedMessage id="HowProductExchangeWorksPage.heading" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="HowDoesShippingWorkPage" className={css.link}>
                    <FormattedMessage id="HowDoesShippingWorkPage.heading" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="HowServiceExchangeWorksPage" className={css.link}>
                    <FormattedMessage id="HowServiceExchangeWorksPage.heading" />
                  </NamedLink>
                </li>
              </ul>
            </div>
            <div className={css.searchesExtra}>
              <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink name="PrivacyPolicyPage" className={css.link}>
                    <FormattedMessage id="Footer.privacyPolicy" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="TermsOfServicePage" className={css.link}>
                    <FormattedMessage id="Footer.termsOfUse" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink name="CMSPage" params={{ pageId: 'blog' }} className={css.link}>
                    <FormattedMessage id="Footer.Footer.blogLabel" />
                  </NamedLink>
                </li>
              </ul>
              {/* <ul className={css.list}>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Denver%2C%20Colorado%2C%20United%20States%20of%20America&bounds=39.94623402%2C-104.600299056%2C39.62371698%2C-105.193616003506',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchDenver" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Philadelphia%2C%20Pennsylvania%2C%20United%20States%20of%20America&bounds=40.1379937851305%2C-74.9557749984862%2C39.8557310196928%2C-75.2946589071447',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchPhiladelphia" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Boston%2C%20Massachusetts%2C%20United%20States%20of%20America&bounds=42.3974009328397%2C-70.9860500028801%2C42.3196059806256%2C-71.1255750165112',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchBoston" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=San%20Diego%2C%20California%2C%20United%20States%20of%20America&bounds=33.0722089336828%2C-116.853118984%2C32.534171982%2C-117.266223298428',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchSanDiego" />
                  </NamedLink>
                </li>
                <li className={css.listItem}>
                  <NamedLink
                    name="SearchPage"
                    to={{
                      search:
                        '?address=Boulder%2C%20Colorado%2C%20United%20States%20of%20America&bounds=40.1593785009969%2C-105.108872052936%2C39.9139839802231%2C-105.525489934809',
                    }}
                    className={css.link}
                  >
                    <FormattedMessage id="Footer.searchBoulder" />
                  </NamedLink>
                </li>
              </ul> */}
            </div>
            <div className={css.extraLinks}>
              <div style={{ color: '#3C4858' }}>
                <FormattedMessage id="Footer.socialLinkHeading" />
              </div>
              <div className={css.someLinks}>{socialMediaLinks}</div>
              {/* <div className={css.legalMatters}>
                <ul className={css.tosAndPrivacy}>
                  <li>
                    <NamedLink name="TermsOfServicePage" className={css.legalLink}>
                      <FormattedMessage id="Footer.termsOfUse" />
                    </NamedLink>
                  </li>
                  <li>
                    <NamedLink name="PrivacyPolicyPage" className={css.legalLink}>
                      <FormattedMessage id="Footer.privacyPolicy" />
                    </NamedLink>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className={css.someLiksMobile}>
            <FormattedMessage id="Footer.socialLinkHeading" />
            <div>{socialMediaLinks}</div>
          </div>
          <div className={css.copyrightAndTermsMobile}>
            <NamedLink name="LandingPage" className={css.organizationCopyrightMobile}>
              <FormattedMessage id="Footer.copyright" />
            </NamedLink>
            {/* <div className={css.tosAndPrivacyMobile}>
              <NamedLink name="PrivacyPolicyPage" className={css.privacy}>
                <FormattedMessage id="Footer.privacy" />
              </NamedLink>
              <NamedLink name="TermsOfServicePage" className={css.terms}>
                <FormattedMessage id="Footer.terms" />
              </NamedLink>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.defaultProps = {
  rootClassName: null,
  className: null,
};

Footer.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
