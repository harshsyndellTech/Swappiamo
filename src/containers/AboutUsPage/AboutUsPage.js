import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '../../containers';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import config from '../../config';

import css from './AboutUsPage.module.css';
import AboutUs from './AboutUs';
import AboutUsIT from './AboutUsIT';
import useLocale from '../../hooks/useLocale';

const AboutUsPageComponent = props => {
  const { scrollingDisabled, intl } = props;

  const tabs = [
    {
      text: intl.formatMessage({ id: 'AboutUsPage.AboutUsTabTitle' }),
      selected: true,
      linkProps: {
        name: 'AboutUsPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'OurMissionPage.OurMissionTabTitle' }),
      selected: false,
      linkProps: {
        name: 'OurMissionPage',
      },
    },

    {
      text: intl.formatMessage({ id: 'ContactUsPage.ContactUsTabTitle' }),
      selected: false,
      linkProps: {
        name: 'ContactUsPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'FAQsPage.FAQsTabTitle' }),
      selected: false,
      linkProps: {
        name: 'FAQsPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HowSwappimoWorksPage.howSwappimoWorksTabTitle' }),
      selected: false,
      linkProps: {
        name: 'HowSwappiamoWorksPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'WhatAreSunePage.whatAreSuneTabTitle' }),
      selected: false,
      linkProps: {
        name: 'WhatAreSunePage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HowToEarnSunePage.howToEarnSuneTabTitle' }),
      selected: false,
      linkProps: {
        name: 'HowToEarnSunePage',
      },
    },
    {
      text: intl.formatMessage({ id: 'MembershipPage.MembershipTabTitle' }),
      selected: false,
      linkProps: {
        name: 'MembershipPage',
      },
    },

    {
      text: intl.formatMessage({ id: 'HowProductExchangeWorksPage.heading' }),
      selected: false,
      linkProps: {
        name: 'HowProductExchangeWorksPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HowDoesShippingWorkPage.heading' }),
      selected: false,
      linkProps: {
        name: 'HowDoesShippingWorkPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'HowServiceExchangeWorksPage.heading' }),
      selected: false,
      linkProps: {
        name: 'HowServiceExchangeWorksPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.tosTabTitle' }),
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'AboutUsPage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };

  const NewComponent = useLocale(AboutUsIT, AboutUs);

  if (NewComponent == null) {
    return null;
  }

  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="AboutUsPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav tabs={tabs} type="generic" />
        <LayoutWrapperMain>
          <div className={css.content}>
            <h1 className={css.heading}>
              <FormattedMessage id="AboutUsPage.heading" />
            </h1>
            {/* <AboutUs /> */}
            {NewComponent}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

const { bool } = PropTypes;

AboutUsPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const AboutUsPage = compose(
  connect(mapStateToProps),
  injectIntl
)(AboutUsPageComponent);

export default AboutUsPage;
