import React from 'react';
import { bool, func, node, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SearchFiltersPrimary.module.css';
import Select from 'react-select';
import defaultImage from '../../assets/default.png';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import { SearchBar } from '..';

const SearchFiltersPrimaryComponent = props => {
  const {
    rootClassName,
    className,
    children,
    sortByComponent,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    isSecondaryFiltersOpen,
    toggleSecondaryFiltersOpen,
    selectedSecondaryFiltersCount,
    users,
    usersLoading,
    showMap,
    handleShowMap,
    onSubmitSearch,
  } = props;
  const history = useHistory();
  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, className);

  const toggleSecondaryFiltersOpenButtonClasses =
    isSecondaryFiltersOpen || selectedSecondaryFiltersCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSecondaryFiltersOpenButton = toggleSecondaryFiltersOpen ? (
    <button
      className={toggleSecondaryFiltersOpenButtonClasses}
      onClick={() => {
        toggleSecondaryFiltersOpen(!isSecondaryFiltersOpen);
      }}
    >
      <FormattedMessage
        id="SearchFiltersPrimary.moreFiltersButton"
        values={{ count: selectedSecondaryFiltersCount }}
      />
    </button>
  ) : null;

  const style = {
    multiValueLabel: base => ({
      ...base,
      backgroundColor: '#9ca3af',
      color: 'white',
      fontWeight: 'bold',
      padding: '0rem 0.5rem',
    }),
    control: base => ({
      ...base,
      backgroundColor: 'var(--matterColorBright)',
    }),
    menu: base => ({
      ...base,
      backgroundColor: 'var(--matterColorBright)',
      // maxHeight: '200px',
      overflowY: 'auto',
      zIndex: '100',
    }),
  };
  return (
    <div className={classes}>
      <div className={css.searchOptions}>
        {listingsAreLoaded ? (
          <div className={css.searchResultSummary}>
            <span className={css.resultsFound}>
              <FormattedMessage
                id="SearchFiltersPrimary.foundResults"
                values={{ count: resultsCount }}
              />
            </span>
          </div>
        ) : null}
      </div>

      {/* <div className={css.filters}>
        {children}
        {toggleSecondaryFiltersOpenButton}
        {sortByComponent}
      </div> */}
      <div className={css.filterContainer}>
        <div className={css.mapToggleContainer}>
          <p className={css.mapToggleLabel}>
            <FormattedMessage id="SearchFiltersPrimary.SearchFiltersPrimary.showMapLabel" />
          </p>
          <Switch onChange={handleShowMap} checked={showMap} />
        </div>
        <Select
          styles={style}
          options={users}
          className={css.userFilters}
          onChange={e => {
            history.push(`/u/${e.value}`);
          }}
          isLoading={usersLoading}
          placeholder={<FormattedMessage id="SearchFiltersMobile.SearchFiltersMobile.searchUser" />}
          formatOptionLabel={user => (
            <div className="user-options">
              <img className={css.userImage} src={user.image || defaultImage} />
              <span>{user.label}</span>
            </div>
          )}
        />
      </div>

      <SearchBar onSubmit={onSubmitSearch} />
      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFiltersPrimary.noResults" />
        </div>
      ) : null}
      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFiltersPrimary.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersPrimaryComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchInProgress: false,
  isSecondaryFiltersOpen: false,
  toggleSecondaryFiltersOpen: null,
  selectedSecondaryFiltersCount: 0,
  sortByComponent: null,
};

SearchFiltersPrimaryComponent.propTypes = {
  rootClassName: string,
  className: string,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchInProgress: bool,
  isSecondaryFiltersOpen: bool,
  toggleSecondaryFiltersOpen: func,
  selectedSecondaryFiltersCount: number,
  sortByComponent: node,
};

const SearchFiltersPrimary = SearchFiltersPrimaryComponent;

export default SearchFiltersPrimary;
