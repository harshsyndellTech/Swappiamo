import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './HowProductExchangeWorks.module.css';

const HowProductExchangeWorks = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p className={css.subHeading}> COME PUBBLICARE UN ANNUNCIO </p>
    <p>
        Sei pronto a mettere un annuncio su Swappiamo e creare annunci che catturino l'attenzione dei nostri utenti? 
        Segui i nostri consigli per creare un annuncio perfetto e iniziare subito a vendere.</p>
          
           <p> Pubblicare un annuncio è semplicissimo. Per il primo annuncio pubblicato riceverai un bonus di 50 Sune.
  Segui questi passaggi:</p>
     <p> •	accedi alla tua "Area Riservata" inserendo indirizzo e-mail e password;</p>
       <p> •	clicca su Aggiungi o Inserisci Annuncio"  e scegli se inserire un Prodotto, un Servizio, un Evento o una struttura per Vacanze;</p>
      <p>  •	compila tutti i dati richiesti: titolo e descrizione, posizione, quantita', prezzo in Sune ed in Eur, e foto.</p>
     <p>   • aggiungi delle belle foto nitide del tuo annuncio e fatti notare. </p>

  <p className={css.subHeading}> PREZZI </p>
      <p> In Swappiamo il prezzo puo' essere totalmente in Sune o parte in Sune e parte in Euro a totale discrezione dei nostri utenti.
  Nel caso di annunci di prodotti il prezzo e' per quantita', di servizi il prezzo e' per ora, di soggiorni per notte e di eventi per evento.</p>   
  
<p className={css.subHeading}> COME CARICARE LE FOTO DELL'ANNUNCIO </p>
  
       <p> Puoi inserire le foto direttamente in fase di inserimento annuncio.
        Ti ricordiamo che hai sempre a disposizione 10 foto gratuite. Le foto devono essere in uno dei seguenti formati: JPG, PNG o GIF
        Nel caso riscontrassi difficoltà, ti consigliamo di modificare le foto riducendone o aumentandone le dimensioni.
        Le foto devono avere dimensioni minime di 200X150 pixel e non superare i 20 Mb
      </p>
   <p className={css.subHeading}> COME SPECIFICARE LE CONDIZIONI DEL PRODOTTO</p>
          
          <p> Durante l'inserimento dell'annuncio devi specificare la condizione del tuo prodotto, selezionando dal menu a tendina:</p>
        <p>•	Nuovo: oggetto con cartellino o confezione originale oppure non nella confezione ma mai utilizzato e senza difetti.</p>
       <p> •	Usato in Ottime condizioni: oggetto usato poche volte e che non presenta segni di usura se non minimi. Specifica eventuali difetti nel testo dell'annuncio.</p>
      <p>  •	Usato in Buone condizioni: oggetto usato che potrebbe presentare segni di usura ma ben conservato. Specifica eventuali difetti nel testo dell'annuncio.</p>
          
        <p className={css.subHeading}> COME MODIFICARE O DISATTIVARE UN ANNUNCIO</p>
<p> In qualsiasi momento puoi modificare o disattivare un tuo annuncio, scopr come cliccando qui:</p>
          <p>
        {' '}
        <a href="https://www.youtube.com/shorts/YBysME0dZDg" target="_blank">
          https:// https://www.youtube.com/shorts/YBysME0dZDg
        </a>{' '}
      </p>
          
           <p className={css.subHeading}> CONSIGLI PER UN ANNUNCIO PERFETTO</p>
          
          <p> Scatta una bella foto 
              Inserisci un prezzo accattivante
              Fai una descrizione chiara, onesta e completa.
              Cerca di inserire tutte le specifiche del prodotto che vuoi vendere e seleziona correttamente la condizione dell'oggetto.
      </p>
         <p> Quanto costa inserire un annuncio?
             Nulla! Sì, hai capito bene, su Swappiamo la pubblicazione di un annuncio è GRATUITA. 
      </p>  
         <p> Seguendo questi consigli, sarai in grado di creare e pubblicare un annuncio perfetto.
             Ricorda di controllare regolarmente il tuo annuncio e di rispondere prontamente alle domande degli acquirenti.
                </p>
          </div>
  );
};

HowProductExchangeWorks.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

HowProductExchangeWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default HowProductExchangeWorks;
