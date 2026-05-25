import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProductsByCategory } from '../services/productService';

function CategoryPage({
  categorySlug,
  categoryName,
  categoryDescription,
  heroImage,
  onBack,
  onAddToCart,
  onViewDetail,
  formatPrice
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    getProductsByCategory(categorySlug)
      .then(setProducts)
      .catch(() => setError('Impossible de charger les produits.'))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  return (
    <div className="category-page">
      <div
        className="category-hero"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="category-hero-overlay" />
        <div className="category-hero-content">
          <button className="category-back-btn" onClick={onBack}>
            ← Retour à la boutique
          </button>
          <h1>{categoryName}</h1>
          <p>{categoryDescription}</p>
        </div>
      </div>

      <div className="category-content">
        {loading && <p className="status-message">Chargement des produits...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="category-empty">
            <span className="category-empty-icon">🛍️</span>
            <h2>Nouveaux produits bientôt disponibles !</h2>
            <p>
              Nous préparons une sélection soigneuse pour cette catégorie.
              Revenez bientôt pour découvrir nos nouveautés.
            </p>
            <button className="cta-button" onClick={onBack}
              style={{ border: 'none', cursor: 'pointer' }}>
              Voir tout le catalogue
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetail={onViewDetail}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
