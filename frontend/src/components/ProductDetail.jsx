import { useState } from 'react';

function ProductDetail({ product, onBack, onAddToCart, formatPrice }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = product.image_url && !imageError;

  const handleAddToCart = () => {
    onAddToCart(product);
    onBack();
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <button className="detail-back-btn" onClick={onBack}>
          ← Retour au catalogue
        </button>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrap">
            {hasImage ? (
              <img
                className="product-detail-image"
                src={product.image_url}
                alt={product.image_alt || product.name}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="product-detail-placeholder">
                {product.category_name || 'Burovia'}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <span className="product-detail-category">
              {product.category_name || 'Accessoire'}
            </span>

            <h1 className="product-detail-name">{product.name}</h1>

            <p className="product-detail-price">
              {formatPrice(product.price_cents)}
            </p>

            <p className="product-detail-description">
              {product.short_description}
            </p>

            <div className="product-detail-meta">
              <div className="product-detail-meta-row">
                <span>🚚</span>
                <span>
                  {product.delivery_estimate} · Livraison FR · BE · LU
                </span>
              </div>
              <div className="product-detail-meta-row">
                <span>🔒</span>
                <span>Paiement 100% sécurisé via Stripe</span>
              </div>
            </div>

            <button className="detail-add-btn" onClick={handleAddToCart}>
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
