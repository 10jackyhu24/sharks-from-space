// src/App.js - 移除 Members 頁面版本
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Detector from './pages/Detector';
import MachineLearning from './pages/MachineLearning';
// import Members from './pages/Members'; // ❌ 移除 Members 導入
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router basename="/sharks-from-space">
        <div className="app-container">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detector" element={<Detector />} />
            <Route path="/ml" element={<MachineLearning />} />
            {/* <Route path="/members" element={<Members />} /> */} {/* ❌ 移除 Members 路由 */}
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
