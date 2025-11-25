/**
 * pages/Register.jsx
 * Registration form component.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = ({ setUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await registerUser({ name, email, password });

            // Save token and update state (auto-login after register)
            localStorage.setItem('token', data.token);
            setUser(data);

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '40px', border: '1px solid #334155', borderRadius: '8px', backgroundColor: '#1e293b' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box', backgroundColor: '#0f172a', color: 'white', border: '1px solid #475569', borderRadius: '4px' }}
                    />
                </div>

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
                        backgroundColor: '#3742fa',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
