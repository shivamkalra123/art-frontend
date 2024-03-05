import { useState, useEffect } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      onLogin({ id, name, email, token });
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing localStorage
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // Attach event listener for window close
    const handleWindowClose = () => {
      handleLogout();
    };

    window.addEventListener("beforeunload", handleWindowClose);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
