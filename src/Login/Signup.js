import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../Login/Api' 
import styles from '../Feedback/FeedbackForm.module.css'; 

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        role: '', 
        phoneNumber: '',
        location: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email.endsWith('@gmail.com')) {
            setError('Email must be a valid @gmail.com address.');
            return;
        }
        if (formData.phoneNumber.length !== 10) {
            setError('Phone number must be exactly 10 digits.');
            return;
        }

        try {
            // Convert phoneNumber to a number 
            const dataToSend = {
                ...formData,
                phoneNumber: parseInt(formData.phoneNumber, 10)
            };

            await api.post('/Users/register', dataToSend);
            
            alert('Registration successful! Please login.');
            navigate('/login');

        } catch (err) {
            // backend validation errors
            if (err.response && err.response.data) {
                 // Email already exists
                 if (err.response.data.error) {
                     setError(err.response.data.error);
                 } 
                 // general validation error 
                 else if (err.response.data.errors) {
                     const firstError = Object.values(err.response.data.errors)[0];
                     setError(firstError);
                 } else {
                     setError('Registration failed. Please try again.');
                 }
            } else {
                setError('An error occurred. Please check your connection.');
            }
        }
    };

    return (
        <div className={styles.container} style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    name="userName"
                    placeholder="Full Name"
                    value={formData.userName}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email (@gmail.com)"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={styles.inputField}
                    style={{ backgroundColor: 'var(--simba-white)' }}
                >
                    <option value="">-- Select Role --</option>
                    <option value="User">User</option>
                    <option value="Organiser">Organiser</option>
                </select>
                <input
                    name="phoneNumber"
                    type="number"
                    placeholder="Phone Number (10 digits)"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
                <input
                    name="location"
                    placeholder="Location (City)"
                    value={formData.location}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />

                <button type="submit" className={styles.primaryButton}>
                    Create Account
                </button>

                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--simba-orange-dark)' }}>Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;