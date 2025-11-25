/**
 * pages/Home.jsx
 * The main typing test interface.
 * 
 * Logic flow:
 * 1. Generate random words on mount.
 * 2. User starts typing -> timer starts.
 * 3. Track correct/incorrect characters.
 * 4. When time runs out -> show results modal.
 * 5. Calculate WPM and Accuracy.
 */

import React, { useState, useEffect, useRef } from 'react';
import { generateWords } from '../utils/typingWords';
import { getRandomSnippet } from '../utils/dsaSnippets';
import Timer from '../components/Timer';
import ResultModal from '../components/ResultModal';
import { saveScore } from '../services/api';

const Home = ({ user, setUser }) => {
    // State for the game
    const [mode, setMode] = useState('text'); // 'text' or 'code'
    const [duration, setDuration] = useState(30); // 15, 30, 60
    const [words, setWords] = useState('');
    const [snippetTitle, setSnippetTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Stats
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    // Refs
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const wordContainerRef = useRef(null);
    const activeWordRef = useRef(null);

    // Initialize game on mount
    useEffect(() => {
        resetGame();
    }, [mode, duration]);

    // Timer logic
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            endGame();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    // Calculate live WPM and Accuracy & Scroll
    useEffect(() => {
        if (isActive || isFinished) {
            calculateStats();
        }

        // Scroll to active character
        if (activeWordRef.current && wordContainerRef.current) {
            const container = wordContainerRef.current;
            const active = activeWordRef.current;

            // Simple logic: keep active element in the middle of the container
            const containerHeight = container.clientHeight;
            const activeTop = active.offsetTop;
            const containerTop = container.offsetTop;

            // Calculate relative position
            const relativeTop = activeTop - containerTop;

            // Scroll if we are past the middle
            if (relativeTop > containerHeight / 2) {
                container.scrollTop = relativeTop - containerHeight / 2;
            } else {
                container.scrollTop = 0;
            }
        }
    }, [userInput, timeLeft]);

    const resetGame = () => {
        if (mode === 'text') {
            setWords(generateWords(300));
            setSnippetTitle('');
        } else {
            const snippet = getRandomSnippet();
            setWords(snippet.code);
            setSnippetTitle(snippet.title);
        }
        setUserInput('');
        setTimeLeft(duration);
        setIsActive(false);
        setIsFinished(false);
        setWpm(0);
        setAccuracy(0);
        clearInterval(timerRef.current);
        // Reset scroll
        if (wordContainerRef.current) wordContainerRef.current.scrollTop = 0;
        // Focus input
        if (inputRef.current) inputRef.current.focus();
    };

    const startGame = () => {
        setIsActive(true);
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        setIsActive(false);
        setIsFinished(true);
        calculateStats();
        handleSaveScore(); // Auto-save when game ends
    };

    const calculateStats = () => {
        const timeElapsed = duration - timeLeft;
        const minutes = timeElapsed / 60;

        // Count correct characters
        let correctChars = 0;
        const wordsArray = words.split('');
        const inputArray = userInput.split('');

        inputArray.forEach((char, index) => {
            if (char === wordsArray[index]) {
                correctChars++;
            }
        });

        // WPM = (Correct Characters / 5) / Minutes
        // Avoid division by zero
        const calculatedWpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;

        // Accuracy = (Correct Characters / Total Typed) * 100
        const calculatedAccuracy = inputArray.length > 0
            ? Math.round((correctChars / inputArray.length) * 100)
            : 0;

        setWpm(calculatedWpm);
        setAccuracy(calculatedAccuracy);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Start timer on first keystroke if not already active
        if (!isActive && !isFinished) {
            startGame();
        }

        // Don't allow typing if finished
        if (isFinished) return;

        setUserInput(value);
    };

    const handleSaveScore = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            const result = await saveScore(wpm, accuracy, mode, duration);
            // Update local user state with new high score if applicable
            if (result.highScore > user.highScore) {
                setUser({ ...user, highScore: result.highScore });
                // We don't alert anymore, just update state to show badge in modal
            }
        } catch (error) {
            console.error('Failed to save score:', error);
            alert('Failed to save score. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Render the words with coloring
    const renderWords = () => {
        return words.split('').map((char, index) => {
            let color = '#94a3b8'; // Default gray (lighter for dark mode)
            const inputChar = userInput[index];

            if (inputChar === undefined) {
                color = '#94a3b8'; // Not typed yet
            } else if (inputChar === char) {
                color = '#4ade80'; // Correct (Green - lighter)
            } else {
                color = '#f87171'; // Incorrect (Red - lighter)
            }

            // Highlight current cursor position
            const isCurrent = index === userInput.length;

            return (
                <span
                    key={index}
                    ref={isCurrent ? activeWordRef : null}
                    style={{
                        color,
                        backgroundColor: isCurrent ? '#334155' : 'transparent',
                        fontSize: '24px',
                        fontFamily: 'monospace',
                        whiteSpace: mode === 'code' ? 'pre' : 'normal',
                        borderLeft: isCurrent ? '2px solid #f8fafc' : 'none', // Cursor effect
                        animation: isCurrent ? 'blink 1s step-end infinite' : 'none'
                    }}
                >
                    {char}
                </span>
            );
        });
    };

    return (
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Typing Speed Test</h1>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', fontSize: '18px' }}>Mode:</label>
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    style={{ padding: '5px', fontSize: '16px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #475569', borderRadius: '4px' }}
                    disabled={isActive}
                >
                    <option value="text">English</option>
                    <option value="code">Coding</option>
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', fontSize: '18px' }}>Time:</label>
                <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{ padding: '5px', fontSize: '16px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #475569', borderRadius: '4px' }}
                    disabled={isActive}
                >
                    <option value={15}>15s</option>
                    <option value={30}>30s</option>
                    <option value={60}>60s</option>
                </select>
            </div>

            {mode === 'code' && snippetTitle && (
                <h3 style={{ color: '#94a3b8', marginBottom: '10px' }}>Snippet: {snippetTitle}</h3>
            )}

            <Timer timeLeft={timeLeft} />

            {/* Word Display */}
            <div
                ref={wordContainerRef}
                style={{
                    marginBottom: '20px',
                    padding: '20px',
                    border: '1px solid #334155',
                    backgroundColor: '#1e293b',
                    borderRadius: '8px',
                    height: '150px', // Fixed height for scrolling
                    lineHeight: '1.5',
                    textAlign: 'left',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    overflowY: 'hidden', // Hide scrollbar but allow programmatic scrolling
                    overflowX: 'auto',
                    position: 'relative'
                }}
            >
                {renderWords()}
            </div>

            {/* Hidden Input Field (keeps focus to capture typing) */}
            <textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                style={{
                    opacity: 0,
                    position: 'absolute',
                    top: '-9999px'
                }}
                autoFocus
            />

            {/* Live Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div>
                    <h3>WPM</h3>
                    <p style={{ fontSize: '24px', color: '#2ed573' }}>{wpm}</p>
                </div>
                <div>
                    <h3>Accuracy</h3>
                    <p style={{ fontSize: '24px', color: '#3742fa' }}>{accuracy}%</p>
                </div>
            </div>

            <p style={{ marginTop: '20px', color: '#94a3b8' }}>
                {isActive ? 'Typing...' : 'Start typing to begin!'}
            </p>

            <button
                onClick={resetGame}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                Restart Test
            </button>

            {isFinished && (
                <ResultModal
                    wpm={wpm}
                    accuracy={accuracy}
                    onRestart={resetGame}
                    isSaving={isSaving}
                    user={user}
                    isHighScore={user && wpm >= user.highScore && wpm > 0}
                />
            )}
        </div>
    );
};

export default Home;
