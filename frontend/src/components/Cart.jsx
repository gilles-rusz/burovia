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
  return (
    <section id="panier" className="cart-section">
      <h2>Votre panier</h2>

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
                  <button onClick={() => onDecreaseQuantity(item.id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => onIncreaseQuantity(item.id)}>
                    +
                  </button>

                  <button onClick={() => onRemoveFromCart(item.id)}>
                    Retirer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>Total : {formatPrice(cartTotal)}</strong>

            <div className="cart-total-actions">
              <button onClick={onClearCart}>
                Vider le panier
              </button>

              <button onClick={onCheckout}>
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