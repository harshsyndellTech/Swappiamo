import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { propTypes } from '../../util/types';
import config from '../../config';
import YouTube from 'react-youtube';
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  SearchBar,
  NamedLink,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/suneFacebook-1200x630.jpg';
import twitterImage from '../../assets/suneTwitter-600x314.jpg';
import css from './LandingPage.module.css';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import SectionListings from './SectionListings';

export const LandingPageComponent = props => {
  const {
    history,
    intl,
    location,
    scrollingDisabled,
    currentUserListing,
    currentUserListingFetched,
    searchInProgress,
    searchListingsError,
    pagination,
    listings,
  } = props;
  console.log('listings', listings?.length);
  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.heroContainer}>
            <SectionHero className={css.hero} history={history} location={location} />
          </div>

          <ul className={css.sections}>
            {/* <li className={`${css.section} ${css.gradientColor}`}>
              <div className={css.sectionContent}>
                <SectionHowItWorks
                  currentUserListing={currentUserListing}
                  currentUserListingFetched={currentUserListingFetched}
                />
              </div>
            </li> */}
            {/* <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <SectionLocations />
              </div>
            </li> */}
            <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <h1 className={css.title}>
                  <FormattedMessage id="LandingPage.LandingPage.videoHeadingLabel" />
                </h1>
                <YouTube videoId={'Re0FGf7dbHg'} opts={{ width: '100%' }} />
                <p>
                  <FormattedMessage id="LandingPage.LandingPage.subheading" />
                  <span>
                    <NamedLink name="FAQsPage">
                      <FormattedMessage id="LandingPage.LandingPage.clickHere" />
                    </NamedLink>
                  </span>
                </p>
              </div>
            </li>
            <li className={css.section}>
              <div className={css.sectionContentFirstChild}>
                <SectionListings
                  history={history}
                  listings={listings}
                  searchInProgress={searchInProgress}
                  searchListingsError={searchListingsError}
                  pagination={pagination}
                />
              </div>
            </li>
          </ul>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

LandingPageComponent.defaultProps = {
  currentUserListing: null,
  currentUserListingFetched: false,
};

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUserListing, currentUserListingFetched } = state.user;
  const {
    pagination,
    searchParams,
    searchInProgress,
    searchListingsError,
    currentPageResultIds,
  } = state.LandingPage;

  const pageListings = getListingsById(state, currentPageResultIds);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUserListing,
    currentUserListingFetched,
    listings: pageListings,
    searchInProgress,
    searchListingsError,
    pagination,
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(withRouter, connect(mapStateToProps), injectIntl)(LandingPageComponent);

export default LandingPage;
