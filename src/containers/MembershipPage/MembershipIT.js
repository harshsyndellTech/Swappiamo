import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Membership.module.css';

const Membership = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <p>
        Si possono facilmente ottenere più Sune acquistandole. </p>
         <p> Ci sono due possibilita' di acquisto
           
            con Eur 9,90 si possono acquistare 20Sune e con 19.90Eur si possono acquistare 50Sune.        
      </p>
      <p>
        L'acquisto delle Sune puo' essere fatto solo una volta l'anno, e non puo' essere ripetuto piu' volte
       durante l'anno. Questo per evitare comportamenti speculativi e che non sono in linea con la nostra Mission.
      </p>

      <p>
       In Swappiamo e' facilissimo ottenere le Sune, infatti e' sufficiente essere partecipi, pubblicare annunci,
       invitare gli amici, ottenere recensioni a cinque stelle, etc
      </p>
      <p>
        L'acquisto di Sune e' una opportunita' per i membri della nostra Community che non hanno Sune sufficienti per
      acquistare un bene o un servizio ma che non hanno tempo di partecipare attivamente. Hanno quindi urgenza di ricaricare
      il loro Saldo in Sune e con l'acquisto le ottengono immediatamente.
          </p>
      <p>        
        Di Sune ce n'e' in abbondanza per tutti, ma se hai bisogno di piu' Sune per acquistare qualcosa che ti piace o che ti 
     occorre puoi comprarle, ma ricorda solo una volta l'anno!
         </p>
    </div>
  );
};

Membership.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

Membership.propTypes = {
  rootClassName: string,
  className: string,
};

export default Membership;
