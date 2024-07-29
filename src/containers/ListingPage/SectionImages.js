import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ResponsiveImage, Modal, ImageCarousel } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';

import css from './ListingPage.module.css';
import config from '../../config';

const SectionImages = props => {
  const {
    title,
    listing,
    isOwnListing,
    intl,
    editParams,
    handleViewPhotosClick,
    imageCarouselOpen,
    onImageCarouselClose,
    onManageDisableScrolling,
    closeListingLoading,
    openListingLoading,
    openingListingError,
    closingListingError,
  } = props;
  const type = listing?.attributes?.publicData?.category;
  const category =
  type == 'service' ? (
    <div className={css.type} style={{ backgroundColor:"#ff4e50" }}>
      {intl.formatMessage({
        id: config.custom.listingTypes.find(k => k.key === type).label,
      })}
    </div>
  ) : type == 'event' ? (
    <div className={css.type} style={{backgroundColor:"#87d152"}}>
      {intl.formatMessage({
        id: config.custom.listingTypes.find(k => k.key === type).label,
      })}
    </div>
  ) : (
    <div className={css.type} style={{backgroundColor:"#ff9e28"}}>
      {intl.formatMessage({
        id: config.custom.listingTypes.find(k => k.key === type).label,
      })}
    </div>
  );


  const hasImages = listing.images && listing.images.length > 0;
  const firstImage = hasImages ? listing.images[0] : null;
  // console.log({ firstImage });
  // Action bar is wrapped with a div that prevents the click events
  // to the parent that would otherwise open the image carousel
  const actionBar = listing.id ? (
    <div onClick={e => e.stopPropagation()}>
      <ActionBarMaybe
        isOwnListing={isOwnListing}
        listing={listing}
        editParams={editParams}
        closeListingLoading={closeListingLoading}
        openListingLoading={openListingLoading}
        openingListingError={openingListingError}
        closingListingError={closingListingError}
      />
    </div>
  ) : null;

  const viewPhotosButton = hasImages ? (
    <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
      <FormattedMessage
        id="ListingPage.viewImagesButton"
        values={{ count: listing.images.length }}
      />
    </button>
  ) : null;

  return (
    <div className={css.sectionImages}>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>


          {actionBar}
          {category}
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={[
              'default',
              // 'landscape-crop',
              // 'landscape-crop2x',
              // 'landscape-crop4x',
              // 'landscape-crop6x',
            ]}
          />
          {viewPhotosButton}
        </div>
      </div>
      <Modal
        id="ListingPage.imageCarousel"
        scrollLayerClassName={css.carouselModalScrollLayer}
        containerClassName={css.carouselModalContainer}
        lightCloseButton
        isOpen={imageCarouselOpen}
        onClose={onImageCarouselClose}
        usePortal
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <ImageCarousel images={listing.images} />
      </Modal>
    </div>
  );
};

export default SectionImages;
