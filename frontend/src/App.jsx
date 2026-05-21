import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import './App.css';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import { createCheckoutSession } from './services/checkoutService';
import { getProducts } from './services/productService';

function App() {
  const [products, setProducts] = useState([]);

  const isReturningFromPayment = () => {
    const params = new URLSearchParams(window.location.search);
    return window.location.pathname === '/success' && params.get('session_id');
  };

  const [cart, setCart] = useState(() => {
    if (isReturningFromPayment()) {
      localStorage.removeItem('burovia_cart');
      return [];
    }
    const savedCart = localStorage.getItem('burovia_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess] = useState(isReturningFromPayment);

  useEffect(() => {
    if (paymentSuccess) {
      window.history.replaceState({}, document.title, '/');
    }
  }, [paymentSuccess]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFromApi = await getProducts();
        setProducts(productsFromApi);
      } catch (error) {
        console.error('Erreur récupération produits :', error);
        setErrorMessage('Impossible de récupérer les produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('burovia_cart', JSON.stringify(cart));
  }, [cart]);

  const formatPrice = (priceCents) => {
    return (priceCents / 100).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    });
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async () => {
    try {
      if (cart.length === 0) {
        alert('Votre panier est vide.');
        return;
      }

      const session = await createCheckoutSession(cart);

      if (session.url) {
        window.location.href = session.url;
        return;
      }

      alert('Session Stripe créée, mais aucune URL de paiement reçue.');
    } catch (error) {
      console.error('Erreur paiement Stripe :', error);
      alert(error.message || 'Erreur lors du paiement.');
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price_cents * item.quantity,
    0
  );

  return (
    <>
      <Header cartCount={cartCount} />

      <main>
        {paymentSuccess && (
          <div className="success-banner">
            <CheckCircle size={22} />
            Paiement confirmé — Merci pour votre commande Burovia !
          </div>
        )}

        <section className="hero-section">
          <p className="hero-label">
            <Sparkles size={16} />
            Accessoires de télétravail
          </p>

          <h1>
            Le confort du bureau,{' '}
            <span>directement chez vous.</span>
          </h1>

          <p className="hero-description">
            Burovia sélectionne des accessoires simples, pratiques et utiles
            pour améliorer votre confort, votre posture et votre organisation
            en télétravail.
          </p>

          <div className="hero-actions">
            <a href="#catalogue" className="cta-button">
              Découvrir les essentiels
              <ArrowRight size={18} />
            </a>
            <a href="#panier" className="cta-button-outline">
              Voir le panier ({cartCount})
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>FR · BE · LU</strong>
              <span>Livraison suivie</span>
            </div>
            <div className="hero-stat">
              <strong>Stripe</strong>
              <span>Paiement sécurisé</span>
            </div>
            <div className="hero-stat">
              <strong>5–10 jours</strong>
              <span>Délai de livraison</span>
            </div>
          </div>
        </section>

        <section id="foot-2026" className="promo-section">
          <span className="promo-badge">
            Collection saisonnière
          </span>

          <h2>L&apos;ambiance foot s&apos;invite à votre bureau</h2>

          <p>
            Préparez votre espace de travail pour les grands matchs avec une
            sélection d&apos;accessoires déco, tapis de bureau, mugs et petits objets
            inspirés de l&apos;univers football.
          </p>
        </section>

        <section id="catalogue" className="products-section">
          <div className="section-header">
            <div>
              <h2>Nos essentiels télétravail</h2>
              <p className="section-subtitle">
                Des accessoires sélectionnés pour votre bien-être au quotidien.
              </p>
            </div>
          </div>

          {loading && (
            <div className="loading-spinner" />
          )}

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          {!loading && !errorMessage && products.length === 0 && (
            <p className="status-message">
              Aucun produit disponible pour le moment.
            </p>
          )}

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </section>

        <Cart
          cart={cart}
          cartTotal={cartTotal}
          formatPrice={formatPrice}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
        />

        <TrustSection />

        <section className="newsletter-section">
          <h2>Restez informé des nouveautés</h2>
          <p>Recevez nos offres exclusives et les derniers produits en avant-première.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Votre adresse email"
              aria-label="Adresse email"
            />
            <button type="button">S&apos;inscrire</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
