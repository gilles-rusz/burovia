import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const STATUS_LABELS = {
  pending_payment: 'En attente',
  paid: 'Payé',
  shipped: 'Expédié',
  cancelled: 'Annulé',
};

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function AdminPage({ onBack }) {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Accès refusé ou erreur serveur');
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        setFetchError(err.message || 'Impossible de récupérer les commandes.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="admin-page">
      <div className="admin-card">
        <button className="detail-back-btn" onClick={onBack}>
          ← Retour
        </button>

        <h1 className="admin-title">Administration</h1>

        {loading ? (
          <p className="admin-status">Chargement des commandes…</p>
        ) : fetchError ? (
          <p className="admin-status admin-status--error">{fetchError}</p>
        ) : orders.length === 0 ? (
          <p className="admin-status">Aucune commande pour le moment.</p>
        ) : (
          <div className="admin-table-wrap">
            <p className="admin-count">{orders.length} commande{orders.length > 1 ? 's' : ''}</p>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Adresse</th>
                  <th>Articles</th>
                  <th>Total</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="admin-td-id">#{order.id}</td>
                    <td className="admin-td-date">{formatDate(order.created_at)}</td>
                    <td>
                      <span className="admin-client-name">{order.customer_name}</span>
                      <br />
                      <span className="admin-client-email">{order.customer_email}</span>
                    </td>
                    <td>
                      {order.shipping_address_line1}<br />
                      {order.shipping_postal_code} {order.shipping_city}
                    </td>
                    <td>
                      {order.items.map((item, i) => (
                        <span key={i} className="admin-item-line">
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </td>
                    <td className="admin-td-total">
                      {formatPrice(order.total_amount_cents)}
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge--${order.status}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
