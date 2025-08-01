import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty. Now start your Shopping.</p>
          <Link to="/shop">
            <button className="visit-shop-btn">Visit Shop</button>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <label>
                  Quantity:{" "}
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="quantity-select"
                  >
                    {Array.from(
                      { length: Math.max(item.quantity, 10) },
                      (_, i) => i + 1
                    ).map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="cart_remove_btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{totalPrice}</h3>
            <Link to="/shop" className="cart_btn_link">
              <button className="buymore-btn">Buy More</button>
            </Link>
            <Link to="/checkout" className="cart_btn_link">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
            <button
              className="clear_cart_btn"
              onClick={() => {
                const confirmClear = window.confirm(
                  "Are you sure you want to remove all items?"
                );
                if (confirmClear) clearCart();
              }}
            >
              Clear All Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
