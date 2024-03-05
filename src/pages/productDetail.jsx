import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [addToCartStatus, setAddToCartStatus] = useState(null);
  const { productId } = useParams();
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate(); // Use the useNavigate hook to navigate between pages

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://artbackend-dvbc.onrender.com/api/users/showProductById/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      if (!authToken) {
        console.error("User not authenticated");
        setAddToCartStatus("User not authenticated.");
        return;
      }

      const response = await axios.post(
        "https://artbackend-dvbc.onrender.com/api/cart/add",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setAddToCartStatus("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Failed to add product to cart.");
    }
  };

  const handleProceedToCheckout = () => {
    // Navigate to the checkout page
    navigate("/checkout");
  };

  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <div>
          <img
            src={`https://artbackend-dvbc.onrender.com/uploads/${product.image}`}
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
          <p>{product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
          {addToCartStatus && <p>{addToCartStatus}</p>}
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
