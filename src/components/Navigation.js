// src/components/Navigation.js - 完整導航版本
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '首頁', icon: '🏠' },
    { path: '/dashboard', label: '追蹤儀表板', icon: '🗺️' },
    { path: '/detector', label: '智能偵測器', icon: '🔬' },
    { path: '/ml', label: '機器學習', icon: '🧠' },
    { path: '/members', label: '研究團隊', icon: '👥' },
  ];

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#2d3748',
            textDecoration: 'none'
          }}
        >
          🦈 Sharks from Space
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                textDecoration: 'none',
                color: location.pathname === item.path ? '#667eea' : '#4a5568',
                fontWeight: location.pathname === item.path ? '600' : '500',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                background: location.pathname === item.path ? 
                  'linear-gradient(135deg, #667eea20, #764ba220)' : 'transparent',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.background = '#f7fafc';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0px)';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
