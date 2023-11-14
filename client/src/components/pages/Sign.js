import React, { useState } from "react";
import "./sign.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Sign = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    reEnterPassword: ''
  });

  const [errors, setErrors] = useState({}); // State for error messages
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    if (formData.password !== formData.reEnterPassword) {
      setErrors({ reEnterPassword: 'Passwords do not match' });
      return;
    }
    try {
      const response = await fetch('http://localhost:8800/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully:', data.user);
        navigate("/home");
      } else {
        // Display errors
        setErrors(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="sign-container">
      <img className="sign-bg" src="log.jpg" alt="" />
      <h1 className="sign-header">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="sign-input"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Your Email"
          className="sign-input"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          className="sign-input"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="reEnterPassword"
          placeholder="Re-enter Password"
          className="sign-input"
          value={formData.reEnterPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className="sign-button sign-button-submit">Register</button>
      </form>
      <div className="error-message">
        {errors.message && <p>{errors.message}</p>}
        {errors.password && <p>{errors.password}</p>}
        {errors.email && <p>{errors.email}</p>}
        {errors.reEnterPassword && <p>{errors.reEnterPassword}</p>}

      </div>
      <button type="button" className="sign-button sign-button-other">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
      </button>
    </div>
  );
}

export default Sign;
