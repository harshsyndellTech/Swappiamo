import React from 'react';
import { Tabs, Tab } from 'react-tabs-scrollable';
import css from './SectionLocations.module.css';
const SimpleTabs = props => {
  const { images = [], locations = [], locationLink, imageStyle, isMobileLayout } = props;
  const [activeTab, setActiveTab] = React.useState(1);
  const onTabClick = (e, index) => {
    setActiveTab(index);
  };

  return (
   
    <Tabs
      activeTab={activeTab}
      onTabClick={onTabClick}
      tabsScrollAmount={1}
      animationDuration={300}
      hideNavBtnsOnMobile={false}
    >
      {locations?.map((image, index) => (
        <Tab key={index}>
          <p key={index} className={css.link}>{locationLink(image.name, image.videoId)}</p>
        </Tab>
      ))}
    </Tabs>
  );
};

export default SimpleTabs;
