import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.module.css';
import ExternalLink from '../ExternalLink/ExternalLink';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Ultimo aggiornamento: 27 Novembre 2022.</p>

      <p>
        La presente Informativa sulla privacy descrive le nostre politiche e le procedure relative
        alla raccolta, all'uso e alla divulgazione delle tue informazioni quando utilizzi il
        Servizio Swappiamo.
      </p>
      <p>
        Utilizziamo i tuoi dati personali per fornire e migliorare il Servizio. Utilizzando il
        Servizio, l'utente accetta la raccolta e l'uso delle informazioni in conformità con la
        presente Informativa sulla privacy.
      </p>

      <h2>Interpretazione e definizioni</h2>
      <h3>Interpretazione</h3>
      <p>
        Le parole indicate di seguito in maiuscolo hanno il significato esplicitato nelle seguenti
        definizioni. Le parole di seguito esplicitate nelle definizioni hanno lo stesso significato,
        indipendentemente dal fatto che appaiano al singolare o al plurale.
      </p>

      <h3>Definizioni</h3>
      <p>Ai fini della presente Informativa sulla privacy:</p>
      <p>
        ACCOUNT: significa un account univoco creato per l'Utente per accedere al nostro Servizio o a
        parti del nostro Servizio.
      </p>
      <p>
        LA SOCIETA’ (indicata come "la Società", "Noi", "Noi" o "Nostro" nel presente Accordo) si
        riferisce alla Swappiamo di proprietà di Divenire ltd, Manou Chatsidakis 14A, Limassol,
        Cipro. Ai fini del GDPR, la Società è il Titolare del trattamento dei dati personali.
      </p>
      <p>
        Il TITOLARE DEI DATI , ai fini del GDPR (Regolamento Generale sulla Protezione dei Dati), si
        riferisce alla Società che come persona giuridica, da sola o congiuntamente ad altri,
        determina le finalità e i mezzi del trattamento dei Dati Personali.
      </p>

      <p>
        DISPOSITIVO: qualsiasi dispositivo che può accedere al Servizio, ad esempio un computer, un
        cellulare o un tablet digitale.
      </p>
      <p>
        DATI PERSONALI: qualsiasi informazione che si riferisce a un individuo identificato o
        identificabile.
      </p>

      <p>
        Ai fini del GDPR, per DATI PERSONALI si intende qualsiasi informazione relativa all'Utente
        come un nome, un numero di identificazione, dati di localizzazione, identificatore online,
        uno o più fattori specifici dell'identità fisica, fisiologica, genetica, mentale, economica,
        culturale o sociale.
      </p>

      <p>Il SERVIZIO si riferisce al Marketplace SWAPPIAMO.</p>

      <p>
        FORNITORE DI SERVIZIO: si riferisce a Sharetribe una società software sita in Erottajankatu
        19 B, 00130 Helsinki, Finland.che tratta i dati per conto della Società. Il fornitore
        fornisce il Servizio per conto della Società, esegue servizi correlati al Servizio o assiste
        la Società nell'analisi delle modalità di utilizzo del Servizio. Ai fini del GDPR, i il
        fornitore del Servizio è considerato Responsabili del trattamento.
      </p>

      <p>
        Per maggiori informazioni visita:
        <ExternalLink href="https://help.sharetribe.com/en/articles/1929705-sharetribe-and-gdpr">
          https://help.sharetribe.com/en/articles/1929705-sharetribe-and-gdpr
        </ExternalLink>
      </p>

      <p>
        Il Servizio di SOCIAL MEDIA di terze parti si riferisce a qualsiasi sito web o sito web di
        social network attraverso il quale un Utente può accedere o creare un account per utilizzare
        il Servizio.
      </p>

      <p>
        SOCIETA’ PROCESSORE DI PAGAMENTI si intende: la società STRIPE per maggiori informazioni
        visita{' '}
        <ExternalLink href="https://stripe.com/it/privacy">
          https://stripe.com/it/privacy
        </ExternalLink>
      </p>

      <p>
        UTILIZZO DEI DATI si riferisce a dati raccolti automaticamente, generati dall'utilizzo del
        Servizio o dall'infrastruttura stessa del Servizio (ad esempio, la durata di una visita
        della pagina).
      </p>

      <p>
        SITOWEB si riferisce al marketplace SWAPPIAMO, accessibile da{' '}
        <ExternalLink href="https://www.swappiamo.it">https://www.swappiamo.it</ExternalLink>
      </p>

      <p>
        UTENTE: Si intende la persona che accede o utilizza il Servizio, o la società, o altra
        persona giuridica per conto della quale tale individuo sta accedendo o utilizzando il
        Servizio, a seconda dei casi.
      </p>

      <p>
        Ai sensi del GDPR (Regolamento generale sulla protezione dei dati), l'utente può essere
        indicato come l'interessato o come l'individuo che utilizza il Servizio.
      </p>

      <h2>Raccolta e utilizzo dei dati personali</h2>
      <h3>Tipi di dati raccolti</h3>
      <h4>Dati personali</h4>
      <p>
        Durante l'utilizzo del nostro Servizio, potremmo chiederti di fornirci alcune informazioni
        personali che possono essere utilizzate per contattarti o identificarti. Le informazioni di
        identificazione personale possono includere, ma non sono limitate a:
      </p>
      <ul>
        <li>Indirizzo email</li>

        <li>Nome e cognome</li>

        <li>Indirizzo, Stato, Provincia, CAP, Città</li>
      </ul>
      <h3>Utilizzo dei dati personali</h3>
      <p>La Società può utilizzare i Dati Personali per le seguenti finalità:</p>
      <p>
        Fornire e mantenere e monitorare l'utilizzo del nostro Servizio.
      </p>
      <p>
        Per gestire il tuo account: per gestire la tua registrazione come utente del Servizio. I
        Dati Personali forniti dall'Utente possono consentire l'accesso a diverse funzionalità del
        Servizio disponibili per l'Utente in qualità di utente registrato.
      </p>
      <p>
        Per l'esecuzione di una transazione: la conformità e l'impegno in una transazione di
        prodotti, o i servizi che avete scambiato o di qualsiasi altro scambio effettuato attraverso
        il Servizio.
      </p>
      <p>
        Per contattarti: Per contattarti via e-mail, telefonate, SMS o altre forme equivalenti di
        comunicazione elettronica, come le notifiche push di un'applicazione mobile in merito ad
        aggiornamenti o comunicazioni informative relative alle funzionalità, ai prodotti o ai
        servizi contrattuali, compresa la sicurezza.
      </p>
      <p>
        Per fornirvi notizie, offerte speciali e informazioni generali su altri beni, servizi ed
        eventi che offriamo simili a quelli che avete già acquistato o richiesto, a meno che non
        abbiate scelto di non ricevere tali informazioni.
      </p>
      <p>Per gestire le vostre richieste</p>
      <p>
        Per altri scopi: possiamo utilizzare le informazioni dell'utente per altri scopi, come
        l'analisi dei dati, l'identificazione delle tendenze di utilizzo, la determinazione
        dell'efficacia delle nostre campagne promozionali e per valutare e migliorare il nostro
        servizio e la vostra esperienza.
      </p>
      <p>Alcuni dati personali vengono raccolti automaticamente quando si utilizza il Servizio.</p>
      <p>
        I dati di utilizzo possono includere informazioni quali l'indirizzo del Protocollo Internet
        del Dispositivo dell'Utente (ad es. indirizzo IP), il tipo di browser, la versione del
        browser, le pagine del nostro Servizio visitate, l'ora e la data della visita, il tempo
        trascorso su tali pagine, identificatori univoci del dispositivo e altri dati diagnostici.
      </p>
      <p>
        Possiamo anche raccogliere informazioni che il browser dell’utente invia ogni volta che
        visita il nostro Servizio o quando accede al Servizio tramite Personal Computer o tramite 
        un dispositivo mobile.
      </p>
      <p>
        Accettando i termini del Servizio presti il tuo consenso al trattamento dei tuoi dati
        personali, come descritto in questi termini.
      </p>

      <h3>Email Marketing</h3>
      <p>
        Potremmo utilizzare i tuoi dati personali per contattarti con newsletter, materiale di
        marketing o promozionale e altre informazioni che potrebbero essere di tuo interesse. Si può
        scegliere di ricevere alcune, o tutte queste comunicazioni. E' sempre possibile cancellarsi 
        dalla newsletter seguendo il link di cancellazione fornito nell'email stessa o contattandoci
        alla casella di posta elettronica info@swappiamo.it.
      </p>
      <p>
        Utilizziamo il seguente fornitore di servizi di email marketing per gestire e inviare e-mail
        agli utenti.
      </p>
      <p>Sendgrid</p>
      <p>
        Sendgrid è un servizio di invio di email marketing fornito da Twilio Ireland Limited, una
        società registrata nella Repubblica d'Irlanda, il cui indirizzo registrato è 25-28 North
        Wall Quay, Dublino 1, Irlanda
      </p>
      <p>
        Per ulteriori informazioni sulle pratiche sulla privacy di Sendgrid, si prega di visitare la
        loro politica sulla privacy a:
      </p>

      <ExternalLink href="https://www.twilio.com/gdpr">Twilio GDPR</ExternalLink>

      <h3>Pagamenti</h3>
      <p>
        Possiamo fornire prodotti e/o servizi a pagamento all'interno del Servizio. In tal caso,
        potremmo utilizzare servizi di terze parti per l'elaborazione dei pagamenti (ad es.
        processori di pagamento), in particolare il Servizio utilizza processore di pagamento
        STRIPE.
      </p>
      <p>
        La politica sulla privacy di Stripe può essere visualizzata su{' '}
        <ExternalLink href="https://stripe.com/it/privacy">
          https://stripe.com/it/privacy
        </ExternalLink>
      </p>
      <p>Non memorizzeremo né raccoglieremo i dati della tua carta di pagamento.</p>
      <p>
        Tali informazioni vengono fornite direttamente ai nostri processori di pagamento il cui uso
        delle tue informazioni personali è regolato dalla loro Informativa sulla privacy.
      </p>
      <p>
        Questi processori di pagamento aderiscono agli standard stabiliti da PCI-DSS come gestito
        dal PCI Security Standards Council, che è un circuito di marchi come Visa, Mastercard,
        American Express e Discover. I requisiti PCI-DSS aiutano a garantire la gestione sicura
        delle informazioni di pagamento.
      </p>

      <h3>Conservazione dei dati</h3>
      <p>
        I tuoi dati, inclusi i Dati Personali, sono mantenuti presso gli uffici operativi della
        Società Hosting. Ciò significa che queste informazioni possono essere trasferite a - e
        mantenute su - computer situati al di fuori del tuo stato. La società hosting ovvero
        Sharetribe rispetta le norme imposte dal GDPR
      </p>
      <p>
        Per maggiori informazioni visita
        <ExternalLink href="https://help.sharetribe.com/en/articles/1929705-sharetribe-and-gdpr">
          https://help.sharetribe.com/en/articles/1929705-sharetribe-and-gdpr
        </ExternalLink>
      </p>
      <p>
        Conserviamo i vostri dati personali solo per il tempo necessario a utilizzarli come
        descritto nella presente informativa sulla privacy, e/o per il tempo in cui abbiamo il
        vostro permesso di conservarli.
      </p>
      <p>
        Non venderemo, distribuiremo o affitteremo le vostre informazioni personali a terzi. Tutte
        le informazioni personali che vi richiediamo saranno salvaguardate in base all'informativa
        vigente.
      </p>
      <p>
        La Società adotterà tutte le misure ragionevolmente necessarie per garantire che i tuoi dati
        siano trattati in modo sicuro e in conformità con la presente Informativa sulla privacy e
        nessun trasferimento dei tuoi dati personali avverrà ad una parte terza se non quelle
        indicate in questo documento.
      </p>

      <h3>Trasferimento dei dati fuori dall’UE</h3>
      <p>I dati personali raccolti non saranno trasferiti fuori dall’UE.</p>

      <h3>Periodo di conservazione dei dati personali</h3>
      <p>
        Il trattamento sarà svolto in forma automatizzata e manuale, con modalità e strumenti volti
        a garantire la massima sicurezza e riservatezza, ad opera di soggetti di ciò appositamente
        incaricati in ottemperanza a quanto previsto dall’art. 32 GDPR.
      </p>
      <h3>Consenso</h3>
      <p>
        Avete il diritto di revocare il vostro consenso all'utilizzo dei vostri dati personali in
        qualsiasi momento e di richiederne la cancellazione. Non conserviamo i vostri dati personali
        più a lungo di quanto sia necessario alla luce del motivo per cui sono stati raccolti.
        Pertanto, i dati saranno conservati per i periodi previsti dal GDPR.
      </p>
      <h3>Diritti degli interessati</h3>
      <p>
        L’utente potrà far valere i propri diritti come espressi dal Regolamento UE 2016/679,
        rivolgendosi al Titolare, inviando una e-mail all’indirizzo info@swappiamo.it o scrivendo
        alla sede del Titolare sopra indicata.
      </p>
      <p>
        In particolare, l’utente ha il diritto, in qualunque momento, di chiedere al Titolare del
        trattamento l’accesso ai Suoi dati personali (art. 15), la rettifica (art. 16), la
        cancellazione (art. 17) degli stessi, la limitazione del trattamento (art. 18). Inoltre, ha
        il diritto alla portabilità dei dati (art. 20) e il diritto di opporsi al loro trattamento
        (art. 21).
      </p>
      <p>
        Per non ricevere più comunicazioni di marketing (e-mail, SMS, MMS, o altri strumenti) sarà
        sufficiente scrivere in qualsiasi momento una mail all’indirizzo info@swappiamo.it con
        oggetto "cancellazione" o utilizzare i nostri sistemi di cancellazione automatica previsti
        per le sole e-mail, e non sarà più disturbato.
      </p>
      <h3>Sicurezza</h3>
      <p>
        La sicurezza dei dati è molto importante per noi e per proteggere i vostri dati abbiamo
        adottato misure adeguate a salvaguardare e proteggere i dati raccolti attraverso il nostro
        Sito.
      </p>
      <h3>Uso dei ‘cookies’</h3>
      <p>
        Come molti altri siti web, utilizziamo i cookie. Li utilizziamo per aiutarvi a
        personalizzare la vostra esperienza online. 
      </p>
      <p>
        Un cookie è un file di testo che viene collocato sul vostro disco rigido da un server di
        pagine web e che consente al sito web di riconoscervi quando lo visitate. I cookie
        raccolgono solo dati sulle azioni e sui modelli di navigazione e non identificano l'utente
        come persona fisica.
      </p>
      <p>Potremmo utilizzare i cookies per le seguenti ragioni:</p>
      <p>
        Autenticazione, personalizzazione e sicurezza: i cookie ci aiutano a verificare l'account e
        il dispositivo dell'utente e a determinare il momento dell'accesso, in modo da facilitare
        l'accesso ai servizi e fornire le esperienze e le funzionalità appropriate. Utilizziamo i
        cookie anche per prevenire l'uso fraudolento delle credenziali di accesso.
      </p>
      <p>
        Prestazioni e analisi: i cookie ci aiutano ad analizzare le modalità di accesso e di
        utilizzo dei servizi e ci consentono di monitorare le prestazioni dei servizi. Ad esempio,
        utilizziamo i cookie per determinare se avete visualizzato una pagina o aperto un'e-mail.
        Questo ci aiuta a fornirvi informazioni che trovate interessanti. Utilizziamo i cookie anche
        per fornire informazioni sui vostri utenti finali e sulle prestazioni dei vostri siti, come
        le visualizzazioni delle pagine, i tassi di conversione, le informazioni sui dispositivi,
        gli indirizzi IP dei visitatori e i siti di riferimento.
      </p>
      <p>
        Terze parti: I servizi di terze parti possono utilizzare i cookie per aiutarvi ad accedere
        ai loro servizi dai nostri servizi. Possiamo anche utilizzare cookie di terze parti, come
        Google Analytics, per analizzare le prestazioni. L'utilizzo di qualsiasi cookie di terze
        parti è regolato dall'informativa sulla privacy della terza parte che ha inserito il cookie.
      </p>
      <p>
        Rinuncia ai cookie: È possibile impostare il proprio browser in modo da non accettare i
        cookie, ma ciò potrebbe limitare la possibilità di utilizzare i servizi.
      </p>
      <h3>Modifiche alla presente Informativa sulla privacy</h3>
      <p>
        Possiamo aggiornare la nostra Informativa sulla privacy di tanto in tanto. Vi informeremo di
        eventuali modifiche pubblicando la nuova Informativa sulla privacy su questa pagina.
      </p>
      <p>
        Ti informeremo via e-mail o con una notifica sul nostro sito web , prima che la modifica
        diventi effettiva e aggiorneremo "l’ultimo aggiornamento" inserendo la data nella parte
        superiore della presente Informativa sulla privacy.
      </p>
      <p>
        Si consiglia di consultare periodicamente questa Informativa sulla privacy per eventuali
        modifiche. Le modifiche alla presente Informativa sulla privacy sono efficaci quando vengono
        pubblicate su questa pagina.
      </p>

      <h3>Contattaci</h3>
      <p>
        Se desiderate presentare un reclamo sul modo in cui stiamo trattando i vostri dati, potete
        contattarci a 
        <ExternalLink href="mailto:info@swappiamo.it">info@swappiamo.it</ExternalLink>.
      </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
