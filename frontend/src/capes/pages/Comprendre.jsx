import { Link } from 'react-router-dom';
import { EPISODES } from '../episodes';
import { Bulle, Gilles, Recitatif } from '../Bulle';

export default function Comprendre() {
  return (
    <section className="bande">
      <div className="case case--trame case--duo">
        <Gilles pose="montre" />
        <Bulle cote="gauche">
          <h1>Comprendre, sans prise de tête</h1>
          <p>Crohn, stomie, poches, complications... Je t'explique tout ça en cinq épisodes. Choisis le tien !</p>
        </Bulle>
      </div>
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
      <Recitatif>
        Ces pages sont écrites pour comprendre, pas pour se soigner seul. Pour ta situation à toi, ton médecin
        et ton stomathérapeute restent les mieux placés.
      </Recitatif>
    </section>
  );
}
