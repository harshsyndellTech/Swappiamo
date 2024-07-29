import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { IconSpinner, ListingCard, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { FetchNextPage } from '../../containers/SearchPage/SearchPage.duck';
const SearchResultsPanel = props => {
  const {
    className,
    rootClassName,
    listings,
    pagination,
    search,
    setActiveListing,
    showMap,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(FetchNextPage(pagination.page + 1, search));
  };
  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  return (
    <div className={classes}>
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
        <div className={showMap ? css.listingCards : css.listingCardsMap}>
          {listings.map(l => {
            const currentStockIsZero = l?.currentStock?.attributes?.quantity !== 0;
            return currentStockIsZero ? (
              <ListingCard
                className={showMap ? css.listingCard : css.listingCardWithOutMap}
                key={l.id.uuid}
                listing={l}
                renderSizes={cardRenderSizes}
                setActiveListing={setActiveListing}
              />
            ) : null;
          })}
          {props.children}
        </div>
        {/* {paginationLinks} */}
      </InfiniteScroll>
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default SearchResultsPanel;
