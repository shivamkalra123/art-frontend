// ProductDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

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

  return (
    <div>
      <h1>Product Details</h1>
      {product ? (
        <div>
          <img
            src={`https://art-freelance-1n45.vercel.app/uploads/${product.image}`}
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
          <p>{product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
