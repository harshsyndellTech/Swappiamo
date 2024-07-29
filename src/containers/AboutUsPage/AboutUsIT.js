import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import image from '../../assets/aboutUs.jpg';
import css from './AboutUs.module.css';

const AboutUs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p className={css.subHeading}> "NON E' PERCHE' LE COSE SONO DIFFICILI CHE NON OSIAMO FARLE,
  E' PERCHE' NON OSIAMO FARLE CHE DIVENTANO DIFFICILI"</p>
      <p>
        Lucio Anneo Seneca{' '}
      </p>
      <img src={image} alt="about us" className={css.image} />
      <p className={css.subHeading}> LA NOSTRA STORIA</p>
      <p>
        {' '}
        Siamo una coppia di imprenditori dal 1998, abbiamo vissuto per molti anni ad Artena, un
        piccolo paese, non accessibile alle auto, ma del tutto pedonale, arrocato su una collina a
        circa 40Km da Roma. In quegli anni, abbarbicati ad Artena, con nostro figlio Adriano ancora
        piccolo abbiamo potuto vivere il senso vero della Comunità, vivendo a stretto contatto con
        gli abitanti di Artena che ci hanno aiutato e supportato nelle piccole e grandi difficoltà quotidiane.
      </p>
      <p>
        {' '}
        Per un'opportunità di lavoro ci siamo trasferiti poi a Cipro dove abbiamo vissuto per circa
        10anni e abbiamo visto come la crisi economica che prima coinvolgeva solo le aziende negli
        anni si era trasfornata in una crisi piu' generale, si era trasformata in una crisi più generale,
        una crisi di valori, di mancanza di connessione e di creatività e che era caratterizzata 
          soprattutto da un aspetto finanziario, ovvero dalla scarsità monetaria.
      </p>
      <p>
        {' '}
        Durante la crisi Covid in cui l'isolamento e' dilagato e in cui la crisi economica e'
        divenuta sempre piu' visibile siamo rientrati in Italia con nostro filgio Adriano.
          </p>
      <p>
        {' '}
          Durante il periodo di chiusura del Covid abbiamo pensato a come poter ricreare quel senso di comunità' che tanto ci manca
          e come creare e più ricchezza per tutte le categorie più in difficoltà, per gli artigiani, gli agricoltori,per chi è dedito al benessere delle persone, 
          per chi sta avviando una nuova attività e per chi ha mantenuto le braccia aperte ad un’accoglienza libera. </p>
          
        <p> Così in un periodo durato circa 1 anno e mezzo,durante la pandemia, e' nato Swappiamo, dall'inglese Swap ovvero Scambio. Swappiamo
        significa Scambiamo.
      </p>
      <p className={css.subHeading}> SWAPPIAMO E' LA NOSTRA OPPORTUNITA' </p>
      <p>
        {' '}
       In Swappiamo possiamo acquistare beni e servizi, organizzare eventi e affittare case vacanze a prezzi scontati in Sune. 
         Sune e' una parola del dialetto Artenese che vuole dire: Su Dai! Coraggio! Ed e' questa
        l'energia che vogliamo avere in Swappiamo.
      </p>
     <p> 
        {' '}
            Abbiamo pensato ad un sistema semplice, un marketplace, totalmente gratuito, in cui domanda ed offerta potessero incontrarsi 
              e in cui i partecipanti potessero applicare lo sconto che desiderano in SUNE per poi recuperarlo per fare altri acquisti,
                cosi da non perdere potere d'acquisto</p>
      <p>
        {' '}
        Abbiamo chiesto un parere legale per poter all’interno del “sistema” e della normativa, 
        costruire  un’economia di scambio funzionale, legale, libera,
        circolare, cooperativa, il denaro abbia sempre meno peso.</p>
          
          <p>
        {' '}  
       Così è nato SWAPPIAMO, un progetto che sta crescendo molto solo grazie al passaparola dei 
         suoi partecipanti e che speriamo si arricchisca sempre di più, per poter essere tutti un po’ più ricchi,
           vicini e liberi.
              </p>
    </div>
  );
};

AboutUs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

AboutUs.propTypes = {
  rootClassName: string,
  className: string,
};

export default AboutUs;
