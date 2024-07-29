import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowDoesShippingWork.module.css';

const HowDoesShippingWork = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
    <p className={css.subHeading}> TRANSAZIONI </p>
      <p>
       Su Swappiamo e’ possibile pubblicare annunci di eventi, prodotti, servizi e vacanze.
      </p>
  
   <p className={css.subHeading}> COME FUNZIONANO LE TRANSAZIONI PER I PRODOTTI </p>
      
  <p>La transazione inizia quando un utente  richiede un prodotto tramite l'apposito pulsante "RICHIEDI IL 
      PRODOTTO". Al momento della richiesta, se l'annuncio e' anche in Euro, l’acquirente inserisce i dettagli 
      della sua carta per effettuare l'acquisto. L’importo dell'acquisto non viene addebitato ma pre-autorizzato 
     fin quando la transazione non viene completata. Il venditore riceve la richiesta di acquisto che puo’ accettare o 
      rifiutare. Se rifiuta, la transazione termina e l’importo viene rilasciato all’acquirente, se accetta la 
      transazione prosegue e l’acquirente ricevera’ un messaggio di conferma che la sua richiesta e’ stata 
      accettata. Tramite chat venditore e acquirente possono concordare sulle modalita’ di spedizione, 
      che sono a carico dell’acquirente. Solo quando il prodotto e’ stato consegnato l’acquirente puo’ 
      cliccare sul bottone "PRODOTTO RICEVUTO" all’interno della chat  e completare la transazione.  
      Cliccando sul bottone "PRODOTTO RICEVUTO" sia le Sune sia gli Euro vengono addebitati 
      all’acquirente e trasferiti al venditore. La transazione e’ completata. L’acquirente ha un tempo 
      massimo di 90 giorni per cliccare sul bottone prodotto ricevuto e completare la transazione</p>
        
<p> Tutti i movimenti in SUNE sono visualizzabili all'interno del proprio "PORTAFOGLIO SUNE".</p>
        
  <p className={css.subHeading}> COME FUNZIONANO LE TRANSAZIONI PER I SERVIZI </p>

<p>La transazione inizia quando un utente  richiede un servizio tramite l'apposito pulsante RICHIEDI IL 
    SERVIZIO indicando la data e l’ora del servizio richiesto. Al momento della richiesta, se l'annuncio e' anche in Euro,
    l’acquirente inserisce i dettagli della sua carta per effettuare la richiesta. L’importo non viene addebitato ma pre-  
     autorizzato fin quando la transazione non viene completata. Il prestatore di servizio riceve la 
     richiesta di prenotazione  che puo’ accettare o rifiutare. Il prestatore di servizio ha 7 giorni per 
     accettare o rifiutare la richiesta la transazione. Nel caso in cui non accetti entro 7 giorni la richiesta  
    si considera rifiutata e l’importo viene rilasciato all’acquirente. Se accetta la transazione prosegue e 
    l’acquirente ricevera’ un messaggio di conferma che la sua richiesta e’ stata accettata. Al termine del 
    servizio sia le Sune sia gli Euro vengono trasferiti al venditore e la transazione e’ completata. Tutti i 
     movimenti in SUNE sono visualizzabili all'interno del proprio "PORTAFOGLIO SUNE".</p>

  <p className={css.subHeading}> COME FUNZIONANO LE TRANSAZIONI PER GLI EVENTI </p>
       
<p> La transazione inizia quando un utente  richiede di partecipare ad un evento  l'apposito pulsante 
    RICHIESTA DI PRENOTAZIONE indicando la data e l’ora dell’evento. Al momento della richiesta, se l'annuncio e' anche in Euro,
     l’acquirente inserisce i dettagli della sua carta per effettuare la richiesta. L’importo non viene addebitato ma pre-  
     autorizzato fin quando la transazione non viene completata. L’organizzatore dell’evento ha 7 giorni per 
     accettare o rifiutare la richiesta la transazione. Nel caso in cui non accetti entro 7 giorni la richiesta  
    si considera rifiutata e l’importo viene rilasciato all’acquirente. Se accetta la transazione prosegue e 
     l’acquirente ricevera’ un messaggio di conferma che la sua richiesta e’ stata accettata. Al termine 
     dell’evento sia le Sune sia gli Euro vengono trasferiti al venditore e la transazione e’ completata. 
       Tutti i movimenti in SUNE sono visualizzabili all'interno del proprio "PORTAFOGLIO SUNE".</p>

  <p className={css.subHeading}> COME FUNZIONANO LE TRANSAZIONI PER LE VACANZE </p>
       
<p> La transazione inizia quando un utente  richiede di prenotare una struttura attraverso  l'apposito 
    pulsante RICHIESTA DI PRENOTAZIONE indicando la data di inizio e fine soggiorno. 
    Al momento della richiesta, se l'annuncio e' anche in Euro,  l’acquirente inserisce i dettagli della sua carta per 
    effettuare la richiesta. L’importo non viene addebitato ma pre-autorizzato fin quando la transazione non viene completata.
    La struttura riceve La richiesta di prenotazione che puo’ accettare o rifiutare. La struttura ha 7 giorni per accettare o  
    rifiutare la richiesta la transazione. Nel caso in cui non accetti entro 7 giorni la richiesta  si considera 
    rifiutata e l’importo viene rilasciato all’acquirente. Se accetta la transazione prosegue e l’acquirente 
     ricevera’ un messaggio di conferma che la sua richiesta e’ stata accettata. Il giorno dopo la data di   
      inizio del soggiorno sia le Sune sia gli Euro vengono trasferiti al venditore e la transazione e’ 
      completata. Tutti i movimenti in SUNE sono visualizzabili all'interno del proprio "PORTAFOGLIO SUNE".</p>

        <p> Per ulteriori informazioni leggi i nostri termini di servizio </p>
    </div>
  );
};

HowDoesShippingWork.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowDoesShippingWork.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowDoesShippingWork;
