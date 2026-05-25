import { useState } from 'react';

function ProductCard({ product, onAddToCart, onViewDetail, formatPrice }) {
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  const hasImage = product.image_url && !imageError;
  const unavailable = product.is_active === false;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      {hasImage ? (
        <img
          className="product-image"
          src={product.image_url}
          alt={product.image_alt || product.name}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="product-image-placeholder">
          {product.category_name || 'Burovia'}
        </div>
      )}

      <div className="product-content">
        <p className="product-category">
          {product.category_name || 'Accessoire'}
          {unavailable && <span className="badge-unavailable">Indisponible</span>}
        </p>

        <h3>{product.name}</h3>

        <p>{product.short_description}</p>

        <p className="delivery">{product.delivery_estimate}</p>

        <div className="product-bottom">
          <strong>{formatPrice(product.price_cents)}</strong>

          <button
            className={added ? 'added' : ''}
            onClick={handleAdd}
            disabled={unavailable}
          >
            {added ? '✓ Ajouté' : 'Ajouter'}
          </button>
        </div>

        <button className="view-detail-btn" onClick={() => onViewDetail(product)}>
          Voir le détail
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
