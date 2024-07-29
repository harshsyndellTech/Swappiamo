import React from 'react';
import config from '../../config';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import css from './ListingPage.module.css';

export default function SectionConditionMaybe(props) {
  const { publicData } = props;
  const { condition } = publicData;
  const conditionLabel = condition
    ? config.custom.condition?.find(val => val.value === condition)?.label
    : null;
  console.log('conditionlabel', conditionLabel);
  return condition ? (
    <div>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="EditListingDescriptionForm.conditionLabel" />
      </h2>
      <p>
        <FormattedMessage id={conditionLabel} />
      </p>
    </div>
  ) : null;
}
