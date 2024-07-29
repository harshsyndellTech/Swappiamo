import React, { useState, useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { FieldKeywordInput, FieldSelectModern, Form, PrimaryButton } from '../../components';
import { PiSquaresFourLight } from 'react-icons/pi';
import LocationSearch from './LocationSearch';
import css from './SearchBar.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import config from '../../config';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
function SearchForm({ onSubmit }) {
  return (
    <FinalForm
      initialValues={{ type: 'location' }}
      onSubmit={onSubmit}
      render={formRenderProps => {
        const { handleSubmit, values, pristine } = formRenderProps;
        const history = useHistory();
        const intl = useIntl();

        // Grouped options
        const groupedOptions = [
          {
            label: (
              <p
                className={css.eventLabel}
                onClick={() => {
                  history.push('/s?pub_category=event');
                  if (typeof document !== 'undefined') document.activeElement.blur();
                }}
              >
                <FormattedMessage id="listingType.event" />
              </p>
            ),
            options: config.custom.listingTypes
              ?.filter(type => type.key === 'event')
              ?.map(category => ({
                key: category.key,
                label: intl.formatMessage({ id: category.label }),
                value: category.key,
              })),
          },
          {
            label: (
              <p
                className={css.serviceLabel}
                onClick={() => {
                  history.push('/s?pub_category=service');
                  if (typeof document !== 'undefined') document.activeElement.blur();
                }}
              >
                <FormattedMessage id="SearchBar.SearchBar.serviceLabel" />
              </p>
            ),
            options: config.custom.categoryOptions?.map(category => ({
              key: category.key,
              label: intl.formatMessage({ id: category.label }),
              value: category.key,
            })),
          },
          {
            label: (
              <p
                className={css.productLabel}
                onClick={() => {
                  history.push('/s?pub_category=product');
                  if (typeof document !== 'undefined') document.activeElement.blur();
                }}
              >
                <FormattedMessage id="SearchBar.SearchBar.productLabel" />
              </p>
            ),
            options: config.custom.productCategoryOption.map(category => ({
              key: category.key,
              label: intl.formatMessage({ id: category.label }),
              value: category.key,
            })),
          },
          {
            label: (
              <p
                className={css.vacanzeLabel}
                onClick={() => {
                  history.push('/s?pub_category=vacanze');
                  if (typeof document !== 'undefined') document.activeElement.blur();
                }}
              >
                <FormattedMessage id="listingType.vacanze" />
              </p>
            ),
            options: config.custom.vacanzeCategoryOptions.map(category => ({
              key: category.key,
              label: intl.formatMessage({ id: category.label }),
              value: category.key,
            })),
          },
        ];

        return (
          <Form onSubmit={handleSubmit} className={css.root}>
            <div className={css.locationContainer}>
              <div className={css.searchField}>
                <p className={css.label}>
                  <FormattedMessage id="SearchBar.SearchBar.keywordLabel" />
                </p>
                <FieldKeywordInput
                  id="keyword"
                  name="keyword"
                  type="text"
                  placeholder={intl.formatMessage({
                    id: 'SearchBar.SearchBar.keywordSearchPlaceholder',
                  })}
                  className={css.dateField}
                  rootClassName={css.rootField}
                  keyword
                />
              </div>
              <div className={css.searchField}>
                <p className={css.label}>
                  <FormattedMessage id="SearchBar.SearchBar.categoryLabel" />
                </p>
                <FieldSelectModern
                  id="category"
                  name="category"
                  placeholder={
                    <div>
                      <PiSquaresFourLight className={css.categoryIcon} />
                      <FormattedMessage id="SearchBar.SearchBar.categoryPlaceholder" />
                    </div>
                  }
                  options={groupedOptions}
                  className={css.select}
                  isMulti
                />
              </div>
              <div className={css.searchField}>
                <p className={css.label}>
                  {intl.formatMessage({ id: 'SearchBar.SearchBar.locationLabel' })}
                </p>
                <LocationSearch id="location" name="location" className={css.dateField} />
              </div>

              <div className={css.buttonContainer}>
                <PrimaryButton
                  type="submit"
                  className={css.searchButton}
                  // disabled={searchDisabled}
                >
                  <FiSearch className={css.searchIcon} />
                </PrimaryButton>
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
}

export default SearchForm;
