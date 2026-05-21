import { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import TrustSection from './components/TrustSection';
import { createCheckoutSession } from './services/checkoutService';

import { getProducts } from './services/productService';

function App() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('burovia_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const isSuccessPage = window.location.pathname === '/success';

    if (isSuccessPage && sessionId) {
      localStorage.removeItem('burovia_cart');
      setCart([]);
      setPaymentSuccess(true);

      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFromApi = await getProducts();
        setProducts(productsFromApi);
      } catch (error) {
        console.error('Erreur récupération produits :', error);
        setErrorMessage('Impossible de récupérer les produits depuis le backend.');
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
          <div className="success-message">
            Paiement confirmé. Merci pour votre commande Burovia.
          </div>
        )}
        <section className="hero-section">
          <p className="hero-label">Accessoires de télétravail</p>

          <h1>Le confort du bureau, directement chez vous.</h1>

          <p>
            Burovia sélectionne des accessoires simples, pratiques et utiles
            pour améliorer votre confort, votre posture et votre organisation
            en télétravail.
          </p>

          <a href="#catalogue" className="cta-button">
            Découvrir les essentiels
          </a>
        </section>

        <section id="foot-2026" className="promo-section">
          <span className="promo-badge">Collection saisonnière</span>

          <h2>L’ambiance foot s’invite à votre bureau</h2>

          <p>
            Préparez votre espace de travail pour les grands matchs avec une
            sélection d’accessoires déco, tapis de bureau, mugs et petits objets
            inspirés de l’univers football.
          </p>
        </section>

        <section id="catalogue" className="products-section">
          <h2>Nos essentiels télétravail</h2>

          {loading && (
            <p className="status-message">Chargement des produits...</p>
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
      </main>
    </>
  );
}

export default App;