/**
 * App.jsx
 * The main component that handles routing and global layout.
 */

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { getMe } from './services/api';

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in on app load
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getMe();
                    setUser(userData);
                } catch (error) {
                    // If token is invalid, clear it
                    localStorage.removeItem('token');
                }
            }
        };
        checkUser();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {/* Navigation Bar */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #334155' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#f8fafc', fontSize: '24px', fontWeight: 'bold' }}>
                    ⌨️ DevType
                </Link>

                <div>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span>Welcome, <strong>{user.name}</strong></span>
                            <Link to="/profile" style={{ textDecoration: 'none', color: '#f8fafc' }}>Profile</Link>
                            <span>High Score: <strong>{user.highScore} WPM</strong></span>
                            <button onClick={handleLogout} style={buttonStyle}>Logout</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link to="/login" style={linkButtonStyle}>Login</Link>
                            <Link to="/register" style={linkButtonStyle}>Register</Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Route Definitions */}
            <Routes>
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
        </div>
    );
}

// Simple styles for buttons
const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#ff4757',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
};

const linkButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#2ed573',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px'
};

export default App;
