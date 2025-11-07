import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // --- Your existing auth state ---
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  // --- NEW: Theme State ---
  // Get theme from storage, default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // This effect runs when the theme state changes
  useEffect(() => {
    // Apply the theme to the <html> tag for CSS to use
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // --- NEW: Theme Toggle Function ---
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  // --- Your existing auth functions ---
  const login = (newToken, newRole, newUserId) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('userId', newUserId);
    setToken(newToken);
    setRole(newRole);
    setUserId(newUserId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    // Also remove theme on logout
    localStorage.removeItem('theme'); 
    setToken(null);
    setRole(null);
    setUserId(null);
    setTheme('light'); // Reset to light
  };

  // --- Provide theme and toggleTheme to the app ---
  return (
    <AuthContext.Provider value={{ token, role, userId, theme, toggleTheme, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);