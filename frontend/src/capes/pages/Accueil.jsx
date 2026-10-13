import { Link } from 'react-router-dom';
import { EPISODES } from '../episodes';
import { Bulle, Gilles, Recitatif } from '../Bulle';

const PRINCIPES = [
  { mot: 'Partager', texte: 'nos expériences, les galères comme les victoires' },
  { mot: 'Demander', texte: 'tout ce qu\'on n\'ose pas demander ailleurs' },
  { mot: 'S\'entraider', texte: 'au quotidien, avec des astuces qui marchent' },
  { mot: 'Être soutenus', texte: 'sans jugement, avec humour et bienveillance' },
];

export default function Accueil() {
  return (
    <>
      <section className="une">
        <h1 className="visuellement-cache">Les Capés du Bide</h1>
        <div className="case case--une">
          <picture>
            <source media="(max-width: 700px)" srcSet="/capes/hero-768.webp" />
            <img
              src="/capes/hero.webp"
              alt="Gilles en super-héros à cape bleue, il soulève son t-shirt et montre fièrement sa poche de stomie. Titre : Les Capés du Bide."
              width="1536"
              height="1024"
            />
          </picture>
          <span className="onomatopee onomatopee--une" aria-hidden="true">Tadaaa !</span>
        </div>
        <Recitatif className="une__soustitre">
          Un groupe d'entraide pour les stomisés, les personnes atteintes de la maladie de Crohn, et leurs proches.
        </Recitatif>
      </section>

      <section className="bande bande--principes" aria-labelledby="principes">
        <h2 id="principes" className="titre-planche">Ici, on vient pour...</h2>
        <div className="cases cases--4">
          {PRINCIPES.map((p, i) => (
            <div key={p.mot} className={`case case--principe case--incline-${i % 2}`}>
              <strong>{p.mot}</strong>
              <span>{p.texte}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bande bande--gilles" aria-labelledby="salut">
        <div className="case case--trame case--duo">
          <Gilles pose="salut" />
          <div>
            <Bulle cote="gauche">
              <h2 id="salut">Salut, moi c'est Gilles !</h2>
              <p>
                J'ai une stomie. Au début, on se sent seul, on a mille questions et on n'ose pas toutes les poser.
                J'ai créé Les Capés du Bide pour en parler simplement, avec humour et sans tabou.
              </p>
              <p>Ici, ta poche, c'est ta cape. Bienvenue dans l'équipe !</p>
            </Bulle>
          </div>
        </div>
      </section>

      <section className="bande" aria-labelledby="episodes">
        <h2 id="episodes" className="titre-planche">Par où commencer ?</h2>
        <Recitatif>Cinq épisodes courts, à lire dans l'ordre ou pas. Chacun aura bientôt sa vidéo.</Recitatif>
        <div className="cases cases--episodes">
          {EPISODES.map((e) => (
            <Link key={e.slug} to={`/comprendre/${e.slug}`} className="case case--episode">
              <span className="pastille">Épisode {e.numero}</span>
              <strong>{e.titre}</strong>
              <span>{e.resume}</span>
              <span className="case__suite">Lire la suite</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bande bande--fin" aria-label="Participer">
        <div className="cases cases--2">
          <Link to="/parlons-en" className="case case--appel case--bleu">
            <Gilles pose="question" alt="" />
            <div>
              <strong>Une question ? Un témoignage ?</strong>
              <span>Écris-nous, on te répond. Ton histoire peut aider quelqu'un.</span>
            </div>
          </Link>
          <Link to="/soutenir" className="case case--appel case--orange">
            <Gilles pose="coeur" alt="" />
            <div>
              <strong>Soutenir l'aventure</strong>
              <span>Dons et boutique solidaire, bientôt en ligne.</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
