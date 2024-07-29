import React from 'react';
import { array, object } from 'prop-types';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  Footer,
  LayoutSingleColumn,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  NamedLink,
  SecondaryButton,
} from '../../components';
import config from '../../config';

import css from './SelectCategoryPage.module.css';

const SelectCategoryPage = props => {
  const { params, listingCategories } = props;
  const { category } = params;
  const intl = useIntl();
  const isVacanzeCategory = category === 'vacanze';
  return (
    <StaticPage
      title="Select Sub-Category"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'SelectCategoryPage',
        description: 'Select Category Page',
        name: 'Select Category Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar className={css.topbar}>
          <TopbarContainer currentPage="SelectCategoryPage" topbarMenuClass={css.topbarMenu} />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.pageWrapper}>
            <div className={css.left}>
              {category == 'service' ? (
                <p className={css.text}>{intl.formatMessage({ id: 'categoryPage.whichServ' })}</p>
              ) : isVacanzeCategory ? (
                <p className={css.text}>
                  {intl.formatMessage({ id: 'categoryPage.whichVacanze' })}
                </p>
              ) : (
                <p className={css.text}>{intl.formatMessage({ id: 'categoryPage.whichProd' })}</p>
              )}
            </div>
            <div className={css.categoryWrapper}>
              <h1 className={css.pageTitle}>
                {category === 'service'
                  ? intl.formatMessage({ id: 'categoryPage.servCat' })
                  : isVacanzeCategory
                  ? intl.formatMessage({ id: 'categoryPage.vacanzeCat' })
                  : intl.formatMessage({ id: 'categoryPage.prodCat' })}
              </h1>
              {category === 'service'
                ? config.custom.categoryOptions
                    ?.filter(
                      option =>
                        option.label !== 'categoryOptions.healthWell' &&
                        option.label !== 'categoryOptions.moving' &&
                        option.label !== 'categoryOptions.sportsHobbies' &&
                        option.label !== 'categoryOptions.technicians' &&
                        option.label !== 'categoryOptions.other'
                    )
                    ?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }))
                    .map(subcat => {
                      return (
                        <NamedLink
                          key={subcat.key}
                          className={css.categoryLink}
                          name="NewListingPageWithCategories"
                          params={{ category, subcategory: subcat.key }}
                        >
                          <SecondaryButton className={css.categoryButton}>
                            {subcat.label}
                          </SecondaryButton>
                        </NamedLink>
                      );
                    })
                : isVacanzeCategory
                ? config.custom.vacanzeCategoryOptions
                    ?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }))
                    .map(subcat => {
                      return (
                        <NamedLink
                          key={subcat.key}
                          className={css.categoryLink}
                          name="NewListingPageWithCategories"
                          params={{ category, subcategory: subcat.key }}
                        >
                          <SecondaryButton className={css.categoryButton}>
                            {subcat.label}
                          </SecondaryButton>
                        </NamedLink>
                      );
                    })
                : config.custom.productCategoryOption
                    ?.filter(
                      option =>
                        option.label !== 'serviceCategoryOp.elec' &&
                        option.label !== 'serviceCategoryOp.hobbies' &&
                        option.label !== 'serviceCategoryOp.home' &&
                        option.label !== 'serviceCategoryOp.motor' &&
                        option.label !== 'serviceCategoryOp.pets' &&
                        option.label !== 'serviceCategoryOp.sporting' &&
                        option.label !== 'serviceCategoryOp.otherCat'
                    )
                    ?.map(m => ({ ...m, label: intl.formatMessage({ id: m.label }) }))
                    .map(subcat => {
                      return (
                        <NamedLink
                          key={subcat.key}
                          className={css.categoryLink}
                          name="NewListingPageWithCategories"
                          params={{ category, subcategory: subcat.key }}
                        >
                          <SecondaryButton className={css.categoryButton}>
                            {subcat.label}
                          </SecondaryButton>
                        </NamedLink>
                      );
                    })}
            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

SelectCategoryPage.defaultProps = {
  params: null,
  listingCategories: config.custom.listingCategories,
};

SelectCategoryPage.propTypes = {
  params: object,
  listingCategories: array,
};

export default SelectCategoryPage;
