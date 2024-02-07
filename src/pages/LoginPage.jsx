// src/pages/LoginPage.js
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    // Handle the login logic, you can also redirect if needed

    // Save user information to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData);

    navigate("/"); // Navigate to the home page after login
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
