import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Header({ cartCount, onShowLogin, onShowAdmin, onShowCategory, onGoHome }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const showCategory = (cat) => (e) => {
    e.preventDefault();
    onShowCategory(cat);
    setMenuOpen(false);
  };

  const handleGoHome = () => {
    onGoHome();
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="logo" style={{ cursor: 'pointer' }} onClick={handleGoHome}>
        <span className="logo-text">Burovia</span>
      </div>

      {/* Nav desktop */}
      <nav className="main-nav">
        <a href="/" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>Accueil</a>
        <a href="#confort" onClick={showCategory({ slug: 'confort-posture', name: 'Confort & Posture', description: 'Accessoires ergonomiques pour votre bien-être au bureau', heroImage: '/images/trust-bg.png' })}>Confort &amp; Posture</a>
        <a href="#organisation" onClick={showCategory({ slug: 'organisation-bureau', name: 'Organisation du bureau', description: 'Rangez, organisez, optimisez votre espace de travail', heroImage: '/images/catalogue-bg.png' })}>Organisation</a>
        <a href="#peripheriques" onClick={showCategory({ slug: 'peripheriques-accessoires', name: 'Périphériques & Accessoires', description: 'Claviers, webcams, souris et accessoires pour votre setup', heroImage: '/images/catalogue-bg.png' })}>Périphériques</a>
        <a href="#special-ete" onClick={showCategory({ slug: 'special-ete', name: 'Spécial Été', description: "L'été arrive — accessoires saisonniers pour votre bureau", heroImage: '/images/promo-bg.png' })}>Spécial Été</a>
      </nav>

      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <span className="header-username">{user.first_name || user.email}</span>
            {user.role === 'admin' && (
              <button className="header-admin-btn" onClick={onShowAdmin}>Admin</button>
            )}
            <button className="header-logout-btn" onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <button className="header-login-btn" onClick={onShowLogin}>Connexion</button>
        )}
        <a href="#panier" className="cart-button">Panier ({cartCount})</a>
      </div>

      {/* Burger button mobile */}
      <button
        className="burger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`burger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`burger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`burger-line ${menuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="/" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>Accueil</a>
          <a href="#confort" onClick={showCategory({ slug: 'confort-posture', name: 'Confort & Posture', description: 'Accessoires ergonomiques pour votre bien-être au bureau', heroImage: '/images/trust-bg.png' })}>Confort & Posture</a>
          <a href="#organisation" onClick={showCategory({ slug: 'organisation-bureau', name: 'Organisation du bureau', description: 'Rangez, organisez, optimisez votre espace de travail', heroImage: '/images/catalogue-bg.png' })}>Organisation</a>
          <a href="#peripheriques" onClick={showCategory({ slug: 'peripheriques-accessoires', name: 'Périphériques & Accessoires', description: 'Claviers, webcams, souris et accessoires pour votre setup', heroImage: '/images/catalogue-bg.png' })}>Périphériques</a>
          <a href="#special-ete" onClick={showCategory({ slug: 'special-ete', name: 'Spécial Été', description: "L'été arrive — accessoires saisonniers pour votre bureau", heroImage: '/images/promo-bg.png' })}>Spécial Été</a>
          <div className="mobile-menu-actions">
            {isAuthenticated ? (
              <>
                {user.role === 'admin' && (
                  <button className="header-admin-btn" onClick={() => { onShowAdmin(); setMenuOpen(false); }}>Admin</button>
                )}
                <button className="header-logout-btn" onClick={() => { logout(); setMenuOpen(false); }}>Déconnexion</button>
              </>
            ) : (
              <button className="header-login-btn" onClick={() => { onShowLogin(); setMenuOpen(false); }}>Connexion</button>
            )}
            <a href="#panier" className="cart-button" onClick={() => setMenuOpen(false)}>Panier ({cartCount})</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;