import React, { useEffect, useState } from "react";
import "../css/home.css";
import axios from "axios";
import { Link } from "react-router-dom";
const productGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Call the function to fetch all products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://artbackend-dvbc.onrender.com/api/users/showProducts"
      );
      console.log("Response from API:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  console.log("Rendered products:", products);
  return (
    <div>
      <div className="products">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="product"
          >
            {product.image && (
              <img
                src={`https://artbackend-dvbc.onrender.com/uploads/${product.image}`}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            <p>{product.name}</p>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default productGrid;
