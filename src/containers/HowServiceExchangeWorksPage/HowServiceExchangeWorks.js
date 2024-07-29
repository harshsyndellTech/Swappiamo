import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowServiceExchangeWorks.module.css';

const HowServiceExchangeWorks = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
    <p className={css.subHeading}> LA NOSTRA COMMUNITY </p>

  <p> Swappiamo promuove valori di liberta', gratuita' e rispetto del valore della persona
  e del suo lavoro. Per questo ci teniamo a creare una Community onesta, rispettosa delle persona
   e crede nella costruzione di un'economia del guadagno circolare. Ovvero un sistema economico
    in cui tutti i partecipanti venditori, acquirenti ed anche il market place
     guadagnano in maniera sana per i servizi/prodotti che offrono</p>
  
      <p>IL TUO PROFILO </p>
      <p>  Compila il tuo profilo con tutte le informazioni: Inserisci la tua foto o un’immagine che parla di te, 
        racconta nella tua bio cosa ti interessa e di cosa ti occupi. In questo modo ispirerai più fiducia e 
        potrai aumentare i tuoi contatti e le tue vendite. La Community aspetta di conoscerti!.</p>
          
        <p> STANDARD DELLA COMMUNITY </p>
          <p>
       Noi di Swappiamo vogliamo far sì la ns community resti un luogo accogliente, libero e aperto a tutti.  
       Vogliamo creare una community amichevole e fidata. Se hai la sensazione che non sia così o se noti 
        qualcosa che non dovrebbe essere  ti preghiamo di segnalarcelo via email a info@swappiamo.it.</p>

              <p> CERCA UTENTI </p>
       <p> Se vuoi conoscere gli atri membri della nostra Community puoi selezionarli attraverso la ricerca 
          ‘CERCA UTENTI’  che trovi nella home page. Potrai cosi’ vedere il loro profilo, gli annunci che hanno 
          pubblicato e le recensioni che hanno ricevuto.</p>

             <p> SICUREZZA </p>
        <p> Manteniamo un elevato standard di sicurezza relativo alle persone e alla piattaforma.
       </p>
       <p> Per un'ulteriore sicurezza, ti consigliamo di non:
          Acquistare articoli da utenti Swappiamo al di fuori del sistema di pagamento sicuro di Swappiamo 
          (con accredito diretto sul loro conto corrente). In questi casi non si applica la Protezione acquisti.</p>
            
       <p>  Prima di concludere una transazione, controlla il profilo dell’utente per leggere il feedback lasciato dagli 
            altri utenti: in questo modo avrai un’idea più chiara di cosa aspettarti.</p>

              <p> SEGNALARE CONTENUTI ILLEGALI O COMPORTAMENTI INAPPROPRIATI</p>
       <p>  Segnalare contenuti illegali e comportamenti inappropriati rende Swappiamo un luogo più sicuro e affidabile.
      </p>
   <p>  I contenuti illegali possono riferirsi a qualsiasi forma di informazione che viene considerata illegale ai 
          sensi della legge italiana applicabile o che è collegata ad attività illegali. </p>
<p> Per comportamento inappropriato si intende qualsiasi comportamento o pubblicazione di contenuti 
      che viola i nostri Termini di servizio ad esempio spam, truffe, phishing, l’offesa intenzionale di altri
        utenti. </p>
    </div>
  );
};

HowServiceExchangeWorks.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowServiceExchangeWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowServiceExchangeWorks;
