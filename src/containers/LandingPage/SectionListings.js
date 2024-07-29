import React from 'react';
import { IconSpinner, ListingCard } from '../../components';
import css from './LandingPage.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { FetchNextPage } from './LandingPage.duck';
import { FormattedMessage } from 'react-intl';
const SectionListings = ({ listings, searchInProgress, searchListingsError, pagination }) => {
  if (searchInProgress && listings.length === 0) {
    return (
      <div className={css.loader}>
        <IconSpinner />
      </div>
    );
  }
  if (searchListingsError) {
    return (
      <p className={css.error}>
        <FormattedMessage id="LandingPage.SectionListings.errorMessage" />
      </p>
    );
  }

  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(FetchNextPage(pagination.page + 1));
  };
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  return (
    <InfiniteScroll
      dataLength={listings.length}
      pageStart={0}
      next={fetchData}
      hasMore={pagination?.page < pagination?.totalPages}
      endMessage={<p style={{ textAlign: 'center' }}>{/* <b>Yay! You have seen it all</b> */}</p>}
      loader={
        <div className={css.loader} key={0}>
          <IconSpinner />
        </div>
      }
    >
      <div className={css.rootListings}>
        <h1 className={css.title}>
          <FormattedMessage id="LandingPage.SectionListings.listingLabel" />
        </h1>
        <div className={css.listingCards}>
          {listings.map(l => {
            const currentStockIsZero = l?.currentStock?.attributes?.quantity !== 0;
            return currentStockIsZero ? (
              <ListingCard
                className={css.listingCardWithOutMap}
                key={l.id.uuid}
                listing={l}
                renderSizes={cardRenderSizes}
              />
            ) : null;
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default SectionListings;
