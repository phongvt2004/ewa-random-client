import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Random from './pages/Random';
import Ticket from './pages/Ticket';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Ticket />} />
          <Route path="random" element={<Random />} />
          <Route path="ticket" element={<Ticket />} />
        </Routes>
      </Router>
    </React.StrictMode>
  )
}

export default App;
