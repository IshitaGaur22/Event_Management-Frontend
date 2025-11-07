import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || localStorage.getItem('authToken') || null);
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const login = (...args) => {
    let t, r, u;
    [t, r, u] = args;
    
    setToken(t || null);
    setRole(r || null);
    if (t) localStorage.setItem('token', t); else localStorage.removeItem('token');
    if (r) localStorage.setItem('role', r); else localStorage.removeItem('role');
    if (u) localStorage.setItem('userId', u);
    if (t) localStorage.setItem('authToken', t); // preserve authToken if other code uses it
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ token, role, theme, setTheme, toggleTheme, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}