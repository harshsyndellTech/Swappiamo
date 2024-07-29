import React from 'react';
import { bool } from 'prop-types';
import SelectSingleFilterPlain from './SelectSingleFilterPlain';
import SelectSingleFilterPopup from './SelectSingleFilterPopup';
import { useIntl } from 'react-intl';

const SelectSingleFilter = props => {
  const { showAsPopup, options, ...rest } = props;
  const intl = useIntl();
  const newOptions = options?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }));
  return showAsPopup ? (
    <SelectSingleFilterPopup {...rest} options={newOptions} />
  ) : (
    <SelectSingleFilterPlain {...rest} options={newOptions} />
  );
};

SelectSingleFilter.defaultProps = {
  showAsPopup: false,
};

SelectSingleFilter.propTypes = {
  showAsPopup: bool,
};

export default SelectSingleFilter;
