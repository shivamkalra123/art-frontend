import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/LoginPage";
import Register from "./pages/register";
import ProductDetails from "./pages/productDetail";

import NavBar from "./components/NavBar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <React.Fragment>
      <NavBar user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
