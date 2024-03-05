import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  load,
} from "@stripe/react-stripe-js";
import axios from "axios";

const Checkout = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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
        const response = await axios.post(
          "http://localhost:5000/create-checkout-session",
          {
            token: token.id,
          }
        );

        console.log(response.data);
        setPaymentSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Stripe Checkout</h1>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay Now</button>
      </form>
      {paymentSuccess && <p>Payment successful!</p>}
    </div>
  );
};

export default Checkout;
