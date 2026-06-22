const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const createCheckoutSession = async (cartItems) => {
  const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity
      }))
    })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Impossible de créer la session Stripe.');
  }

  return data;
};