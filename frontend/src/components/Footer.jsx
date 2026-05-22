function Footer({ onLegalPage }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              Buro<span className="logo-accent">via</span>
            </div>
            <p>
              Des accessoires de télétravail sélectionnés pour améliorer
              votre confort, votre posture et votre productivité au quotidien.
            </p>
          </div>

          <div className="footer-col">
            <h4>Boutique</h4>
            <ul>
              <li><a href="#catalogue">Catalogue</a></li>
              <li><a href="#confort">Confort & Posture</a></li>
              <li><a href="#organisation">Organisation</a></li>
              <li><a href="#foot-2026">Foot 2026</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Informations</h4>
            <ul>
              <li>
                <button onClick={() => onLegalPage('livraison')}>
                  Livraison & Retours
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
            <h4>Légal</h4>
            <ul>
              <li>
                <button onClick={() => onLegalPage('mentions')}>
                  Mentions légales
                </button>
              </li>
              <li>
                <button onClick={() => onLegalPage('cgv')}>
                  CGV
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
          <span>&copy; {currentYear} Burovia. Tous droits réservés.</span>
          <span>
            Un projet <a href="https://www.webrgest.fr" target="_blank" rel="noopener noreferrer">Web RG Est</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
