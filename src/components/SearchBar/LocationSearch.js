import React from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';
import { LocationAutocompleteInput } from '../../components';
import css from './SearchBar.module.css';
const identity = v => v;

function LocationSearch() {
  return (
    <Field
      name="location"
      format={identity}
      render={({ input, meta }) => {
        const { onChange, ...restInput } = input;

        // Merge the standard onChange function with custom behaviur. A better solution would
        // be to use the FormSpy component from Final Form and pass this.onChange to the
        // onChange prop but that breaks due to insufficient subscription handling.
        // See: https://github.com/final-form/react-final-form/issues/159
        const searchOnChange = value => {
          onChange(value);
          // handleChange(value);
        };
        const intl = useIntl();
        const searchInput = { ...restInput, onChange: searchOnChange };
        return (
          <LocationAutocompleteInput
            page="landing"
            placeholder={intl.formatMessage({ id: 'SearchBar.LocationSearch.placeholder' })}
            iconClassName={`${css.searchInputIcon} `}
            rootClassName={css.searchInputRoot}
            label="Location"
            inputClassName={`${css.searchInput}`}
            predictionsClassName={css.searchPredictions}
            // predictionsAttributionClassName={css.searchPredictionsAttribution}
            input={searchInput}
            meta={meta}
            isLandingPage={true}
          />
        );
      }}
    />
  );
}

export default LocationSearch;
