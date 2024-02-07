import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [addToCartStatus, setAddToCartStatus] = useState(null);
  const { productId } = useParams();
  const authToken = localStorage.getItem("token"); // Retrieve token from storage
  console.log(authToken);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://artbackend-dvbc.onrender.com/api/users/showProductById/${productId}`
        );
        console.log("Product Details:", response.data);
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

      // Make a POST request to your backend to add the product to the cart
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: productId,
          quantity: 1, // You can adjust the quantity as needed
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Use the stored auth token
          },
        }
      );
      console.log("Add to cart response:", response.data);
      setAddToCartStatus("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Failed to add product to cart.");
    }
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
