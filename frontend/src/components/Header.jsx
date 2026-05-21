import { ShoppingBag, Menu } from 'lucide-react';

function Header({ cartCount }) {
  return (
    <header className="main-header">
      <div className="header-inner">
        <a href="/" className="logo">
          Buro<span className="logo-accent">via</span>
        </a>

        <nav className="main-nav">
          <a href="#catalogue">Catalogue</a>
          <a href="#confort">Confort</a>
          <a href="#organisation">Organisation</a>
          <a href="#foot-2026">Foot 2026</a>
        </nav>

        <div className="header-actions">
          <a href="#panier" className="cart-button">
            <ShoppingBag size={18} />
            Panier
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </a>

          <button className="mobile-menu-btn" aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
