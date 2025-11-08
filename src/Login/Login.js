import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Feedback/FeedbackForm.module.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(""); // "login" or "signup"
  const [globalError, setGlobalError] = useState("");

  // Common form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("User");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");

  // Inline validation messages
  const [errors, setErrors] = useState({});

  // Validation rules
  const validateName = (name) =>
    /^[A-Za-z\s]+$/.test(name) ? "" : "Name should contain only alphabets and spaces.";
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Please enter a valid email address.";
  const validatePassword = (password) =>
    password.length >= 8 ? "" : "Password must be at least 8 characters.";
  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone) ? "" : "Phone number must be exactly 10 digits.";

  // Real-time validation handler
  useEffect(() => {
    const newErrors = {};
    if (userName) newErrors.userName = validateName(userName);
    if (email) newErrors.email = validateEmail(email);
    if (password) newErrors.password = validatePassword(password);
    if (phoneNumber) newErrors.phoneNumber = validatePhone(phoneNumber);
    setErrors(newErrors);
  }, [userName, email, password, phoneNumber]);

  // ===== Login Handler =====
  const handleLogin = async () => {
    setGlobalError("");

    if (validateEmail(email) || validatePassword(password)) {
      setGlobalError("Please fix validation errors before logging in.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7283/api/Users/login",
        { email, password }
      );
      const { token, role, userId } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      login(token, role, userId);
      alert("Login successful!");
      setModalType("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setGlobalError("Login failed. Check your credentials.");
    }
  };

  // ===== Signup Handler =====
  const handleSignup = async () => {
    setGlobalError("");

    const validationErrors = {
      userName: validateName(userName),
      email: validateEmail(email),
      password: validatePassword(password),
      phoneNumber: validatePhone(phoneNumber),
    };

    const hasErrors = Object.values(validationErrors).some((msg) => msg);
    if (hasErrors || !location) {
      setErrors(validationErrors);
      setGlobalError("Please correct the highlighted errors before submitting.");
      return;
    }

    try {
      const dataToSend = {
        userName,
        email,
        password,
        role,
        phoneNumber: parseInt(phoneNumber, 10),
        location,
      };

      await axios.post("https://localhost:7283/api/Users/register", dataToSend);
      alert("Signup successful! Please login.");
      setModalType("");
    } catch (err) {
      console.error(err);
      setGlobalError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-landing">
      <div className="welcome-box">
        <h1>
          Welcome to <span>SIMBA Events</span>
        </h1>
        <p>Explore, manage, and create unforgettable experiences.</p>

        <div className="landing-buttons">
          <button className="btn btn-login" onClick={() => setModalType("login")}>
            Login
          </button>
          <button className="btn btn-signup" onClick={() => setModalType("signup")}>
            Signup
          </button>
        </div>
      </div>

      {/* ===== LOGIN MODAL ===== */}
      {modalType === "login" && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setModalType("")}>
              ×
            </button>
            <h2>Login</h2>
            {globalError && <div className="error-box">{globalError}</div>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="User">User</option>
                <option value="Organiser">Organiser</option>
              </select>

              <div className={`form-group ${errors.email ? "invalid" : "valid"}`}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <small>{errors.email}</small>}
              </div>

              <div className={`form-group ${errors.password ? "invalid" : "valid"}`}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <small>{errors.password}</small>}
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* ===== SIGNUP MODAL ===== */}
      {modalType === "signup" && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setModalType("")}>
              ×
            </button>
            <h2>Signup</h2>
            {globalError && <div className="error-box">{globalError}</div>}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              <div className={`form-group ${errors.userName ? "invalid" : "valid"}`}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                {errors.userName && <small>{errors.userName}</small>}
              </div>

              <div className={`form-group ${errors.email ? "invalid" : "valid"}`}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <small>{errors.email}</small>}
              </div>

              <div className={`form-group ${errors.password ? "invalid" : "valid"}`}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <small>{errors.password}</small>}
              </div>

              <div className={`form-group ${errors.phoneNumber ? "invalid" : "valid"}`}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="User">User</option>
                <option value="Organiser">Organiser</option>
              </select>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">--Select your city--</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Jaipur">Jaipur</option>
              </select>

              <button type="submit">Signup</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;