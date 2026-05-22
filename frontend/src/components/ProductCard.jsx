import { useState } from 'react';
import { ShoppingCart, Check, Truck } from 'lucide-react';

function ProductCard({ product, onAddToCart, formatPrice }) {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const hasImage = product.image_url && !imageError;

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        {hasImage ? (
          <img
            className="product-image"
            src={product.image_url}
            alt={product.image_alt || product.name}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-image-placeholder">
            {product.category_name || 'Burovia'}
          </div>
        )}
        {product.is_featured && (
          <span className="product-badge">Populaire</span>
        )}
      </div>

      <div className="product-content">
        <p className="product-category">
          {product.category_name || 'Accessoire'}
        </p>

        <h3>{product.name}</h3>

        <p className="product-desc">{product.short_description}</p>

        {product.delivery_estimate && (
          <p className="delivery">
            <Truck size={14} />
            {product.delivery_estimate}
          </p>
        )}

        <div className="product-bottom">
          <span className="product-price">
            {formatPrice(product.price_cents)}
          </span>

          <button
            className={`product-add-btn${justAdded ? ' added' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                Ajouté
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
