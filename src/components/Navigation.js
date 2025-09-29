// src/components/Navigation.js - 使用自製翻譯
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useTranslation();

  const languages = [
    { code: 'zh', name: '中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: currentLanguage === language.code ? 
              'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
            color: 'white',
            border: currentLanguage === language.code ? 
              '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.2)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: currentLanguage === language.code ? '600' : '400',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span>{language.flag}</span>
          <span>{language.name}</span>
        </button>
      ))}
    </div>
  );
}

function Navigation() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navItems = [
    { path: '/', label: t('navigation.home'), icon: '🏠' },
    { path: '/story', label: t('navigation.story'), icon: '📖' },
    { path: '/dashboard', label: t('navigation.dashboard'), icon: '🗺️' },
    { path: '/ml', label: t('navigation.ml'), icon: '🧠' },
    { path: '/detector', label: t('navigation.detector'), icon: '🔬' },
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
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* 導航選項 */}
          <div style={{ display: 'flex', gap: '1rem' }}>
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
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* 語言切換器 */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '25px',
            padding: '4px'
          }}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
