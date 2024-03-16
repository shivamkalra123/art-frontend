import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Stack, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { io } from "socket.io-client";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    const setupWebSocket = () => {
      const socket = io("http://localhost:5000"); // Replace with your backend server address

      socket.on("connect", () => {
        console.log("Connected to WebSocket");
      });

      socket.on("cartUpdate", () => {
        fetchCartItems();
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket");
      });
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
    setupWebSocket();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  return (
    <Navbar bg="black">
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Art
          </Link>
        </h2>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user ? (
              <LoggedInUserNav user={user} onLogout={handleLogout} />
            ) : (
              <GuestUserNav />
            )}
            <Link
              to="#"
              className="link-light text-decoration-none"
              onClick={handleCartClick}
            >
              <FiShoppingCart size={24} color="white" />
              {cartCount > 0 && (
                <span className="badge bg-danger">{cartCount}</span>
              )}
            </Link>
          </Stack>
        </Nav>
      </Container>

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
    </Navbar>
  );
};

const LoggedInUserNav = ({ user, onLogout }) => (
  <Nav>
    <Stack direction="horizontal" gap={3}>
      <FiUser size={24} color="white" />
      <Link
        onClick={onLogout}
        to="/login"
        className="link-light text-decoration-none"
      >
        Logout
      </Link>
    </Stack>
  </Nav>
);

const GuestUserNav = () => (
  <Nav>
    <Stack direction="horizontal" gap={3}>
      <Link to="/login" className="link-light text-decoration-none">
        Login
      </Link>
      <Link to="/register" className="link-light text-decoration-none">
        Register
      </Link>
    </Stack>
  </Nav>
);

export default NavBar;
