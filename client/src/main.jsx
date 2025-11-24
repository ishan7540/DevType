/**
 * main.jsx
 * Entry point for the React application.
 * 
 * Responsibilities:
 * 1. Find the root element in index.html.
 * 2. Render the React application into that root.
 * 3. Wrap the App in BrowserRouter to enable routing.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css' // We will create a simple CSS file later or rely on inline styles

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* BrowserRouter enables the use of Routes and Route components */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
