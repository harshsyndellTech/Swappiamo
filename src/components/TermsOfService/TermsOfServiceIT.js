import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.module.css';
import NamedLink from '../NamedLink/NamedLink';
import ExternalLink from '../ExternalLink/ExternalLink';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <h3>1. Come funziona una transazione</h3>
      <p>
        Gli articoli possono essere scambiati e i servizi possono essere forniti e gli eventi
        organizzati per un importo in Sune. Se un membro vuole ottenere un articolo o prenotare un
        servizio o un evento per la quantità di Sune visualizzata in un annuncio, può inviare la richiesta
        tramite l'apposito pulsante di RICHIESTA o contattare l’utente che ha pubblicato l’annuncio
        via chat. Se l'utente accetta lo scambio, la transazione è iniziata. Tutti i movimenti in SUNE sono
          visualizzabili all'interno del proprio "PORTAFOGLIO".
      </p>
      <p>La transazione viene completata quando:</p>
      <p>
        - per i prodotti - quando il richiedente riceve il bene e conferma di aver ricevuto
        l’articolo cliccando sul bottone "PRODOTTO RICEVUTO".
      </p>
      <p>- per i servizi e gli eventi - al termine della prestazione del servizio o alla data dell'evento;</p>

       <p>- per le Vacanze - il giorno successivo la data di check-in;</p>
      <p>
        In caso di prodotti, gli utenti concordano le modalità di consegna degli
        articoli. Le spese di consegna sono a carico del richiedente.
      </p>
      <p>
       Quando la transazione è considerata conclusa, le Sune vengono trasferite tra gli utenti.
      </p>
      <p>
        Un utente può sempre controllare il saldo e le sue transazioni Sune nella pagina
        PORTAFOGLIO.
      </p>

      <h3>2. Pubblicare annunci di prodotti e servizi su Swappiamo</h3>
      <p>
        Come membro della Comunità puoi pubblicare annunci nelle categorie EVENTI, PRODOTTI, SERVIZI e VACANZE. Puoi
        caricare tanti annunci quanti articoli e servizi desideri, indicando il titolo dell’annuncio, la
        descrizione, la tua posizione, la tua disponibilità, l'importo in Sune, le foto e il metodo
        di consegna. All'interno della descrizione dell'annuncio puoi indicare la quantità di Euro che desideri. 
        
        Si può sempre cancellare un annuncio da Swappiamo, a meno che non ci sia una transazione in corso.
      </p>

      <h3>3. Parti di una transazione</h3>
      <p>
        Solo gli utenti che scambiano articoli o servizi per Sune sono parti di uno scambio. I
        membri che hanno accettato uno scambio, accettano di scambiare le Sune per il servizio o per
        i prodotti richiesti.
      </p>
      <p>
        Swappiamo non ha alcun ruolo nelle transazioni e non si assume alcuna responsabilità per la
        qualità dei prodotti e dei servizi che vengono scambiati. Non effettuiamo la consegna dei
        beni, né prestiamo servizi, ma forniamo un marketplace facile ed intuitivo che consente agli
        utenti di concordare gli scambi.
      </p>

      <h3>4. Recensioni</h3>
      <p>
        Al termine della transazione gli utenti si lasceranno delle recensioni reciprocamente. Le
        recensioni saranno visibili solo quando entrambi gli utenti coinvolti nella transazione le
        avranno scritte. Il tempo per lasciare le recensioni e' di 14 giorni, dopodiche' non sara'
        piu' possibile lasciare la recensione per quello scambio.
      </p>
      <p>
       Le recensioni sono molto importanti per valutare l’affidabilità e la rispettabilita' dell’utente.
      </p>
      <p>
        Swappiamo si riserva la possibilità contattare un membro della Community nel caso in cui
        abbia recensioni con meno di 2 stelle o abbia ricevuto due o più segnalazioni sul suo
        comportamento attraverso la email info@swappiamo.it o il canale WhatsApp 320/2402868.
      </p>

      <h3>5. Iscrizione e cancellazione in Swappiamo</h3>
      <p>
        Swappiamo è una comunità aperta ai suoi iscritti a cui si accede solo tramite un invito. Il
        link d'invito puo' essere inviato via email o chat, copiando l'apposito link dalla sezione
        'Invita un amico'. Una volta che sei registrato puoi invitare altre persone a unirsi alla
        nostra Comunità.
      </p>
      <p>
        Al momento della sottoscrizione, riceverai un bonus di Benvenuto di 20Sune. Questa quantità di
        Sune è chiaramente determinata in 20Sune e ti aiutera' ad effettuare i primi scambi sulla piattaforma.
      </p>
      <p>
        Puoi annullare l’iscrizione in qualsiasi momento, andato nella sezione impostazioni del tuo
        account, cancella il tuo account. Una volta cancella to il tuo account perderai il tuo saldo
        in Sune.
      </p>
      <p>
        Possiamo sospendere e/o terminare la tua iscrizione, se riteniamo che
        tu abbia agito in violazione dei nostri termini di servizio o del codice di condotta
        desiderato.
      </p>
      <p>
        Il saldo in Sune non è in alcun modo rimborsabile, in quanto le Sune sono un sistema di
        credito complementare non convertibile in alcuna valuta.
      </p>

      <h3>6. Sune e Ricariche</h3>
      <p>
        Uno scambio è lo scambio di un oggetto o un servizio con un numero di Sune. Non ci sono
        trasferimenti di denaro tra membri in uno scambio.
      </p>
      <p>
        Non siamo rivenditori online. Le Sune non possono e non devono in nessun caso essere
        scambiate con denaro.
      </p>
      <p>
        È possibile acquistare le Sune, ricaricando il proprio portafoglio. Ci
        sono solo due tipi di ricariche, un membro può sceglierne entrambi ma deve attendere la sua
        scadenza di un anno prima di acquistare nuove Sune. Questo perché vogliamo evitare
        comportamenti speculativi.
      </p>

      <h3>7. Qualità degli articoli sul sito web</h3>
      <p>Desideriamo avere prodotti e servizi di qualità pubblicati sul nostro Marketplace.</p>
      <p>
        Non è possibile pubblicare annunci offensivi o contrari al rispetto delle norme di buon
        comportamento, ad esempio ma non solo materiale pornografico, armi, prestazioni sessuali,
        ecc…
      </p>
      <p>
        Pubblicare annunci di oggetti e servizi che sarebbero in conflitto con leggi, norme o
        regolamenti, per non parlare di oggetti e servizi illegali o proibiti sono ovviamente
        vietati.
      </p>
      <p>
        Swappiamo controlla e verifica gli annunci e i servizi pubblicati e si riserva il diritto di
        rifiutare articoli e servizi che ritiene non conformi alle sue politiche e/ o che considera,
        a sua esclusiva discrezione, non adatti per il Marketplace.
      </p>

      <h3>8. Limitazioni del servizio</h3>
      <p>
        È possibile iscriversi al Marketplace Swappiamo solo se si riceve il link di invito da un
        altro membro della Comunità.
      </p>
      <p>Non puoi iscriverti a Swappiamo se non sei invitato.</p>
      <p>
        Swappiamo utilizza un sistema di geolocalizzazione basato sul tuo indirizzo IP, quindi solo
        se ti trovi fisicamente in Italia, puoi accedere a Swappiamo dopo aver ricevuto il tuo link
        di invito.
      </p>
      <p>
        I membri della comunità Swappiamo sono costituiti da persone libere che vogliono rivendere
        beni e offrire i propri servizi. Beni e servizi sono per uso personale e non possono essere
        scambiati in alcun modo all’esterno della Comunità.
      </p>
      <p>
        Possono esserci massimali di importo in Sune per scambio di Beni e servizi. Quotazioni per
        un importo superiore ai massimali non sono accettate nella piattaforma.
      </p>
      <p>
        Swappiamo non si avvale né di agenti né di rappresentanti, ma conta solo sui suoi membri per
        allargare la Comunità, in quanto Swappiamo è una comunità basata sulla fiducia reciproca tra
        gli utenti e sulla condivisione dei nostri principi ispiratori.
      </p>
      <p>
        Attualmente operiamo principalmente in queste Regioni Italiane: Lazio, Lombardia e Sicilia.
      </p>
      <p>Rimani connesso per conoscere i nostri sviluppi!</p>

      <h3>9. Responsabilità degli articoli e dei servizi</h3>
      <p>
        Non ci assumiamo alcuna responsabilità per la qualità degli articoli e dei servizi
        pubblicati e scambiati attraverso la nostra piattaforma, né per la consegna di questi
        articoli, né per la perdita o il furto di articoli nel processo di consegna e/ o per
        eventuali carenze, malfunzionamenti o danni causati da articoli scambiati.
      </p>
      <p>
        Possiamo però verificare il comportamento dei nostri membri, se un membro invia una
        segnalazione alla casella di posta elettronica{' '}
        <ExternalLink href="mailto:info@swappiamo.it">info@swappiamo.it</ExternalLink>
        la leggeremo con attenzione e verificheremo l'accaduto.
      </p>

      <h3>10. Costi di iscrizione.</h3>
      <p>
        L’iscrizione a Swappiamo è gratuita. Nel futuro potremmo chiedere una quota di
        iscrizione per sostenerci nel mantenimento della piattaforma. Questi costi saranno
        chiaramente indicati nel sito web, e tutti gli utenti saranno avvisati e potranno scegliere se
          continuare a supportare Swappiamo o meno.
      </p>

      <h3>11. Informativa sulla privacy</h3>
      <p>
        Fare riferimento alla nostra
        <NamedLink name="PrivacyPolicyPage">Informativa sulla privacy</NamedLink>.
      </p>

      <h3>12. Forza maggiore</h3>
      <p>
        Non saremo responsabili verso i membri per qualsiasi ritardo o mancata esecuzione di uno
        scambio per qualsiasi causa o cause al di là del nostro ragionevole controllo, come ad
        esempio, ma non solo: proteste, atti governativi, guerra, incendio, inondazione, esplosione,
        mancanza di elettricità, bombe ecc. Faremo tutto il possibile per minimizzare l'effetto di
        tali ritardi.
      </p>
      <h3>13. Termine</h3>
      <p>
        Secondo la normativa europea che regola i Marketplace e, nello specifico, l'art. 3 del Regolamento EU 2019/1150 
        i fornitori di servizi di intermediazione online garantiscono che i loro termini e le loro condizioni:
        -enuncino le ragioni che giustificano le decisioni di sospendere, cessare o limitare in altro modo, 
        in tutto o in parte, la fornitura dei servizi di intermediazione online agli utenti commerciali;
       - le modifiche apportate alla piattaforma non devono essere applicate prima della scadenza di un termine di preavviso
        ragionevole e proporzionato alla natura e alla portata di tali modifiche e alle loro conseguenze per gli utenti
        commerciali interessati. Detto termine di preavviso deve essere di almeno 15 giorni dalla data in cui il fornitore
        di servizi di intermediazione online informa gli utenti commerciali delle modifiche proposte. 
        I fornitori di servizi di intermediazione concedono periodi di preavviso più lunghi quando ciò è necessario 
        per consentire agli utenti commerciali di effettuare adeguamenti tecnici o commerciali per conformarsi alle modifiche. 

       Per questi motivi e considerando che la piattaforma offre un servizio di intermediazione basato sullo scambio di beni e servizi, 
       non sempre acquistabili in tempi brevi, abbiamo pensato di garantire agli utenti un periodo di preavviso pari ad un mese 
       e ulteriori 6 mesi per poter spendere tutte le Sune in loro possesso. 
      Tale periodo, riteniamo, sia congruo a rassicurare gli iscritti alla piattaforma.
      </p>
      <h3>14. Applicabilità dei termini di servizio</h3>
      <p>
        Questi termini di servizio si applicano al nostro rapporto con gli utenti e all’utilizzo
        della nostra piattaforma. Registrandoti al nostro sito, accetti l'applicabilità di questi
        termini. Questi termini possono essere modificati da noi in ogni momento. I termini
        aggiornati entrano in vigore dopo una settimana dalla data di pubblicazione sulla nostra
        piattaforma.
      </p>
      <p>
        Possiamo pubblicare e modificare le nostre linee guida e le politiche sul nostro sito per
        quanto riguarda l'uso della piattaforma, le Sune, gli annunci che possono essere pubblicati,
        etc.
      </p>
      <p>
        Questi termini di servizio si applicano al marketplace Swappiamo e devono essere rispettati
        dai nostri membri quando si utilizzano la nostra piattaforma.
      </p>
             <p>
       Aggiornamento del 15/05/2024
          </p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
