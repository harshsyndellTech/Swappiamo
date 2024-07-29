import React from 'react';
import { useHistory } from 'react-router-dom';
import { AvatarLarge, AvatarMedium } from '../../components';

import css from './ListingPage.module.css';

const SectionAvatar = props => {
  const { user } = props;
  const history = useHistory();
  const authorId = user?.id?.uuid;

  const handleClick = () => {
    history.push(`/u/${authorId}`);
  };
  return (
    <div className={css.sectionAvatar} onClick={handleClick}>
      <AvatarLarge
        user={user}
        className={css.avatarDesktop}
        initialsClassName={css.initialsDesktop}
        disableProfileLink
      />

      <AvatarMedium user={user} className={css.avatarMobile} disableProfileLink />
    </div>
  );
};

export default SectionAvatar;
