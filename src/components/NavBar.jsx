import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const [user, setUser] = useState(null);

  // Check for user in localStorage on initial render
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    fetchUser();
  }, []);

  // Handle logout and clear user from localStorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Navbar bg="black">
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {user ? (
          <LoggedInUserNav user={user} onLogout={handleLogout} />
        ) : (
          <GuestUserNav />
        )}
      </Container>
    </Navbar>
  );
};

// Component for logged-in user navigation
const LoggedInUserNav = ({ user, onLogout }) => (
  <Nav>
    <Stack direction="horizontal" gap={3}>
      <p className="text-warning">Logged in as {user?.name}</p>
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

// Component for guest user navigation
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
