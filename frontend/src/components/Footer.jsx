function Footer() {
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
              <li><a href="#livraison">Livraison & Retours</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Légal</h4>
            <ul>
              <li><a href="#mentions-legales">Mentions légales</a></li>
              <li><a href="#cgv">CGV</a></li>
              <li><a href="#confidentialite">Confidentialité</a></li>
              <li><a href="#retractation">Droit de rétractation</a></li>
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
