import { Link } from 'react-router-dom';
import { Bulle, Gilles, Recitatif } from '../Bulle';

export default function Journal() {
  return (
    <section className="bande">
      <div className="case case--trame case--duo">
        <Gilles pose="salut" />
        <Bulle cote="gauche">
          <h1>Le journal de bord</h1>
          <p>
            Ici, je raconterai mon quotidien de capé : les rendez-vous, les petites victoires, les ratés aussi,
            et les astuces que je découvre en route.
          </p>
        </Bulle>
      </div>
      <div className="case case--texte case--attente">
        <span className="onomatopee" aria-hidden="true">Bientôt !</span>
        <h2>Les premiers articles sont en préparation</h2>
        <p>
          En attendant, tu peux commencer par les épisodes <Link to="/comprendre">Comprendre</Link>, ou me
          dire de quoi tu aimerais que je parle sur la page <Link to="/parlons-en">Parlons-en</Link>.
        </p>
      </div>
      <Recitatif>Un sujet t'intéresse ? Ta question deviendra peut-être le prochain article.</Recitatif>
    </section>
  );
}
