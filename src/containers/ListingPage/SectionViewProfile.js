import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import css from './ListingPage.module.css';
const SectionViewProfile = props => {
  const { user } = props;
  const intl = useIntl();
  const history = useHistory();
  const authorId = user?.id?.uuid;
  const handleClick = () => {
    history.push(`/u/${authorId}`);
  };
  return (
    // <div className={css.sectionDescription}>
    // <div className={css.viewProfile} onClick={handleClick}>
    //   {intl.formatMessage({
    //     id: 'listingPage.viewProfile',
    //   })}
    // </div>
    // </div>
    null
  );
};

export default SectionViewProfile;
