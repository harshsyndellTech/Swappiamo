import React from 'react';
import config from '../../config';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { richText } from '../../util/richText';

import css from './ListingPage.module.css';
import { urlValidate } from '../../util/validators';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

const SectionDescriptionMaybe = props => {
  const { description, category, deliveryOption } = props;
  const intl = useIntl();
  const deliveryOptionLabel = deliveryOption
    ? intl.formatMessage({
        id:
          config.custom.deliveryOptions.find(option => option.key === deliveryOption)?.label ||
          deliveryOption?.label,
      })
    : null;

  return description ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.descriptionTitle" />
      </h2>

      <div
        className={css.description}
        dangerouslySetInnerHTML={{ __html: urlValidate(description) }}
      ></div>
      {/* <p className={css.description}>
        {richText(description, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION,
          longWordClass: css.longWord,
        })}
      </p> */}
      {category === 'product' ? (
        <>
          {deliveryOption ? (
            <>
              <h2 className={css.descriptionTitle} style={{ paddingTop: '16px' }}>
                {intl.formatMessage({ id: 'ListingPage.SectionDescriptionMaybeDeliveryOptions' })}
              </h2>
              <p className={css.description}>{deliveryOptionLabel}</p>
            </>
          ) : null}
        </>
      ) : (
        <></>
      )}
    </div>
  ) : null;
};

export default SectionDescriptionMaybe;
