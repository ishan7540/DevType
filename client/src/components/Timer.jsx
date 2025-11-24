/**
 * components/Timer.jsx
 * Displays the remaining time.
 */

import React from 'react';

const Timer = ({ timeLeft }) => {
    return (
        <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: timeLeft < 10 ? '#f87171' : 'white',
            marginBottom: '20px'
        }}>
            Time: {timeLeft}s
        </div>
    );
};

export default Timer;
