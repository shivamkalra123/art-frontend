import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ProductDetail from "./productDetail";

const ProductPage = () => {
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count
  const updateCartCount = async () => {
    try {
      // Your logic to update cart count
      // For example, fetch cart count from server
      const response = await fetchCartCount();
      const newCartCount = response.data.count;
      setCartCount(newCartCount);
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  };

  // Example function to fetch cart count from server
  const fetchCartCount = async () => {
    // Simulated API call or calculation
    return { data: { count: 8 } }; // For example, return the cart count from the server
  };

  return (
    <div>
      <NavBar cartCount={cartCount} />
      {/* Pass cartCount as a prop to NavBar */}
      <ProductDetail updateCartCount={updateCartCount} />
      {/* Pass updateCartCount as a prop to ProductDetail */}
      {/* Other content of the ProductPage component */}
    </div>
  );
};

export default ProductPage;
