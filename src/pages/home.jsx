import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
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
      <h1 className="text-2xl flex">All Products</h1>

      <ul>
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            {product.image && (
              <img
                src={`https://artbackend-dvbc.onrender.com/uploads/${product.image}`}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
            <p>{product.name}</p>
            <p>${product.price}</p>
            <hr />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
