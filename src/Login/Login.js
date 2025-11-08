import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Feedback/FeedbackForm.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7283/api/Users/login",
        { email, password }
      );
     
      const { token, role, userId } = response.data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
      localStorage.setItem('authToken', token);
      // Use the AuthContext to save the login state
      login(token, role, userId);
      // Navigate home
      navigate("/dashboard");
 
    } catch (err) {
      alert('Login failed. Check email or password.');
      console.error(err);
    }
  };
 
  return (
    <div className={styles.container} style={{ maxWidth: '400px', marginTop: '50px' }}>
    <h2>Login</h2>
    <form onSubmit={handleLogin} className={styles.form}>
      
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.inputField}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className={styles.inputField}
        placeholder="Password"
      />
      <button type="submit" className={styles.primaryButton}>Login</button>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--simba-orange-dark)' }}>Sign up</Link>
      </p>
    </form>
    </div>
  );
};
 
export default Login;