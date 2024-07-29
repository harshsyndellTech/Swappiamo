import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import css from "./ContactUs.module.css"
import { ExternalLink } from "../../components"

const ContactUs = (props) => {
  const { rootClassName, className } = props
  const classes = classNames(rootClassName || css.root, className)

  return (
    <div className={classes}>

<p className={css.subHeading}> LE RECENSIONI </p>

  <p> COSA SONO LE RECENSIONI</p>
<p>Le recensioni sono le valutazioni che gli acquirenti e i venditori si danno a seguito di una 
  transazione su Swappiamo. Sono molto importanti perche' permettono a tutti di conoscere gli utenti</p>
    
<p>Dopo aver concluso una transazione, all'interno della chat, sarà possibile lasciare una 
recensione all'altro utente con cui hai concluso la transazione.
    Per lasciare una recensione non dovrai far altro che cliccare sul pulsante ‘lascia una 
  recensione’ all'interno della chat che stavi utilizzando per parlare con l'utente.</p>

<p>La valutazione può essere data sotto forma di stelle (da 1 a 5) ed e’ possibile lasciare 
    anche un commento finale.</p>

<p>Guadagnerai 5 Sune per ogni recensione lasciata e 50Sune se otterrai 5 recensioni a 5 
stelle consecutivamente.</p>
  
<p>Ricordati che potrai lasciare una sola recensione per ogni transazione.
     Hai a disposizione  14 giorni di tempo per lasciare la tua recensione. E' importante 
ricordarsi che, nel caso in cui uno o nessuno dei due utenti lasci una recensione entro il 
  tempo a disposizione, non sara’ piu’ possibile lasciare la recensione.</p>

    <p>Quando avrai lasciato la tua recensione, questa sarà visibile non appena anche l’altro 
utente avrà lasciato la sua oppure dopo 14 giorni nel caso in cui l’altro utente non la 
lasci.</p>

<p> Ti invieremo una email per ricordarti di lasciare la tua recensione.
  Riceverai una email anche quando l’utente ti avrà lasciato la sua recensione.</p>
  
<p>Visualizzerai nel tuo profilo le recensioni ricevute che saranno visibili a tutti gli utenti.
  Per qualsiasi altra informazione relativa alle recensioni ti invitiamo a consultare i nostri termini 
  di servizio. Puoi contattarci su WhatsApp 
  al 320/2406828 o scriverci a questo indirizzo email{" "}
        <ExternalLink href="mailto:info@swappiamo.it">
          info@swappiamo.it 
        </ExternalLink>
    per ulteriori informazioni  </p>
    </div>
  )
}

ContactUs.defaultProps = {
  rootClassName: null,
  className: null,
}

const { string } = PropTypes

ContactUs.propTypes = {
  rootClassName: string,
  className: string,
}

export default ContactUs
