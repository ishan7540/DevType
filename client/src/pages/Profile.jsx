/**
 * pages/Profile.jsx
 * Displays user statistics and progress graph.
 */

import React, { useState, useEffect } from 'react';
import { getScoreHistory } from '../services/api';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Profile = ({ user }) => {
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({
        avgWpmEnglish: 0,
        avgWpmCoding: 0,
        totalTests: 0,
        bestWpm: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getScoreHistory();
                setHistory(data);
                calculateStats(data);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    const calculateStats = (data) => {
        if (!data || data.length === 0) return;

        let totalWpmEnglish = 0;
        let countEnglish = 0;
        let totalWpmCoding = 0;
        let countCoding = 0;
        let maxWpm = 0;

        data.forEach(score => {
            if (score.wpm > maxWpm) maxWpm = score.wpm;

            if (score.mode === 'text') {
                totalWpmEnglish += score.wpm;
                countEnglish++;
            } else if (score.mode === 'code') {
                totalWpmCoding += score.wpm;
                countCoding++;
            }
        });

        setStats({
            avgWpmEnglish: countEnglish > 0 ? Math.round(totalWpmEnglish / countEnglish) : 0,
            avgWpmCoding: countCoding > 0 ? Math.round(totalWpmCoding / countCoding) : 0,
            totalTests: data.length,
            bestWpm: maxWpm
        });
    };

    // Format data for chart (reverse to show oldest to newest)
    const chartData = [...history].reverse().map((item, index) => ({
        name: index + 1,
        wpm: item.wpm,
        mode: item.mode,
        date: new Date(item.createdAt).toLocaleDateString()
    }));

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;

    if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Please login to view profile.</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{user.name}'s Profile</h1>

            {/* Stats Cards */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                <div style={cardStyle}>
                    <h3>Total Tests</h3>
                    <p style={statValueStyle}>{stats.totalTests}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Best WPM</h3>
                    <p style={{ ...statValueStyle, color: '#2ed573' }}>{stats.bestWpm}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Avg WPM (English)</h3>
                    <p style={statValueStyle}>{stats.avgWpmEnglish}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Avg WPM (Coding)</h3>
                    <p style={statValueStyle}>{stats.avgWpmCoding}</p>
                </div>
            </div>

            {/* Chart */}
            <div style={{ height: '400px', marginBottom: '40px', padding: '20px', border: '1px solid #334155', borderRadius: '8px', backgroundColor: '#1e293b' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#f8fafc' }}>Progress History</h3>
                {history.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" label={{ value: 'Test Number', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'WPM', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div style={{ backgroundColor: '#1e293b', padding: '10px', border: '1px solid #334155', color: '#f8fafc' }}>
                                                <p>{`Date: ${data.date}`}</p>
                                                <p>{`WPM: ${data.wpm}`}</p>
                                                <p>{`Mode: ${data.mode}`}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="wpm" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '150px', color: '#888' }}>No test history yet.</p>
                )}
            </div>

            {/* Recent History Table */}
            <div>
                <h3>Recent Tests</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#1e293b', textAlign: 'left', color: '#f8fafc' }}>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Mode</th>
                            <th style={thStyle}>Duration</th>
                            <th style={thStyle}>WPM</th>
                            <th style={thStyle}>Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.slice(0, 10).map((score) => (
                            <tr key={score._id} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={tdStyle}>{new Date(score.createdAt).toLocaleDateString()}</td>
                                <td style={tdStyle}>{score.mode === 'text' ? 'English' : 'Coding'}</td>
                                <td style={tdStyle}>{score.duration}s</td>
                                <td style={tdStyle}><strong>{score.wpm}</strong></td>
                                <td style={tdStyle}>{score.accuracy}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const cardStyle = {
    flex: '1',
    minWidth: '150px',
    padding: '20px',
    border: '1px solid #334155',
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};

const statValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '10px 0 0 0',
    color: '#f8fafc'
};

const thStyle = {
    padding: '12px',
    borderBottom: '2px solid #334155'
};

const tdStyle = {
    padding: '12px'
};

export default Profile;
