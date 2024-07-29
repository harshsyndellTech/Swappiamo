import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './FAQs.module.css';
import { ExternalLink } from '../../components';

const FAQs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <h3 className={css.subHeading}>Come posso unirmi alla comunità Swappiamo? </h3>
      <p>
        Puoi iscriverti solo se ricevi il link di invito via e-mail o WhatsApp o qualsiasi altra
        chat da parte di un membro della Community Swappiamo.
      </p>
      <h3 className={css.subHeading}>Quanto costa entrare in Swappiamo? </h3>
      <p>Swappiamo è totalmente gratuito. Non ci sono dei costi di iscrizione.</p>
      <h3 className={css.subHeading}>
        Sono libero di annullare l'iscrizione in qualsiasi momento?
      </h3>
      <p>Sì, un membro può annullare l'iscrizione in qualsiasi momento.</p>

      <h3 className={css.subHeading}>Come inserisco il mio profilo utente?</h3>

      <p>
        Inserire il tuo profilo utente e’ semplicissimo, scopri come cliccando qui:
      </p>
      <p>
        {' '}
        <a href="https://www.youtube.com/watch?v=_iqhslEyXXs&t=1s" target="_blank">
          https://www.youtube.com/watch?v=_iqhslEyXXs&t=1s
        </a>{' '}
      </p>
<h3 className={css.subHeading}> Come pubblico il mio annuncio?</h3>
      <p>
        Pubblicare un annuncio e’ semplicissimo, scopri come cliccando qui:
         {' '}
        <a href="https://www.youtube.com/watch?v=E-oKz4T5ntE=1s" target="_blank">
          https://www.youtube.com/watch?v=E-oKz4T5ntE
        </a>{' '}
      </p>
          
<h3 className={css.subHeading}> Posso modificare o cancellare il mio annuncio?</h3>
      <p>
        Sì, è possibile modificare o disattivare un annuncio in qualsiasi momento, scopri come cliccando qui: 
        
        {' '}
        <a href="https://www.youtube.com/shorts/YBysME0dZDg" target="_blank">
          https://www.youtube.com/shorts/YBysME0dZDg
        </a>{' '}
      </p>
  <h3 className={css.subHeading}>Posso inserire un numero illimitato di annunci?</h3>
      <p>Sì, puoi.</p>
          <h3 className={css.subHeading}>
        Se ho aggiunto un annuncio ma decido di cancellarlo, posso farlo in qualsiasi momento?
      </h3>
      <p>Sì, è possibile disattivare un annuncio in qualsiasi momento.</p>
           <h3 className={css.subHeading}>Come posso controllare le mie sune?</h3>
      <p>
       Puoi verificare sempre i tutti tuoi movimenti in SUNE nella tua sezione portafoglio, 
         clicca qui <a href="https://swappiamo.it/sune">https://swappiamo.it/sune</a>

      </p>
      <h3 className={css.subHeading}>Chi paga le spese di spedizione?</h3>
      <p>
        Nel caso di scambio di prodotti i membri concordano via chat come gli articoli dovranno
        essere spediti. Di norma chi riceve il prodotto paga le spese di spedizione.
      </p>
      <h3 className={css.subHeading}>Fornite servizi di spedizione?</h3>
      <p>
        No, perché in questo momento la maggior parte dei nostri scambi avvengono all'interno delle
        comunità locali. Man mano che il numero di articoli spediti aumentera', rivedremo la nostra
        politica di spedizione. Per maggiori dettagli vai al nostro tutorial 'come funzionano le
        spedizioni'.
      </p>
      <h3 className={css.subHeading}>
        La richiesta di scambio e' vincolante, ovvero sono costretto ad accettare lo scambio?
      </h3>
      <p>No, la richiesta non e' vincolante, puoi accettarla o rifiutarla.</p>
    
      <h3 className={css.subHeading}>Chi devo contattare se il prodotto non mi soddisfa?</h3>
      <p>
        Puoi contattare il venditore. Swappiamo non si assume la responsabilità della qualità dei
        beni e dei servizi offerti. Ricordate, se l’oggetto scambiato non ti soddisfa o qualcosa non
        ha funzionato durante lo scambio puoi sempre inviare una e-mail a{' '}
        <ExternalLink href="mailto:Info@swappiamo.it">Info@swappiamo.it</ExternalLink>
      </p>

      <p>Ci fidiamo dei nostri membri e vogliamo costruire una comunità sana.</p>
      <h3 className={css.subHeading}>Swappiamo fornisce un'assicurazione?</h3>
      <p>Non forniamo l'assicurazione sugli scambi.</p>
      <h3 className={css.subHeading}>In quali paesi e' presente Swappiamo?</h3>
      <p>Attualmente  solo in Italia. </p>
      
    </div>
  );
};

FAQs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

FAQs.propTypes = {
  rootClassName: string,
  className: string,
};

export default FAQs;
