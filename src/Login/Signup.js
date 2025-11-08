import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./mainn.css";

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName || !email || !password || !phoneNumber || !location) {
      setError("Please fill out all required fields.");
      return;
    }

    const dataToSend = {
      userName,
      email,
      password,
      role,
      phoneNumber: parseInt(phoneNumber, 10),
      location,
    };

    try {
      await axios.post("https://localhost:7283/api/Users/register", dataToSend);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.error) setError(err.response.data.error);
        else if (err.response.data.errors) {
          const firstError = Object.values(err.response.data.errors)[0];
          setError(firstError[0]);
        } else setError("Registration failed. Please try again.");
      } else setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Organiser">Organiser</option>
          </select>

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="10 digits"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="City or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;