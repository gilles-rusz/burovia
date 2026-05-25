const MAX_QUANTITY = 10;

function Cart({
  cart,
  cartTotal,
  cartError,
  formatPrice,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onClearCart,
  onCheckout
}) {
  return (
    <section id="panier" className="cart-section">
      <div className="cart-header">
        <h2>Votre panier</h2>
      </div>

      <div className="cart-body">
        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      {formatPrice(item.price_cents)} × {item.quantity}
                    </p>
                  </div>

                  <div className="cart-actions">
                    <button
                      className="cart-qty-btn"
                      onClick={() => onDecreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="cart-qty-btn"
                      onClick={() => onIncreaseQuantity(item.id)}
                      disabled={item.quantity >= MAX_QUANTITY}
                      title={item.quantity >= MAX_QUANTITY ? 'Quantité maximale atteinte' : undefined}
                    >
                      +
                    </button>

                    {item.quantity >= MAX_QUANTITY && (
                      <span className="cart-max-msg">Max {MAX_QUANTITY}</span>
                    )}

                    <button
                      className="cart-remove-btn"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <strong>Total : {formatPrice(cartTotal)}</strong>

              <div className="cart-total-actions">
                <button className="cart-clear-btn" onClick={onClearCart}>
                  Vider le panier
                </button>
                <button className="cart-checkout-btn" onClick={onCheckout}>
                  Commander
                </button>
              </div>
            </div>
          </>
        )}

        {cartError && <p className="error-inline">{cartError}</p>}
      </div>
    </section>
  );
}

export default Cart;
