import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Stack, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import axios from "axios";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Check for user in localStorage on initial render
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    const fetchCartItems = async () => {
      const authToken = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data && response.data.cart && response.data.cart.items) {
          setCartItems([...response.data.cart.items]);
          setCartCount(response.data.cart.items.length);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchUser();
    fetchCartItems();
  }, []); // Empty dependency array to run the effect only once on initial render

  // Handle logout and clear user from localStorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Handle click on cart icon
  const handleCartClick = () => {
    setShowCartModal(true);
  };

  // Close the cart modal
  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  return (
    <div className=" bg-black/30 py-6 px-10 flex justify-between align-middle w-full absolute z-50 text-white font-poppins ">
      <div className="flex justify-between align-middle w-full ">
        <div>
          <Link
            to="/"
            className=" text- text-3xl font-semibold hover:[text-shadow:_2px_3px_3px_rgb(255_255_255_/_40%)] duration-75 ease-in-out"
          >
            MusingArtistry
          </Link>
        </div>

        <div>
          <div className="flex justify-between align-middle">
            {user ? (
              <LoggedInUserNav user={user} onLogout={handleLogout} />
            ) : (
              <GuestUserNav />
            )}

            {/* Cart Icon */}
            <Link to="#" className="mx-4" onClick={handleCartClick}>
              <FiShoppingCart size={30} color="white" />
              {cartCount > 0 && (
                <span className="badge bg-danger">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <p>{item.productId.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.productId.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Component for logged-in user navigation
const LoggedInUserNav = ({ user, onLogout }) => (
  <Nav>
    <div>
      <FiUser size={24} color="white" />
      <Link
        onClick={onLogout}
        to="/login"
        className="mx-4 border-[1.5px] px-4 py-[3px] rounded-2xl font-poppins"
      >
        Logout
      </Link>
    </div>
  </Nav>
);

// Component for guest user navigation
const GuestUserNav = () => (
  <div className="flex justify-between align-middle text-center font-poppins ">
    <Link
      to="/login"
      className="mx-5 my-[5px] text-xl hover:[text-shadow:_2px_3px_3px_rgb(255_255_255_/_40%)] duration-75 ease-in-out"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="mx-5 my-[5px] text-xl hover:[text-shadow:_2px_3px_3px_rgb(255_255_255_/_40%)] duration-75 ease-in-out"
    >
      Register
    </Link>
  </div>
);

export default NavBar;
