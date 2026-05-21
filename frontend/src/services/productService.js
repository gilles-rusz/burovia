const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Erreur lors de la récupération des produits.');
  }

  return data.products;
};