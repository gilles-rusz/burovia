import { useState } from 'react';

function ProductCard({ product, onAddToCart, formatPrice }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = product.image_url && !imageError;

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
        </p>

        <h3>{product.name}</h3>

        <p>{product.short_description}</p>

        <p className="delivery">
          {product.delivery_estimate}
        </p>

        <div className="product-bottom">
          <strong>{formatPrice(product.price_cents)}</strong>

          <button onClick={() => onAddToCart(product)}>
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;