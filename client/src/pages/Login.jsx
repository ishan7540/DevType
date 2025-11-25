/**
 * pages/Login.jsx
 * Login form component.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await loginUser({ email, password });

            // Save token to localStorage for persistence
            localStorage.setItem('token', data.token);

            // Update global user state
            setUser(data);

            // Redirect to home
            navigate('/');
        } catch (err) {
            // Handle errors (e.g., invalid credentials)
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '40px', border: '1px solid #334155', borderRadius: '8px', backgroundColor: '#1e293b' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#0f172a', color: 'white', border: '1px solid #475569', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#0f172a', color: 'white', border: '1px solid #475569', borderRadius: '4px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#2ed573',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
