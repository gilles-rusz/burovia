function SuccessPage({ onBackToShop }) {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon" aria-hidden="true" />

        <h1>Merci pour votre commande&nbsp;!</h1>

        <p>
          Votre paiement a bien été reçu. Vous recevrez une confirmation par
          e-mail avec les détails de votre commande.
        </p>

        <div className="success-details">
          <div className="success-detail-row">
            <span className="success-detail-label">Livraison estimée</span>
            <span>5 à 10 jours ouvrés</span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Zones desservies</span>
            <span>France · Belgique · Luxembourg</span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Paiement</span>
            <span>Confirmé via Stripe</span>
          </div>
        </div>

        <button className="success-back-btn" onClick={onBackToShop}>
          ← Retour à la boutique
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
