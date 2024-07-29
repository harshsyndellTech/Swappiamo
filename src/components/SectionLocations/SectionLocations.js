import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import YouTube from 'react-youtube';

import css from './SectionLocations.module.css';
import SimpleTabs from './SimpleTabs';

class LocationImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}

const locationLink = (name, videoId) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <div>
      <YouTube videoId={videoId} opts={{ width: '300px', height: 220 }} />
      <div className={css.linkText}>{nameText}</div>
    </div>
    // <NamedLink
    //   name={page}
    //   // to={{ search: searchQuery }}
    //   className={css.location}
    // >
    //   <div className={css.imageWrapper}>
    //     <div className={css.aspectWrapper}>
    //       <LazyImage src={image} alt={name} className={css.locationImage} />
    //     </div>
    //   </div>
    //   <div className={css.linkText}>{nameText}</div>
    // </NamedLink>
  );
};

const SectionLocations = props => {
  const { rootClassName, className } = props;
  const intl = useIntl();
  const classes = classNames(rootClassName || css.root, className);
  const howToSwap = <FormattedMessage id="SectionLocations.howToSwap" />;
  const deliver = <FormattedMessage id="SectionLocations.deliver" />;
  const swapServices = <FormattedMessage id="SectionLocations.swapServices" />;
  const locations = [
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingOne' }),
      videoId: 'a8UsJaPvQFQ',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingTwo' }),
      videoId: '5Og7xyt4Wts',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingThree' }),
      videoId: 'sqRlrGw2e80',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingFour' }),
      videoId: 'VphVn7SwquI',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingFive' }),
      videoId: 'p3fXLiDvzPg',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingSix' }),
      videoId: 'j47od3PCApE',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingSeven' }),
      videoId: 'W7rk_2eWCbk',
    },
    // {
    //   name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingEight' }),
    //   videoId: 'PmolRs_-Yb8',
    // },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingNine' }),
      videoId: 'qlVbWs3j27g',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingTen' }),
      videoId: 'ZXgQ7_b2cH0',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingEleven' }),
      videoId: 'G3mXwgtyPZk',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingTwelve' }),
      videoId: 'WHgy2RGN4FE',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingThirteen' }),
      videoId: 'tHGlaljFW1g',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingFourteen' }),
      videoId: 'sFpkjO86o50',
    },
    {
      name: intl.formatMessage({ id: 'SectionLocations.SectionLocations.videoHeadingFifteen' }),
      videoId: 'Jjg96jyJZnc',
    },
  ];
  return (
    <div className={classes}>
      {/* <div className={css.title}>
        <FormattedMessage id="SectionLocations.title" />
      </div> */}
      {/* <div className={css.locations}> */}
      <SimpleTabs locations={locations} locationLink={locationLink} />
      {/* {locationLink(howToSwap, 'a8UsJaPvQFQ')}
        {locationLink(deliver, 'p3fXLiDvzPg')}
        {locationLink(swapServices, 'j47od3PCApE')} */}
      {/* </div> */}
    </div>
  );
};

SectionLocations.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionLocations;
