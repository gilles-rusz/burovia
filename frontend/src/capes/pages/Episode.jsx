import { Link, useParams } from 'react-router-dom';
import { EPISODES, findEpisode } from '../episodes';
import { Bulle, Gilles, Recitatif } from '../Bulle';
import Introuvable from './Introuvable';

export default function Episode() {
  const { slug } = useParams();
  const episode = findEpisode(slug);
  if (!episode) return <Introuvable />;

  const index = EPISODES.indexOf(episode);
  const precedent = EPISODES[index - 1];
  const suivant = EPISODES[index + 1];

  return (
    <article className="bande episode">
      <Link to="/comprendre" className="retour">Tous les épisodes</Link>

      <header className="case case--trame case--duo">
        <Gilles pose="montre" />
        <div>
          <span className="pastille">Épisode {episode.numero}</span>
          <h1 className="titre-planche titre-planche--episode">{episode.titre}</h1>
          <Bulle cote="gauche">
            <p>{episode.bulle}</p>
          </Bulle>
        </div>
      </header>

      <div className="case case--video" role="note">
        <span className="onomatopee" aria-hidden="true">Clap !</span>
        <p>
          <strong>La vidéo arrive bientôt.</strong> Je vais t'expliquer cet épisode de vive voix, pour ceux qui
          préfèrent écouter plutôt que lire.
        </p>
      </div>

      <div className="cases cases--recit">
        {episode.sections.map((s) => (
          <section key={s.titre} className="case case--texte">
            <h2>{s.titre}</h2>
            {s.texte?.map((p) => <p key={p}>{p}</p>)}
            {s.liste && (
              <ul>
                {s.liste.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <Recitatif>
        Ces infos sont générales et ne remplacent pas l'avis de ton médecin. En cas de douleur forte, de fièvre
        ou de vomissements, on n'attend pas : on appelle son médecin, ou le 15.
      </Recitatif>

      <nav className="cases cases--2 suite-episodes" aria-label="Autres épisodes">
        {precedent ? (
          <Link to={`/comprendre/${precedent.slug}`} className="case case--nav">
            <span>Épisode précédent</span>
            <strong>{precedent.titre}</strong>
          </Link>
        ) : <span />}
        {suivant ? (
          <Link to={`/comprendre/${suivant.slug}`} className="case case--nav case--nav-suivant">
            <span>Épisode suivant</span>
            <strong>{suivant.titre}</strong>
          </Link>
        ) : (
          <Link to="/parlons-en" className="case case--nav case--nav-suivant">
            <span>Et maintenant ?</span>
            <strong>Pose-nous tes questions</strong>
          </Link>
        )}
      </nav>
    </article>
  );
}
