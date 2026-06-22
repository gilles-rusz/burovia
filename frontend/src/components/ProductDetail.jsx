import { useState, useMemo } from 'react';

function getGalleryUrls(mainUrl) {
  if (!mainUrl) return [];
  const dot = mainUrl.lastIndexOf('.');
  if (dot === -1) return [mainUrl];
  const base = mainUrl.substring(0, dot);
  const ext = mainUrl.substring(dot);
  return [mainUrl, `${base}-2${ext}`, `${base}-3${ext}`];
}

function ProductDetail({ product, onBack, onAddToCart, formatPrice }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState(new Set());

  const allImages = useMemo(() => {
    if (product.images && product.images.length > 1) {
      return product.images.map((img) => img.url);
    }
    return getGalleryUrls(product.image_url);
  }, [product]);

  const visibleImages = allImages.filter((url) => !failedUrls.has(url));

  const currentUrl = visibleImages[activeIndex] || visibleImages[0];

  const handleImageError = (url) => {
    setFailedUrls((prev) => new Set([...prev, url]));
    if (activeIndex >= visibleImages.length - 1) {
      setActiveIndex(0);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onBack();
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <button className="detail-back-btn" onClick={onBack}>
          &larr; Retour au catalogue
        </button>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrap">
            {currentUrl ? (
              <img
                className="product-detail-image"
                src={currentUrl}
                alt={product.image_alt || product.name}
                onError={() => handleImageError(currentUrl)}
              />
            ) : (
              <div className="product-detail-placeholder">
                {product.category_name || 'Burovia'}
              </div>
            )}

            {visibleImages.length > 1 && (
              <div className="product-gallery-thumbs">
                {visibleImages.map((url, idx) => (
                  <button
                    key={url}
                    className={`gallery-thumb${idx === activeIndex ? ' active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <img
                      src={url}
                      alt={`${product.name} — vue ${idx + 1}`}
                      onError={() => handleImageError(url)}
                    />
                  </button>
                ))}
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
                <span>&#x1F69A;</span>
                <span>
                  {product.delivery_estimate} &middot; Livraison FR &middot; BE &middot; LU
                </span>
              </div>
              <div className="product-detail-meta-row">
                <span>&#x1F512;</span>
                <span>Paiement 100% s&eacute;curis&eacute; via Stripe</span>
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
