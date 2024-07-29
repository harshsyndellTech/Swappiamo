import classNames from 'classnames';
import React from 'react';
import { useIntl } from '../../util/reactIntl';
import { useHistory, useLocation } from 'react-router-dom';
import { KeywordFilter, NamedLink } from '../../components';
import css from './StateTabs.module.css';

const Tab = ({ tab, className }) => {
  return (
    <NamedLink {...tab.linkProps} className={className}>
      {tab.text}
    </NamedLink>
  );
};

function StateTabs(props) {
  const { tabs } = props;
  return (
    <ul className={css.tabContainer}>
      {tabs.map(tab => (
        <Tab
          key={tab.text}
          tab={tab}
          className={classNames(css.tab, {
            [css.selected]: tab.selected,
          })}
        />
      ))}
    </ul>
  );
}

export default StateTabs;
