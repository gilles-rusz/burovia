import { Link } from 'react-router-dom';
import { Bulle, Gilles, Recitatif } from '../Bulle';

const IDEES = ['T-shirts et sweats', 'Tasses', 'Maillots de bain adaptés', 'Bandeaux et ceintures de maintien'];

export default function Soutenir() {
  return (
    <section className="bande">
      <div className="case case--trame case--duo">
        <Gilles pose="coeur" />
        <Bulle cote="gauche">
          <h1>Soutenir l'aventure</h1>
          <p>
            Le site est gratuit et le restera. Si tu veux nous donner un coup de main pour le faire grandir,
            voilà comment.
          </p>
        </Bulle>
      </div>

      <div className="cases cases--2">
        <div className="case case--texte" id="don">
          <span className="pastille">Faire un don</span>
          <h2>Un petit geste, un grand coup de cape</h2>
          <p>
            Les dons serviront à faire vivre le site, à tourner les vidéos et à lancer les premiers articles de la
            boutique solidaire.
          </p>
          <p className="bientot">Le paiement sécurisé arrive très bientôt.</p>
        </div>
        <div className="case case--texte" id="boutique">
          <span className="pastille">La boutique</span>
          <h2>Bientôt, des articles qui aident vraiment</h2>
          <ul>
            {IDEES.map((i) => <li key={i}>{i}</li>)}
          </ul>
          <p className="bientot">On cherche les bons produits, ouverture dès qu'ils sont prêts.</p>
        </div>
      </div>

      <Recitatif>
        Une idée de produit utile au quotidien ? <Link to="/parlons-en">Dis-le nous</Link>, c'est vous les
        mieux placés pour savoir ce qui manque.
      </Recitatif>
    </section>
  );
}
