import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/LoginPage";
import Register from "./pages/register";
import ProductDetails from "./pages/productDetail";
import NavBar from "./components/NavBar";
import Checkout from "./pages/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51Oj0fsSFi8TEkufSD8w2JGIBIajLMyjxOQZwx3P8A7IpC767cNzB2O8atmKCXeeknvYpDiWM4Y4ry0ZOLue7N3m000aoruWgBv"
  );

  return (
    <React.Fragment>
      {user && <NavBar user={user} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
