import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData);

    navigate("/");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
