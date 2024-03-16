import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";

const RegisterPage = () => {
  useEffect(() => {
    // Any initialization logic can go here
  }, []);

  const navigate = useNavigate();

  const handleRegister = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData);
  };

  return (
    <div>
      <h1>Register Page</h1>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
