import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Feedback/FeedbackForm.module.css';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [globalError, setGlobalError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? ""
            : "Please enter a valid email address.";
    
    const validatePassword = (password) =>
        password.length >= 8 ? "" : "Password must be at least 8 characters.";

    useEffect(() => {
        const newErrors = {};
        if (email) newErrors.email = validateEmail(email);
        if (password) newErrors.password = validatePassword(password);
        setErrors(newErrors);
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setGlobalError("");

        const emailError = validateEmail(email);
        const passError = validatePassword(password);

        if (emailError || passError) {
            setErrors({ email: emailError, password: passError });
            setGlobalError("Please fix the errors in the form.");
            return;
        }

        try {
            const response = await axios.post(
                "https://localhost:7283/api/Users/login",
                { email, password }
            );
            const { token, role, userId } = response.data;

            login(token, role, userId);
            
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setGlobalError("Login failed. Check your email and password.");
        }
    };

    return (
      <div className="authBackground">
         <div className="welcome-box">
         <h1>Welcome to <span>SIMBA Events</span></h1>
         <p>Explore, manage, and create unforgettable experiences.</p>
        </div>
        
        <div className={`${styles.container} auth-card`} style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2>Login</h2>
            {globalError && <p style={{ color: 'red', textAlign: 'center' }}>{globalError}</p>}
            
            <form onSubmit={handleLogin} className={styles.form}>
            
                {errors.email && <small style={{ color: 'red', display: 'block', marginBottom: '5px' }}>{errors.email}</small>}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={styles.inputField}
                    required
                />

                {errors.password && <small style={{ color: 'red', display: 'block', marginBottom: '5px', marginTop: '10px' }}>{errors.password}</small>}
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className={styles.inputField}
                    placeholder="Password"
                    required
                />
                <button type="submit" className={styles.primaryButton}>Login</button>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--simba-orange-dark)' }}>Sign up</Link>
                </p>
            </form>
        </div>
        
      </div>
    );
};

export default Login;