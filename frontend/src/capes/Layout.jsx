import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const LIENS = [
  { to: '/comprendre', label: 'Comprendre' },
  { to: '/journal', label: 'Le journal' },
  { to: '/parlons-en', label: 'Parlons-en' },
  { to: '/soutenir', label: 'Soutenir' },
];

export default function Layout() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="planche">
      <a className="saut" href="#contenu">Aller au contenu</a>
      <header className="entete">
        <Link to="/" className="logo" aria-label="Les Capés du Bide, accueil">
          <span className="logo__les">Les</span>
          <span className="logo__capes">Capés</span>
          <span className="logo__bide">du Bide</span>
        </Link>
        <button
          className="burger"
          aria-expanded={menuOuvert}
          aria-controls="menu"
          onClick={() => setMenuOuvert((o) => !o)}
        >
          {menuOuvert ? 'Fermer' : 'Menu'}
        </button>
        <nav id="menu" className={`menu ${menuOuvert ? 'menu--ouvert' : ''}`}
          aria-label="Navigation principale"
          onClick={() => setMenuOuvert(false)}
        >
          {LIENS.map((l) => (
            <NavLink key={l.to} to={l.to} className="menu__lien">
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main id="contenu">
        <Outlet />
      </main>

      <footer className="pied">
        <p className="pied__fin">À suivre...</p>
        <p>
          Les Capés du Bide, un groupe d'entraide pour les stomisés et leurs proches.
          Les infos de ce site ne remplacent pas l'avis de ton médecin ou de ton stomathérapeute.
        </p>
        <nav className="pied__liens" aria-label="Liens de bas de page">
          <Link to="/parlons-en">Nous écrire</Link>
          <Link to="/soutenir">Soutenir le projet</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
        </nav>
      </footer>
    </div>
  );
}
