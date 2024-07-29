import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { InlineTextButton } from '../../components';

import css from './ListingPage.module.css';
import SectionViewProfile from './SectionViewProfile';
import { urlValidate } from '../../util/validators';

const getCertificateInfo = (certificateOptions, key) => {
  return certificateOptions.find(c => c.key === key);
};

const SectionHeading = props => {
  const {
    richTitle,
    listingCertificate,
    certificateOptions,
    showContactUser,
    onContactUser,
    user,
  } = props;

  const certificate = getCertificateInfo(certificateOptions, listingCertificate);
  const showCertificate = certificate && !certificate.hideFromListingInfo;
  const authorDisplayName =props.user.attributes.profile.displayName
  return (
    <div className={css.sectionHeading}>
      <div className={css.heading}>
        <h1 className={css.title} dangerouslySetInnerHTML={{ __html: urlValidate(richTitle) }}>
          {/* {richTitle} */}
        </h1>
        
        <div className={css.author}>
          {showCertificate ? <span>{certificate.label}</span> : null}
          <div className={css.headerContainer}>
            <div>
              <SectionViewProfile user={user} />
            </div>
            <div>
              {showContactUser ? (
                <>
                  {showCertificate ? <span className={css.separator}>•</span> : null}
                  {/* <InlineTextButton
                    rootClassName={css.contactLink}
                    onClick={onContactUser}
                    enforcePagePreloadFor="LoginPage"
                  >
                    <FormattedMessage id="UserCard.heading" values={{ name: authorDisplayName }} />
                  </InlineTextButton> */}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
