import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://art-freelance-1n45.vercel.app/api/users/loginUser",
        {
          email,
          password,
        }
      );

      const { id, name, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ id, name, email }));

      onLogin({ id, name, email, token });

      // Navigate to the main page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
