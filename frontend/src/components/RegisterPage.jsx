import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function RegisterPage({ onBack, onGoToLogin }) {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, firstName, lastName);
      onBack();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="detail-back-btn" onClick={onBack}>
          ← Retour à la boutique
        </button>

        <h1 className="auth-title">Créer un compte</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div>
              <label className="auth-label" htmlFor="reg-firstname">Prénom</label>
              <input
                id="reg-firstname"
                className="auth-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jean"
                autoFocus
              />
            </div>
            <div>
              <label className="auth-label" htmlFor="reg-lastname">Nom</label>
              <input
                id="reg-lastname"
                className="auth-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Dupont"
              />
            </div>
          </div>

          <label className="auth-label" htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.fr"
            required
          />

          <label className="auth-label" htmlFor="reg-password">Mot de passe</label>
          <input
            id="reg-password"
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8 caractères minimum"
            required
          />

          <label className="auth-label" htmlFor="reg-confirm">Confirmer le mot de passe</label>
          <input
            id="reg-confirm"
            className="auth-input"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>

        <p className="auth-link">
          Déjà un compte ?{' '}
          <button onClick={onGoToLogin}>Se connecter</button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
