import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.module.css';
import config from '../../config';
import yoga from './SectionHeroImages/swappiamo_slide-05.png';
import relex from './SectionHeroImages/swappiamo_slide-11.png';
import goico from './SectionHeroImages/swappiamo_slide-12.png';
import valore from './SectionHeroImages/swappiamo_slide-13.png';
import green from './SectionHeroImages/swappiamo_slide-06.png';
import red from './SectionHeroImages/swappiamo_slide-07.png';
import orange from './SectionHeroImages/swappiamo_slide-08.png';
import nine from './SectionHeroImages/swappiamo_slide-09.png';
import white from './SectionHeroImages/swappiamo_slide-10.png';
import arte from './SectionHeroImages/swappiamo_slide-14.png';
import food from './SectionHeroImages/swappiamo_slide-15.png';
import foto from './SectionHeroImages/swappiamo_slide-16.png';
const SectionHero = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  const intl = useIntl();
  return (
    <div className={classes}>
      <div className={css.container}>
        <img className={css.yogaImage} src={yoga} alt="Yoga" />
        <img className={css.relexImage} src={relex} alt="Relex" />
        <img className={css.goicoImage} src={goico} alt="Goico" />
        <img className={css.valoreImage} src={valore} alt="Valore" />
        <img className={css.greenImage} src={green} alt="Green" />
        <img className={css.redImage} src={red} alt="Red" />
        <img className={css.orangeImage} src={orange} alt="Orange" />
        {/* <img className={css.nineImage} src={nine} alt="Nine" /> */}
        <img className={css.whiteImage} src={white} alt="White" />
        <img className={css.arteImage} src={arte} alt="Arte" />
        <img className={css.foodImage} src={food} alt="Food" />
        <img className={css.fotoImage} src={foto} alt="Foto" />
        <div className={css.heroContent}>
          <h1 className={css.heroMainTitle}>
            <FormattedMessage id="SectionHero.title" />
          </h1>
          <h2 className={css.heroSubTitle}>
            <FormattedMessage id="SectionHero.subTitle" />
          </h2>
          {/* events, services and products */}
          <div className={css.buttonContainer}>
            <NamedLink
              name="SearchPage"
              to={{ search: `pub_category=event` }}
              className={css.heroButtonEvent}
            >
              {intl.formatMessage({ id: 'listingType.event' })}
            </NamedLink>
            <NamedLink
              name="SearchPage"
              to={{ search: `pub_category=service` }}
              className={css.heroButtonService}
            >
              {intl.formatMessage({ id: 'listingType.service' })}
            </NamedLink>
            <NamedLink
              name="SearchPage"
              to={{ search: `pub_category=product&pub_condition=new` }}
              className={css.heroButtonProduct}
            >
              {intl.formatMessage({ id: 'listingType.product' })}
            </NamedLink>
            <NamedLink
              name="SearchPage"
              to={{ search: `pub_category=vacanze` }}
              className={css.heroButtonVacanze}
            >
              {intl.formatMessage({ id: 'listingType.vacanze' })}
            </NamedLink>
            <NamedLink
              name="SearchPage"
              to={{ search: `pub_category=product&pub_condition=brandNew,secondHand` }}
              className={css.heroButtonVintage}
            >
              {intl.formatMessage({ id: 'SectionHero.SectionHero.vintageLabel' })}
            </NamedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;
