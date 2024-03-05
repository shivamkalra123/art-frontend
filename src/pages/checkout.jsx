// checkout.jsx

import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./checkout.css";

import axios from "axios";

const CheckoutForm = ({ cartItems, total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.post(
          "https://artbackend-dvbc.onrender.com/api/payments",
          {
            amount: total,
            currency: "usd",
            description: "Payment for items",
            token: token.id,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Replace yourAuthToken with the actual JWT token
              "Content-Type": "application/json", // Adjust content type if needed
            },
          }
        );

        console.log("Payment response:", response.data);
        // Handle success or redirect to a success page
      } catch (error) {
        console.error("Error creating payment:", error);
        // Handle errors
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <p>{item.productId.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.productId.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Card Details
          <div className="card-element">
            <CardElement />
          </div>
        </label>

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51Oj0fsSFi8TEkufSD8w2JGIBIajLMyjxOQZwx3P8A7IpC767cNzB2O8atmKCXeeknvYpDiWM4Y4ry0ZOLue7N3m000aoruWgBv"
  );

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      // Fetch cart items logic here (similar to what you did in your original code)
      // ...
      const authToken = localStorage.getItem("token");
      // Example:
      const response = await axios.get(
        "https://artbackend-dvbc.onrender.com/api/cart",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          // Add headers if needed
        }
      );

      if (response.data && response.data.cart && response.data.cart.items) {
        setCartItems([...response.data.cart.items]);
        calculateTotal([...response.data.cart.items]);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    if (Array.isArray(items) && items.length > 0) {
      const totalPrice = items.reduce((acc, item) => {
        return acc + (item.productId.price || 0) * item.quantity;
      }, 0);
      setTotal(totalPrice);
    } else {
      setTotal(0);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} total={total} />
    </Elements>
  );
};

export default Checkout;
