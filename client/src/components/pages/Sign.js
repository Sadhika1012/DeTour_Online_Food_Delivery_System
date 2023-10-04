import React, { useState } from "react";
import "./sign.css";

const Sign = () => {
  return (
    <div className="sign-container">
      <img className="sign-bg" src="log.jpg" alt="" />
      <h1 className="sign-header">Sign Up</h1>
      <input type="text" name="name" placeholder="Your Name" className="sign-input" />
      <input type="text" name="email" placeholder="Your Email" className="sign-input" />
      <input type="password" name="password" placeholder="Your Password" className="sign-input" />
      <input type="password" name="reEnterPassword" placeholder="Re-enter Password" className="sign-input" />
      <button type="submit" className="sign-button sign-button-submit">Register</button>
      <button type="button" className="sign-button sign-button-other">Login</button>
    </div>
  );
}

export default Sign;
