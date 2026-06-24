import { useEffect, useState } from 'react';
import './App.css';

import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Cart from './components/Cart';
import TrustSection from './components/TrustSection';
import SuccessPage from './components/SuccessPage';
import LegalPage from './components/LegalPage';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import { createCheckoutSession } from './services/checkoutService';
import { getProducts } from './services/productService';

function App() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('burovia_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartError, setCartError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [legalPage, setLegalPage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

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
        if (error instanceof TypeError) {
          setBackendOffline(true);
        } else {
          setErrorMessage('Impossible de récupérer les produits depuis le backend.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('burovia_cart', JSON.stringify(cart));
  }, [cart]);

  /* Intersection Observer — anime les sections au scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [paymentSuccess, legalPage, selectedProduct, showAdmin, showLogin, showRegister, currentCategory, loading]);

  const formatPrice = (priceCents) =>
    (priceCents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity >= 10) return currentCart;
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) =>
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));

  const increaseQuantity = (productId) =>
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  const decreaseQuantity = (productId) =>
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clearCart = () => setCart([]);

  const handleCheckout = async () => {
    setCartError('');
    if (cart.length === 0) {
      setCartError('Votre panier est vide. Ajoutez des articles avant de commander.');
      return;
    }
    try {
      const session = await createCheckoutSession(cart);
      if (session.url) {
        window.location.href = session.url;
        return;
      }
      setCartError('Session Stripe créée, mais aucune URL de paiement reçue.');
    } catch (error) {
      console.error('Erreur paiement Stripe :', error);
      setCartError(error.message || 'Erreur lors du paiement. Veuillez réessayer.');
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price_cents * item.quantity, 0);

  const resetViews = () => {
    setSelectedProduct(null);
    setShowAdmin(false);
    setShowLogin(false);
    setShowRegister(false);
    setLegalPage(null);
    setCurrentCategory(null);
    setPaymentSuccess(false);
  };

  const openLegalPage = (page) => {
    resetViews();
    setLegalPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (cat) => {
    resetViews();
    setCurrentCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    resetViews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sharedHeader = (count = cartCount) => (
    <Header
      cartCount={count}
      onShowLogin={() => setShowLogin(true)}
      onShowAdmin={() => setShowAdmin(true)}
      onShowCategory={openCategory}
      onGoHome={goHome}
    />
  );

  const sharedFooter = (
    <Footer onLegalPage={openLegalPage} />
  );

  const renderMain = () => {
    if (paymentSuccess) {
      return <SuccessPage onBackToShop={() => setPaymentSuccess(false)} />;
    }
    if (legalPage) {
      return <LegalPage page={legalPage} onBack={() => setLegalPage(null)} />;
    }
    if (selectedProduct) {
      return (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
        />
      );
    }
    if (showAdmin) {
      return <AdminPage onBack={() => setShowAdmin(false)} />;
    }
    if (showLogin) {
      return (
        <LoginPage
          onBack={() => setShowLogin(false)}
          onGoToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      );
    }
    if (showRegister) {
      return (
        <RegisterPage
          onBack={() => setShowRegister(false)}
          onGoToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      );
    }
    if (currentCategory) {
      return (
        <CategoryPage
          categorySlug={currentCategory.slug}
          categoryName={currentCategory.name}
          categoryDescription={currentCategory.description}
          heroImage={currentCategory.heroImage}
          onBack={() => setCurrentCategory(null)}
          onAddToCart={addToCart}
          onViewDetail={setSelectedProduct}
          formatPrice={formatPrice}
        />
      );
    }

    return (
      <>
        <section className="hero-section animate-on-scroll">
          <div className="hero-content">
            <p className="hero-label">Accessoires de télétravail</p>
            <h1>Le confort du bureau, directement chez vous.</h1>
            <p className="hero-desc">
              Burovia sélectionne des accessoires simples, pratiques et utiles
              pour améliorer votre confort, votre posture et votre organisation
              en télétravail.
            </p>
            <div className="hero-cta-group">
              <a href="#catalogue" className="cta-button">
                Découvrir les essentiels
              </a>
              <a href="#panier" className="cta-button-outline">
                Voir le panier
              </a>
            </div>
            <div className="hero-stats">
              <span>🌍 Livraison FR · BE · LU</span>
              <span>🔒 Paiement Stripe sécurisé</span>
              <span>📦 Livraison suivie</span>
            </div>
          </div>
        </section>

        <section id="special-ete" className="promo-section animate-on-scroll">
          <div className="promo-section-inner">
            <span
              className="promo-badge"
              onClick={() => openCategory({ slug: 'special-ete', name: 'Spécial Été' })}
              style={{ cursor: 'pointer' }}
            >
              SPÉCIAL ÉTÉ
            </span>
            <h2>L'été arrive — l'ambiance s'invite à votre bureau</h2>
            <p>
              Soleil, chaleur, grands espaces... Burovia sélectionne des accessoires
              pour profiter pleinement de la saison : batteries solaires, ventilateurs
              de bureau et indispensables du télétravail estival.
            </p>
          </div>
        </section>

        <span id="confort" style={{ display: 'block', height: 0 }} />
        <span id="organisation" style={{ display: 'block', height: 0 }} />
        <section id="catalogue" className="products-section animate-on-scroll">
          <div className="products-section-inner">
            <h2>Nos essentiels télétravail</h2>
            <p className="products-subtitle">Sélectionnés pour votre confort au quotidien</p>

            {loading && <p className="status-message">Chargement des produits...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!loading && !errorMessage && products.length === 0 && (
              <p className="status-message">Aucun produit disponible pour le moment.</p>
            )}

            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetail={setSelectedProduct}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>
        </section>

        <Cart
          cart={cart}
          cartTotal={cartTotal}
          cartError={cartError}
          formatPrice={formatPrice}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
        />

        <TrustSection />

        <section className="newsletter-section animate-on-scroll">
          <h2>Restez dans la boucle</h2>
          <p>Nouveautés, offres exclusives et conseils télétravail directement dans votre boîte mail.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="votre@email.fr"
              aria-label="Adresse email"
            />
            <button type="submit" className="newsletter-btn">S'inscrire</button>
          </form>
        </section>
      </>
    );
  };

  return (
    <AuthProvider>
      <>
        {sharedHeader(paymentSuccess ? 0 : cartCount)}
        {backendOffline && (
          <div className="error-banner">
            Le service est temporairement indisponible. Veuillez réessayer dans quelques instants.
          </div>
        )}
        <main>{renderMain()}</main>
        {sharedFooter}
      </>
    </AuthProvider>
  );
}

export default App;
