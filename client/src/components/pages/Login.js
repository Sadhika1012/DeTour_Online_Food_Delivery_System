import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import usNavigate from react-router-dom
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in local storage for subsequent requests
        localStorage.setItem("token", data.token);
        // Redirect user to /home
        navigate("/home");
      } else {
        setError("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <img className="login-bg" src="log.jpg" alt="" />
      <h1 className="login-header">Login</h1>
      {error && <div className="error-message1" >{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          className="login-input"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="login-input"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className="login-button login-button-submit" type="submit">
          Login
        </button>
      </form>
      <button className="login-button login-button-other" type="button">
        <Link to="/sign">
        Sign up
        </Link>
      </button>
    </div>
  );
};

export default Login;
