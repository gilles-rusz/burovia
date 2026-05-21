function Header({ cartCount }) {
  return (
    <header className="main-header">
      <div className="logo">Burovia</div>

      <nav className="main-nav">
        <a href="#catalogue">Catalogue</a>
        <a href="#confort">Confort</a>
        <a href="#organisation">Organisation</a>
        <a href="#foot-2026">Foot 2026</a>
      </nav>

      <a href="#panier" className="cart-button">
        Panier ({cartCount})
      </a>
    </header>
  );
}

export default Header;