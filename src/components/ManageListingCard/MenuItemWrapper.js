import React from 'react';
import { InlineTextButton } from '../Button/Button';
import MenuItem from '../MenuItem/MenuItem';
import NamedLink from '../NamedLink/NamedLink';

function MenuItemWrapper(props) {
  const { key, menuItemClasses, onClick, listing, label, useLink, name, params } = props;

  const child =
    useLink && name ? (
      <NamedLink name={name} params={params} className={menuItemClasses}>
        <span>{label}</span>
      </NamedLink>
    ) : (
      <InlineTextButton
        rootClassName={menuItemClasses}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          onClick(listing.id);
        }}
      >
        <span>{label}</span>
      </InlineTextButton>
    );

  return <MenuItem key={key}>{child}</MenuItem>;
}

MenuItemWrapper.defaultProps = {
  name: null,
  useLink: false,
  params: {},
};

export default MenuItemWrapper;
