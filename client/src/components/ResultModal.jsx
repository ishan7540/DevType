/**
 * components/ResultModal.jsx
 * Shows the final results after the test finishes.
 */

import React from 'react';

const ResultModal = ({ wpm, accuracy, onRestart, onSave, isSaving, user }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '300px'
            }}>
                <h2>Test Complete!</h2>

                <div style={{ margin: '20px 0' }}>
                    <p style={{ fontSize: '24px' }}>WPM: <strong>{wpm}</strong></p>
                    <p style={{ fontSize: '18px', color: '#666' }}>Accuracy: {accuracy}%</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                        onClick={onRestart}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ccc',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>

                    {user && (
                        <button
                            onClick={onSave}
                            disabled={isSaving}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2ed573',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSaving ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Save Score'}
                        </button>
                    )}
                </div>

                {!user && (
                    <p style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>
                        Login to save your high score!
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResultModal;
