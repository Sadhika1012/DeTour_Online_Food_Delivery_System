import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const linkStyle = {
    textDecoration: 'none',
    fontSize: '1em',
    fontWeight: '600',
    color: 'white',
    transition: '0.3s ease-in-out'
  };
  return (
    <div id="navbar">
      <ul id="navbar">
        <li><Link to="/home" style={linkStyle}>Home</Link></li>
        <li><Link to="/about" style={linkStyle}>About</Link></li>
        <li><Link to="/faq" style={linkStyle}>FAQs</Link></li>
        <li><Link to="/cart" style={linkStyle}>Cart</Link></li>
        <li><Link to="/store" style={linkStyle}>Order Now</Link></li>
        <li><Link to="/profile" style={linkStyle}>Profile</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
