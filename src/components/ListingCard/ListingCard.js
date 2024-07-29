import React, { Component } from 'react';
import { array, string, func } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing } from '../../util/data';
import { richText } from '../../util/richText';
import { findOptionsForSelectFilter } from '../../util/search';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { AvatarMedium, NamedLink, ResponsiveImage } from '../../components';

import css from './ListingCard.module.css';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const getCertificateInfo = (certificateOptions, key) => {
  return certificateOptions.find(c => c.key === key);
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    filtersConfig,
    setActiveListing,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const authorAvailable = currentListing && currentListing.author;

  const currentAuthor = authorAvailable ? currentListing.author : null;
  const id = currentListing.id.uuid;

  const { title = '', price, publicData } = currentListing.attributes;
  const condition = publicData?.condition;
  const conditionLabel = condition
    ? config.custom.condition?.find(val => val.value === condition)?.label
    : null;

  const slug = createSlug(title);
  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const certificateOptions = findOptionsForSelectFilter('certificate', filtersConfig);
  const certificate = publicData
    ? getCertificateInfo(certificateOptions, publicData.certificate)
    : null;
  const suneCreditPrice = publicData.price;
  const { priceTitle } = priceData(suneCreditPrice, intl);
  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const categoryType = listing?.attributes?.publicData?.category;
  const formattedPrice = price && price.amount > 0 ? formatMoney(intl, price) : null;
  const unitTranslationKey = isNightly
    ? 'ListingCard.perNight'
    : isDaily
    ? 'ListingCard.perDay'
    : 'ListingCard.perUnit';
  let priceLabel;
  if (categoryType === 'event') {
    priceLabel = intl.formatMessage({ id: 'event.priceInfo' });
  } else if (categoryType === 'vacanze') {
    priceLabel = intl.formatMessage({ id: 'vacanze.priceInfo' });
  } else if (categoryType === 'service') {
    priceLabel = intl.formatMessage({ id: 'service.priceInfo' });
  } else {
    priceLabel = intl.formatMessage({ id: 'product.priceInfo' });
  }

  const categoryInfo =
    categoryType == 'service' ? (
      <div className={css.infoSpan} style={{ zIndex: 1, position: 'absolute' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === categoryType).label,
        })}
      </div>
    ) : categoryType == 'event' ? (
      <div className={css.infoEvent} style={{ zIndex: 1, position: 'absolute' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === categoryType)?.label,
        })}
      </div>
    ) : categoryType == 'vacanze' ? (
      <div className={css.infoSpanVacanze} style={{ zIndex: 1, position: 'absolute' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === categoryType)?.label || 'Vacanze',
        })}
      </div>
    ) : (
      <div className={css.infoSpanProduct} style={{ zIndex: 1, position: 'absolute' }}>
        {intl.formatMessage({
          id: config.custom.listingTypes.find(k => k.key === categoryType)?.label || 'Product',
        })}
      </div>
    );

  return (
    <NamedLink className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={classNames(css.threeToTwoWrapper, 'relative')}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        {categoryInfo}
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['default']}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.infoNew}>
          <div className={css.price}>
            <div className={css.priceValue} title={priceTitle}>
              <img
                src={config.custom.suneCurrencySymbolBlack}
                style={{ width: '15px', marginRight: '3px', marginBottom: '2px' }}
                alt="Sune Currency Symbol"
              />
              <span className={css.sunePrice}>{suneCreditPrice}</span>
              {price && price.amount > 0 ? (
                <>
                  + <span className={css.mainPrice}>{formattedPrice}</span>
                </>
              ) : (
                ''
              )}
              {/* {suneCreditPrice} {price && price.amount > 0 ? ' + ' + formattedPrice : ''} */}
            </div>
            <div className={css.perUnit}>
              {priceLabel}
              {/* {categoryType && categoryType === 'service' ? (
                <FormattedMessage id={unitTranslationKey} />
              ) : (
                ''
              )} */}
            </div>
          </div>
          <div className={css.mainInfo}>
            <div className={css.title}>
              {richText(title, {
                longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                longWordClass: css.longWord,
              })}
            </div>

            {conditionLabel ? (
              <div className={css.condition}>{intl.formatMessage({ id: conditionLabel })}</div>
            ) : null}

            <div className={css.certificateInfo}>
              {certificate && !certificate.hideFromListingInfo ? (
                <span>{certificate.label}</span>
              ) : null}
            </div>
          </div>
        </div>
        <AvatarMedium className={css.avatar} user={currentAuthor} />
      </div>
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  filtersConfig: config.custom.filters,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  filtersConfig: array,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);
