import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call your NEW Users/login endpoint
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
    <form onSubmit={handleLogin} style={{ margin: '50px' }}>
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
 
export default Login;