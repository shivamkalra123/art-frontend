import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://art-freelance-1n45.vercel.app/api/users/registerUser",
        {
          name,
          email,
          password,
        }
      );

      const { id, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ id, name, email }));
      console.log(token);

      onRegister({ id, name, email, token });

      // Navigate to the main page after successful registration
      navigate("/");
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        setError(error.response.data);
      } else {
        // Request was made but no response received
        setError("Network error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error message */}
    </div>
  );
};

export default RegisterForm;
