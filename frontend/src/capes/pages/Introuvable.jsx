import { Link } from 'react-router-dom';
import { Bulle, Gilles } from '../Bulle';

export default function Introuvable() {
  return (
    <section className="bande">
      <div className="case case--trame case--duo">
        <Gilles pose="question" />
        <Bulle cote="gauche">
          <h1>Oups, cette page s'est envolée !</h1>
          <p>
            Même avec une cape, on ne la retrouve pas. <Link to="/">Retour à l'accueil</Link>
          </p>
        </Bulle>
      </div>
    </section>
  );
}
