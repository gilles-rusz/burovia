import { useAuth } from '../context/AuthContext';

function Header({ cartCount, onShowLogin, onShowAdmin, onShowCategory, onGoHome }) {
  const { user, isAuthenticated, logout } = useAuth();

  const showCategory = (cat) => (e) => {
    e.preventDefault();
    onShowCategory(cat);
  };

  return (
    <header className="main-header">
      <div className="logo" style={{ cursor: 'pointer' }} onClick={onGoHome}>
        <span className="logo-text">Burovia</span>
      </div>

      <nav className="main-nav">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); onGoHome(); }}
        >
          Accueil
        </a>
        <a
          href="#confort"
          onClick={showCategory({
            slug: 'confort-posture',
            name: 'Confort & Posture',
            description: 'Accessoires ergonomiques pour votre bien-être au bureau',
            heroImage: '/images/trust-bg.png'
          })}
        >
          Confort &amp; Posture
        </a>
        <a
          href="#organisation"
          onClick={showCategory({
            slug: 'organisation-bureau',
            name: 'Organisation du bureau',
            description: 'Rangez, organisez, optimisez votre espace de travail',
            heroImage: '/images/catalogue-bg.png'
          })}
        >
          Organisation
        </a>
        <a
          href="#foot-2026"
          onClick={showCategory({
            slug: 'foot-2026',
            name: 'Été & Foot 2026',
            description: "L'été arrive — accessoires saisonniers pour votre bureau",
            heroImage: '/images/promo-bg.png'
          })}
        >
          Été &amp; Foot 2026
        </a>
      </nav>

      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <span className="header-username">{user.first_name || user.email}</span>
            {user.role === 'admin' && (
              <button className="header-admin-btn" onClick={onShowAdmin}>
                Admin
              </button>
            )}
            <button className="header-logout-btn" onClick={logout}>
              Déconnexion
            </button>
          </>
        ) : (
          <button className="header-login-btn" onClick={onShowLogin}>
            Connexion
          </button>
        )}
        <a href="#panier" className="cart-button">
          Panier ({cartCount})
        </a>
      </div>
    </header>
  );
}

export default Header;
