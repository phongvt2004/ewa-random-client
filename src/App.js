import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Random from './pages/Random';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Random />} />
          <Route path="random" element={<Random />} />
        </Routes>
      </Router>
    </React.StrictMode>
  )
}

export default App;
