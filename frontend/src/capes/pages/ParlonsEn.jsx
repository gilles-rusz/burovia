import { useState } from 'react';
import { Bulle, Gilles, Recitatif } from '../Bulle';

const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:5000' : '');

const PROFILS = [
  "J'ai une stomie",
  "J'ai la maladie de Crohn",
  'Les deux',
  'Je vais être opéré(e)',
  'Je suis un proche',
  'Je suis soignant(e)',
  'Je suis juste curieux(se)',
];

const TYPES = [
  { valeur: 'question', label: 'Poser une question' },
  { valeur: 'temoignage', label: 'Laisser un témoignage' },
  { valeur: 'avis', label: 'Donner mon avis sur le site' },
];

export default function ParlonsEn() {
  const [etat, setEtat] = useState('pret');
  const [erreur, setErreur] = useState('');

  const envoyer = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const donnees = Object.fromEntries(new FormData(form));
    donnees.publication = form.publication.checked;
    setEtat('envoi');
    setErreur('');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donnees),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "L'envoi n'a pas marché.");
      setEtat('envoye');
      form.reset();
    } catch (e) {
      setErreur(e.message);
      setEtat('pret');
    }
  };

  return (
    <section className="bande">
      <div className="case case--trame case--duo">
        <Gilles pose="question" />
        <Bulle cote="gauche">
          <h1>Parlons-en !</h1>
          <p>
            Une question que tu n'oses pas poser à ton médecin ? Un témoignage qui pourrait rassurer quelqu'un ?
            Un avis sur le site ? Je lis tout et je réponds.
          </p>
        </Bulle>
      </div>

      {etat === 'envoye' ? (
        <div className="case case--texte case--merci" role="status">
          <span className="onomatopee" aria-hidden="true">Merci !</span>
          <h2>Ton message est bien arrivé</h2>
          <p>Je te réponds dès que possible, par mail. Prends soin de toi !</p>
          <button className="bouton" onClick={() => setEtat('pret')}>Écrire un autre message</button>
        </div>
      ) : (
        <form className="case case--texte formulaire" onSubmit={envoyer}>
          <fieldset className="formulaire__types">
            <legend>Je veux...</legend>
            {TYPES.map((t, i) => (
              <label key={t.valeur} className="choix">
                <input type="radio" name="type" value={t.valeur} defaultChecked={i === 0} />
                <span>{t.label}</span>
              </label>
            ))}
          </fieldset>

          <div className="formulaire__ligne">
            <label>
              Ton prénom ou pseudo
              <input name="nom" required maxLength={60} autoComplete="given-name" />
            </label>
            <label>
              Ton e-mail, pour te répondre
              <input name="email" type="email" required maxLength={120} autoComplete="email" />
            </label>
          </div>

          <label>
            Tu es plutôt...
            <select name="profil" defaultValue="">
              <option value="" disabled>Choisis si tu veux</option>
              {PROFILS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>

          <label>
            Ton message
            <textarea name="message" required minLength={10} maxLength={4000} rows={7} />
          </label>

          <label className="choix choix--case">
            <input type="checkbox" name="publication" />
            <span>J'accepte que mon témoignage soit publié sur le site, avec mon prénom seulement.</span>
          </label>

          <input className="pot-de-miel" name="site" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {erreur && <p className="formulaire__erreur" role="alert">{erreur}</p>}

          <button className="bouton" type="submit" disabled={etat === 'envoi'}>
            {etat === 'envoi' ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      )}

      <Recitatif>
        Je ne suis pas médecin : je partage mon expérience. Pour une urgence, appelle ton médecin ou le 15.
      </Recitatif>
    </section>
  );
}
