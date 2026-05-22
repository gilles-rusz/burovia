function Footer({ onLegalPage }) {
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <span className="footer-logo">Burovia</span>
          <p className="footer-desc">
            Accessoires de télétravail simples et pratiques pour votre confort
            au quotidien. Livraison FR · BE · LU.
          </p>
        </div>

        <div className="footer-col">
          <h3>Boutique</h3>
          <ul>
            <li><a href="#catalogue">Catalogue</a></li>
            <li><a href="#catalogue">Confort &amp; Posture</a></li>
            <li><a href="#catalogue">Organisation</a></li>
            <li><a href="#foot-2026">Foot 2026</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Informations</h3>
          <ul>
            <li>
              <button onClick={() => onLegalPage('livraison')}>
                Livraison &amp; Retours
              </button>
            </li>
            <li>
              <button onClick={() => onLegalPage('contact')}>
                Contact
              </button>
            </li>
            <li>
              <button onClick={() => onLegalPage('contact')}>
                FAQ
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Légal</h3>
          <ul>
            <li>
              <button onClick={() => onLegalPage('mentions')}>
                Mentions légales
              </button>
            </li>
            <li>
              <button onClick={() => onLegalPage('cgv')}>
                Conditions Générales de Vente
              </button>
            </li>
            <li>
              <button onClick={() => onLegalPage('confidentialite')}>
                Confidentialité
              </button>
            </li>
            <li>
              <button onClick={() => onLegalPage('retractation')}>
                Droit de rétractation
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Burovia · Un projet Web RG Est
      </div>
    </footer>
  );
}

export default Footer;
