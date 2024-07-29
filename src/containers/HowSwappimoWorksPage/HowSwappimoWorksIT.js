import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowSwappimoWorks.module.css';
import { NamedLink } from '../../components';

const HowSwappimoWorksIT = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        Swappiamo è un Marketplace il modello dell’abbondanza circolare o del guadagno circolare. 
       Su Swappiamo aumenta le possibilita’ di acquisto di beni e servizi tra i membri della 
       Comunità grazie all’utilizzo, oltre l’euro, un sistema di crediti chiamato SUNE.
      </p>

      <p>
        Si può accedere a Swappiamo solo se si riceve il link di invito da un membro della Community.
        Questo perché vogliamo costruire una Comunità di persone che si fidano tra di loro, che collaborano
        insieme e che credono nella nostra missione e nei nostri principi. 
        Cliccando sul link di invito puoi registrarti su Swappiamo. Con l'iscrizione accetti i nostri
        termini di servizio. 
      </p>

      <p>
        Una volta effettuato l'accesso puoi iniziare anche tu a pubblicare i tuoi annunci.
        In Swappiamo il prezzo e' in SUNE ed in Euro. Puoi inserire liberamente il prezzo che desideri, 
        parte in Sune ed in Euro o totalmente in Sune.  Swappiamo ti sostiene e non ti vincola in 
        nessuno modo. Puoi inserire il prezzo che ritieni opportuno, con l’unica nota che non puo’ 
        essere totalmente in Euro.   La nostra e' una comunita' in transizione e capiamo le necessita' 
        dei nostri utenti.
      </p>

      <p>
        Pubblica annunci di prodotti, o magari delle tue creazioni artistiche,condividi le tue
        passioni. Offri i tuoi servizi e metti le tue competenze a disposizione della Community.
        Organizza i tuoi eventi per farti conoscere. 
        Se cerchi un cambiamento nell'economia, Swappiamo e' il posto giusto!
      </p>

  
      <p>
        Per approfondire come ottenere le Sune vai alla pagina <NamedLink name="HowToEarnSunePage">
        Come guadagnare le Sune</NamedLink>
         </p>

      {/* <h3> Come funziona uno scambio di prodotti</h3>
      <p>
        Gli annunci dei prodotti sono pubblicati dai membri della Comunita’. Nella fase di
        inserimento dell’annuncio viene richiesto di inserire il titolo dell’annuncio, la
        descrizione, la localita’, l’importo in Sune, le foto e la modalita’ di spedizione. Quando
        un utente trova un oggetto che gli piace, invia la richiesta di scambio attraverso la chat
        privata al proprietario dell'oggetto, cliccando sull’apposito pulsante. Se lo scambio e’
        accettato da entrambi gli utenti, gli utenti concordano la modalita’ di consegna. 
        Lo scambio è completato, quando l'acquirente clicca sul pulsante "PRODOTTO RICEVUTO". 
        il Saldo in Sune viene aggiornato e la transazione e' completata.
        Puoi sempre controllare il saldo e le tue transazioni in Sune nel tuo PORTAFOGLIO.
      </p>
      <h3>Come funziona la spedizione?</h3>
      <p>
        Scambiare i tuoi beni è un ottimo modo per conoscere i tuoi vicini. Il 90% degli scambi
        completati vengono scambiati di persona. Per i membri che non vivono nelle vicinanze, la
        spedizione deve essere concordata e organizzata tra gli utenti. Le spese di spedizione sono
        a carico della persona che richiede l’articolo.
      </p>
      <h3>Come funziona uno scambio di servizi</h3>
      <p>
        Gli annunci dei servizi sono pubblicati dai membri della Comunita’. Nella fase di
        inserimento dell’annuncio viene richiesto di inserire il titolo dell’annuncio, la
        descrizione, la localita’ , la disponibilita’ in calendario, l’importo in Sune e le foto.
        Quando un utente trova un servizio che gli occorre, invia un messaggio attraverso la chat
        privata al fornitore di servizio, cliccando sull’apposito pulsante. Se lo scambio e’
        accettato da entrambi, gli utenti concordano attraverso la chat privata come organizzarsi.
        Il trasferimento delle Sune avviene il giorno dopo l’esecuzione del servizio.
        Il Saldo in Sune viene aggiornato e la transazione e' completata.
        Puoi sempre controllare il saldo e le tue transazioni in Sune nel tuo PORTAFOGLIO.
      </p> */}

      <p>
        Per ulteriori informazioni leggi i nostri <NamedLink name="TermsOfServicePage">Termini di Servizio</NamedLink> per
        maggiori dettagli.
      </p>
    </div>
  );
};

HowSwappimoWorksIT.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowSwappimoWorksIT.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowSwappimoWorksIT;
