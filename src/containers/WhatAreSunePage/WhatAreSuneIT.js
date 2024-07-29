import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './WhatAreSune.module.css';
import { NamedLink } from '../../components';

const WhatAreSune = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        Su Swappiamo non compriamo e vendiamo per soldi, ma scambiamo beni e servizi in un sistema
        complementare chiamato Sune.
      </p>
      <p>Le Sune non sono denaro, sono solo un mezzo di scambio.</p>
      <p>
        Le Sune sono legali? Sì. Le Sune, come un sistema di diritti e doveri, sono legalmente
        supportate dai regolamenti interni di Swappiamo approvati da ogni membro iscritto al
        Marketplace. La base giuridica è il Codice Civile Art. 1552 che disciplina scambi e permute
        e dal d.lgs. 27 gennaio 2010 n. 1191
      </p>
      <p>
        Le Sune sono accettate dai membri del Marketplace di Swappiamo e non possono essere
        utilizzate al di fuori della Comunità Swappiamo.{' '}
      </p>
      <p>
        Posso convertire Sune in Euro? No. Un Sune, non può essere convertito in valuta ufficiale,
        ma può essere scambiato solo con prodotti e servizi offerti dai membri del Marketplace. Il
        sistema delle Sune è accettato solo all’interno della Comunità Swappiamo.{' '}
      </p>
      <p>
        Il valore che un membro attribuisce ad un prodotto in Sune è libero. Il sistema delle Sune
        rende piu’ facile ad ogni membro dare valore ai propri annunci di prodotti e servizi.{' '}
      </p>
      <p>
        Promuoviamo le Sune come semplice mezzo di scambio equo e non come prezzo per beni e
        servizi. Una volta che ti iscrivi, accetti di utilizzare le Sune e puoi quindi fare scambi
        gratuitamente! Quando richiedi qualcosa, lo scambierai con le tue Sune disponibili. Allo
        stesso modo, quando qualcuno desidera qualcosa da te, scambierà con te le sue Sune. Puoi
        sempre controllare il saldo e le tue transazioni Sune sul tuo Saldo in Sune.
      </p>
      <p>
        {' '}
        Su Swappiamo c'e' abbondanza di Sune che possono essere ottenute tramite la semplice
        partecipazione attiva al portale.
      </p>
      <p>
        Ogni nuovo iscritto che entra in Swappiamo dal 15/5/2024 riceve un Bonus di iscrizione di 20
        Sune che può utilizzare da subito per effettuare i suoi acquisti. Dato che vogliamo che la
        nostra Community cresca, un membro guadagna 10Sune ogni volta che invita un amico che si
        registra con successo in Swappiamo.
      </p>
      <p>
        I nostri membri sono premiati con un bonus di 50 Sune per il primo annuncio pubblicato nel
        Marketplace e ulteriori 5 Sune per ogni recensione lasciata. L’impegno prestato e
        l’ispirazione che i nostri membri danno agli altri sono molto importanti e per questo
        vengono premiati! Desideriamo avere membri disposti a mettersi in gioco e che possano
        ispirare altri a offrire beni e servizi nella Comunità.
      </p>
      <p>
        Inoltre esiste un bonus di 50 Sune per gli utenti che ricevono 5 recensioni a 5 stelle
        consecutive. In questo modo vogliamo premiare gli utenti che più contribuiscono a costruire
        una Comunità rispettabile e basata sulla fiducia reciproca.
      </p>
      <p>
        Le Sune infine possono essere acquistate attraverso delle ricariche annuali, vedi per
        maggiori dettagli la <NamedLink name="SunePurchasePage">pagina Ricariche</NamedLink>.
      </p>
    </div>
  );
};

WhatAreSune.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

WhatAreSune.propTypes = {
  rootClassName: string,
  className: string,
};

export default WhatAreSune;
