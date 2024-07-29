import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowToEarnSune.module.css';
import { NamedLink } from '../../components';

const HowToEarnSune = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
    <p className={css.subHeading}> PAGAMENTI E TRASFERIMENTI </p>
      <p>Swappiamo gestisce sia i trasferimenti in Sune sia i pagamenti in Euro, utilizzando un’infrastruttura 
      di pagamenti altamente tecnologica.
</p>    
  <p className={css.subHeading}> VENDITE </p>
      <p>
       All’interno del tuo profilo nella sezione impostazioni – Ricezione pagamenti - ti verra’ richiesto 
       di indicare il conto corrente bancario su cui vuoi ricevere i tuoi guadagni in Euro. Sarai indirizzato al processore dei
       pagamenti Stripe per verificare le tue coordinate bancarie e ricevere i pagamenti in modo sicuro.
      </p>
      <p>
        Nel caso in cui il prezzo del tuo annuncio sia totalmente in Sune al termine della transazione riceverai 
        da parte dell’acquirente l’importo in Sune che sara’ visibile nella tua sezione portafoglio.
      </p>
      <p>
        Nel caso in cui il prezzo del tuo annuncio sia parte in Sune e parte in Euro, al termine della transazione
        riceverai da parte dell’acquirente l’importo in Sune che sara’ visibile nella tua sezione portafoglio e 
        l’importo in Euro che sara’ visibile nel tuo conto corrente bancario.
      </p>
      <p>
        Per maggiori informazioni su come avvengono le transazioni visita la pagina Transazioni.
      </p>
            <p className={css.subHeading}> ACQUISTI </p>
      <p>  
        All’interno del tuo profilo nella sezione impostazioni account – Invio pagamenti - ti verra’ richiesto di indicare 
        i dati della tua carta di credito/debito.  Su Swappiamo e’ possibile inserire tutte le principali carte di credito 
        e debito, anche carte prepagate e carte elettroniche purche’ in corso di validita’.
          </p>
          <p>
         Su tutti gli acquisti effettuati in Euro si applica la  Protezione acquisti. La nostra priorità è garantirti 
         la massima protezione durante l'acquisto, la protezione acquisti si occupa di  Proteggere i tuoi acquisti.</p>
       <p>  
         Puoi fare acquisti in tutta tranquillità, sapendo che i tuoi dati bancari sono crittografati e al sicuro.</p>
            
     <p className={css.subHeading}> RICEZIONE DEI PRODOTTI </p>
       <p>    
        L'acquirente conferma la ricezione del prodotto cliccando sul bottone 'PRODOTTO RICEVUTO'. In questo modo attesta 
        che il prodotto è stato ricevuto e che l'oggetto è in buone condizioni e conforme a quanto descritto nell'annuncio.</p>
     <p>  
        Quando l’acquirente ha confermato di avere ricevuto il prodotto, cliccando sul bottone ‘PRODOTTO RICEVUTO’ 
        verrà inviato il pagamento per il venditore.</p>   
          
         <p className={css.subHeading}> ASSISTENZA DA PARTE DEL NOSTRO TEAM </p>
          
          <p>  
         Siamo sempre a tua disposizione per rispondere a qualsiasi domanda relativa al tuo ordine. 
         Vogliamo assicurarci che tu possa fare acquisti su Swappiamo in modo semplice e senza intoppi.</p>   
          
      <p className={css.subHeading}> SICUREZZA DELLE TRANSAZIONI </p>
          
           <p>  
        Tutti i pagamenti che vengono fatti attraverso la piattaforma Swappiamo, sono processati dal sistema di pagamenti Stripe.
        Tutti i pagamenti sono crittografati in modo sicuro per impostazione predefinita. Per maggiori informazioni visita la pagina
        https://support.stripe.com/questions/is-my-financial-account-information-safe. </p>          
    </div>
  );
};

HowToEarnSune.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowToEarnSune.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowToEarnSune;
