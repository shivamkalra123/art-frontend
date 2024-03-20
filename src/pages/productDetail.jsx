import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ updateCartCount }) => {
  const [product, setProduct] = useState(null);
  const [addToCartStatus, setAddToCartStatus] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const authToken = localStorage.getItem("token");
  const navigate = useNavigate();

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
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setAddToCartStatus("Product added to cart successfully!");

      updateCartCount();
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartStatus("Failed to add product to cart.");
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-3  items-center ">
          <img
            src={`https://artbackend-dvbc.onrender.com/uploads/${product.image}`}
            alt={product.name}
            className="max-w-full max-h-96 object-cover rounded ml-20"
          />
          <div>
            <p className="text-xl font-bold mb-2">{product.name}</p>
            <p className="mb-2">{product.description}</p>
            <p className="font-bold mb-2">${product.price}</p>
            <p className="mb-2">Category: {product.category}</p>
            <div className="flex mb-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-l"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                className="w-16 text-center"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-r"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:text-gray-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              {addToCartStatus && (
                <p className="text-red-500">{addToCartStatus}</p>
              )}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded "
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
