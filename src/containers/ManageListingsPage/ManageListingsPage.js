import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  ManageListingCard,
  Page,
  PaginationLinks,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedRedirect,
} from '../../components';
import { TopbarContainer } from '../../containers';

import { closeListing, openListing, getOwnListingsById } from './ManageListingsPage.duck';
import css from './ManageListingsPage.module.css';
import StateTabs from './StateTabs';
import { useParams } from 'react-router-dom';
import { LoadingSkeleton } from '../LoadingPage/LoadingPage';

const validTabs = ['drafts', 'published-or-waiting-approval', 'closed'];

function ManageListingsPageComponent(props) {
  const [listingMenuOpen, setListingMenuOpen] = useState(null);
  const onToggleMenu = listing => {
    setListingMenuOpen(listing);
  };

  const { tab: activeTab = 'published-or-waiting-approval' } = useParams();

  const {
    closingListing,
    closingListingError,
    listings,
    onCloseListing,
    onOpenListing,
    openingListing,
    deletingListing,
    openingListingError,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled,
    intl,
  } = props;

  const hasPaginationInfo = !!pagination && pagination.totalItems != null;
  const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

  const loadingResults = (
    <h2>
      <FormattedMessage id="ManageListingsPage.loadingOwnListings" />
    </h2>
  );

  const queryError = (
    <h2 className={css.error}>
      <FormattedMessage id="ManageListingsPage.queryError" />
    </h2>
  );

  const noResults =
    listingsAreLoaded && pagination.totalItems === 0 ? (
      <h1 className={css.title}>
        <FormattedMessage id="ManageListingsPage.noResults" />
      </h1>
    ) : null;

  const heading =
    listingsAreLoaded && pagination.totalItems > 0 ? (
      <h1 className={css.title}>
        <FormattedMessage
          // id="ManageListingsPage.youHaveListings"
          id="ManageListingsPage.Listings"
          values={{ count: pagination.totalItems }}
        />
      </h1>
    ) : (
      noResults
    );

  const page = queryParams ? queryParams.page : 1;
  const paginationLinks =
    listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="ManageListingsPage"
        pageSearchParams={{ page }}
        pagination={pagination}
      />
    ) : null;

  // const listingMenuOpen = this.state.listingMenuOpen;
  const closingErrorListingId = !!closingListingError && closingListingError.listingId;
  const openingErrorListingId = !!openingListingError && openingListingError.listingId;

  const title = intl.formatMessage({ id: 'ManageListingsPage.title' });

  const panelWidth = 62.5;
  // Render hints for responsive image
  const renderSizes = [
    `(max-width: 767px) 100vw`,
    `(max-width: 1920px) ${panelWidth / 2}vw`,
    `${panelWidth / 3}vw`,
  ].join(', ');

  const tabs = [
    {
      text: intl.formatMessage({ id: 'ManageListingsPage.publishedOrPendingApprovalTabName' }),
      selected: activeTab == 'published-or-waiting-approval',

      linkProps: {
        name: 'ManageListingsPage',
        params: { tab: 'published-or-waiting-approval' },
      },
    },
    {
      text: intl.formatMessage({ id: 'ManageListingsPage.draftsTabName' }),
      selected: activeTab == 'drafts',
      linkProps: {
        name: 'ManageListingsPage',
        params: { tab: 'drafts' },
      },
    },

    {
      text: intl.formatMessage({ id: 'ManageListingsPage.closedTabName' }),
      selected: activeTab == 'closed',
      linkProps: {
        name: 'ManageListingsPage',
        params: { tab: 'closed' },
      },
    },
  ];

  if (!validTabs.includes(activeTab)) {
    return <NamedRedirect name="NotFoundPage" />;
  }

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer currentPage="ManageListingsPage" />
          <UserNav selectedPageName="ManageListingsPage" />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          {queryInProgress ? <LoadingSkeleton /> : null}

          <div className={css.listingPanel}>
            {queryInProgress ? null : <StateTabs tabs={tabs} />}
            {queryListingsError ? queryError : null}

            {heading}
            <div className={css.listingCards}>
              {listings.map(l => (
                <ManageListingCard
                  className={css.listingCard}
                  key={l.id.uuid}
                  listing={l}
                  activeTab={activeTab}
                  isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                  actionsInProgressListingId={openingListing || closingListing}
                  onToggleMenu={onToggleMenu}
                  onCloseListing={onCloseListing}
                  onOpenListing={onOpenListing}
                  hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
                  hasClosingError={closingErrorListingId.uuid === l.id.uuid}
                  renderSizes={renderSizes}
                />
              ))}
            </div>
            {paginationLinks}
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
}

ManageListingsPageComponent.defaultProps = {
  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

ManageListingsPageComponent.propTypes = {
  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
    deletingListing,
  } = state.ManageListingsPage;
  const listings = getOwnListingsById(state, currentPageResultIds);
  return {
    currentPageResultIds,
    listings,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
    deletingListing,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
});

const ManageListingsPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ManageListingsPageComponent);

export default ManageListingsPage;
