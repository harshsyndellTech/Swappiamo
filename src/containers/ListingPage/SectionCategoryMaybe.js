import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import { TiTick } from 'react-icons/ti';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import css from './ListingPage.module.css';
import config from '../../config';
import { useIntl } from 'react-intl';

const SectionCategoryMaybe = props => {
  const { publicData } = props;
  if (!publicData) {
    return null;
  }
  const intl = useIntl();
  const mainCategory = publicData?.category;
  const mainCategoryLabel = intl.formatMessage({
    id: config.custom.listingTypes.find(i => i.key === mainCategory)?.label,
  });
  if (!mainCategory) return null;
  const category = publicData?.subCategory;
  const sectionMainCategory = mainCategory ? (
    <div className={css.container}>
      <TiTick className={css.icons} /> <span>{mainCategoryLabel}</span>
    </div>
  ) : null;
  return category ? (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.categoryTitle" />
      </h2>
      <p className={css.description}>
        {sectionMainCategory}
        {mainCategory != 'event' ? (
          <p className={css.subCategory}>
            <TiTick className={css.icons} />{' '}
            <span>
              {intl.formatMessage({
                id: [
                  ...config.custom.categoryOptions,
                  ...config.custom.productCategoryOption,
                  ...config.custom.vacanzeCategoryOptions,
                ]?.find(c => c.key === category)?.label,
              })}
            </span>
          </p>
        ) : null}
      </p>
    </div>
  ) : null;
};

export default SectionCategoryMaybe;
