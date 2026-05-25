import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginPage({ onBack, onGoToRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
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

        <h1 className="auth-title">Se connecter</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.fr"
            required
            autoFocus
          />

          <label className="auth-label" htmlFor="login-password">Mot de passe</label>
          <input
            id="login-password"
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-link">
          Pas encore de compte ?{' '}
          <button onClick={onGoToRegister}>S'inscrire</button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
