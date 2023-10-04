import { Navbar } from "../layout";
import React, { useState } from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Navbar />
      <img className="login-bg" src="log.jpg" alt="" />
      <h1 className="login-header">Login</h1>
      <input
        type="text"
        name="email"
        className="login-input"
        placeholder="Enter your Email"
      />
      <input
        type="password"
        name="password"
        className="login-input"
        placeholder="Enter your Password"
      />
      <button className="login-button login-button-submit" type="button">
        Login
      </button>
      <button className="login-button login-button-other" type="submit">
        Sign up
      </button>
    </div>
  );
};

export default Login;
