import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return <h2>❌ No order data found.</h2>;
  }

  const { items, total, form } = orderDetails;

  return (
    <div className="order-success">
      <div className="order-card">
        <h2>🎉 Order Confirmed!</h2>
        <p>
          <strong>Name:</strong> {form.name}
        </p>
        <p>
          <strong>Phone:</strong> {form.phone}
        </p>
        <p>
          <strong>Address:</strong> {form.address}
        </p>
        <h3>🛍️ Items:</h3>
        {items.map((item, i) => (
          <p key={i}>
            {item.name} × {item.quantity} = ₹{item.price * item.quantity}
          </p>
        ))}
        <h3>Total Paid: ₹{total}</h3>

        <button
          className="continue_shopping_btn"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping 🛒
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
