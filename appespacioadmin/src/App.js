// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Import the Login component
import ConserjeMain from './components/ConserjeMain'; // Import the main component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/conserjeMain" element={<ConserjeMain />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
