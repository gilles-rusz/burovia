function TrustSection() {
  return (
    <div className="trust-section-wrapper animate-on-scroll">
      <section className="trust-section">
        <div className="trust-card">
          <span className="trust-icon">📦</span>
          <strong>Livraison suivie</strong>
          <p>Suivi disponible après expédition depuis nos entrepôts partenaires en France, Belgique et Luxembourg.</p>
        </div>

        <div className="trust-card">
          <span className="trust-icon">🔒</span>
          <strong>Paiement sécurisé</strong>
          <p>Paiement 100 % sécurisé via Stripe, leader mondial du paiement en ligne. Vos données bancaires ne nous parviennent jamais.</p>
        </div>

        <div className="trust-card">
          <span className="trust-icon">🇫🇷</span>
          <strong>Boutique française</strong>
          <p>Une boutique créée par Web RG Est, pensée pour les télétravailleurs francophones exigeants.</p>
        </div>
      </section>
    </div>
  );
}

export default TrustSection;
