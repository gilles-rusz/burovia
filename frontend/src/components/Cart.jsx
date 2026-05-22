import { ShoppingBag, Trash2, CreditCard, Minus, Plus, X } from 'lucide-react';

function Cart({
  cart,
  cartTotal,
  formatPrice,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onClearCart,
  onCheckout
}) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section id="panier" className="cart-section">
      <h2>
        <ShoppingBag size={24} />
        Votre panier
        {itemCount > 0 && (
          <span className="cart-count-label">
            ({itemCount} article{itemCount > 1 ? 's' : ''})
          </span>
        )}
      </h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Votre panier est vide.</p>
          <a href="#catalogue">Parcourir le catalogue</a>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <p>
                    {formatPrice(item.price_cents)} × {item.quantity}
                    {' = '}
                    <span className="cart-item-price">
                      {formatPrice(item.price_cents * item.quantity)}
                    </span>
                  </p>
                </div>

                <div className="cart-actions">
                  <button
                    className="cart-qty-btn"
                    onClick={() => onDecreaseQuantity(item.id)}
                    aria-label="Diminuer"
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="cart-qty-btn"
                    onClick={() => onIncreaseQuantity(item.id)}
                    aria-label="Augmenter"
                  >
                    <Plus size={14} />
                  </button>

                  <button
                    className="cart-remove-btn"
                    onClick={() => onRemoveFromCart(item.id)}
                    aria-label="Retirer"
                  >
                    <X size={14} />
                    Retirer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>Total : {formatPrice(cartTotal)}</strong>

            <div className="cart-total-actions">
              <button className="btn-clear-cart" onClick={onClearCart}>
                <Trash2 size={14} />
                {' '}Vider
              </button>

              <button className="btn-checkout" onClick={onCheckout}>
                <CreditCard size={18} />
                Commander
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
