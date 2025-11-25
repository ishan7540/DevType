/**
 * components/ResultModal.jsx
 * Shows the final results after the test finishes.
 */

import React from 'react';

const ResultModal = ({ wpm, accuracy, onRestart, isSaving, user, isHighScore }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#1e293b',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                minWidth: '350px',
                border: '1px solid #334155',
                color: '#f8fafc',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}>
                <h2 style={{ marginBottom: '10px' }}>Test Complete!</h2>

                {isHighScore && (
                    <div style={{
                        backgroundColor: '#fbbf24',
                        color: '#1e293b',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        🏆 New High Score!
                    </div>
                )}

                <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <div>
                        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '5px' }}>WPM</p>
                        <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#4ade80', margin: 0 }}>{wpm}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '5px' }}>Accuracy</p>
                        <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>{accuracy}%</p>
                    </div>
                </div>

                {isSaving && (
                    <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>
                        Saving score...
                    </p>
                )}

                <button
                    onClick={onRestart}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                >
                    Try Again
                </button>

                {!user && (
                    <p style={{ marginTop: '20px', fontSize: '12px', color: '#64748b' }}>
                        Login to save your scores!
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResultModal;
