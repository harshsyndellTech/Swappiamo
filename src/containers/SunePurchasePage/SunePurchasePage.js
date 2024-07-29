import React, { useEffect } from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  IconSpinner,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/suneFacebook-1200x630.jpg';
import twitterImage from '../../assets/suneTwitter-600x314.jpg';

import css from './SunePurchasePage.module.css';
import SunePlanCard from './SunePlanCard';
import { useDispatch, useSelector } from 'react-redux';
import { ensureCurrentUser } from '../../util/data';
import { fetchCurrentUser } from '../../ducks/user.duck';

export const SunePurchasePageComponent = props => {
  const { history, intl, location, scrollingDisabled } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  const { currentUser: user, currentUserLoading } = useSelector(state => state.user);
  const currentUser = ensureCurrentUser(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const loading = (
    <div>
      {' '}
      <IconSpinner /> <span>Loading...</span>{' '}
    </div>
  );

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
          <TopbarContainer currentPage="SunePurchasePage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          {currentUserLoading ? (
            loading
          ) : (
            <div className={css.container}>
              {config.custom.plans.map(p => (
                <SunePlanCard {...p} key={p.planId} currentUser={currentUser} />
              ))}
            </div>
          )}
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

SunePurchasePageComponent.defaultProps = {
  currentUserListing: null,
  currentUserListingFetched: false,
};

SunePurchasePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SunePurchasePage = compose(withRouter, injectIntl)(SunePurchasePageComponent);

export default SunePurchasePage;
