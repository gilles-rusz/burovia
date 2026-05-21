import { Truck, ShieldCheck, MapPin } from 'lucide-react';

function TrustSection() {
  const items = [
    {
      icon: <Truck size={24} />,
      title: 'Livraison suivie',
      description: 'Expédition avec suivi inclus vers la France, la Belgique et le Luxembourg.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Paiement 100% sécurisé',
      description: 'Vos transactions sont protégées par Stripe, leader mondial du paiement en ligne.'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Boutique française',
      description: 'Une marque créée en France par Web RG Est, spécialiste du digital.'
    }
  ];

  return (
    <section className="trust-section">
      {items.map((item) => (
        <div className="trust-card" key={item.title}>
          <div className="trust-icon">{item.icon}</div>
          <strong>{item.title}</strong>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default TrustSection;
