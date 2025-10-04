// src/components/Navigation.js - 調整導航順序版本
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
          onMouseEnter={(e) => {
            if (currentLanguage !== language.code) {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentLanguage !== language.code) {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0px)';
            }
          }}
        >
          <span>{language.flag}</span>
          <span>{language.name}</span>
        </button>
      ))}
    </div>
  );
}

// 圖標組件
function NavIcon({ src, alt, fallbackEmoji, size = '18px' }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      width: size, 
      height: size 
    }}>
      <img 
        src={src}
        alt={alt}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          transition: 'all 0.3s ease'
        }}
        onError={(e) => {
          // 如果 PNG 載入失敗，顯示 emoji 後備
          e.target.style.display = 'none';
          const emojiSpan = document.createElement('span');
          emojiSpan.textContent = fallbackEmoji;
          emojiSpan.style.fontSize = size;
          e.target.parentNode.appendChild(emojiSpan);
        }}
      />
    </div>
  );
}

function Navigation() {
  const location = useLocation();
  const { t } = useTranslation();
  
  // 🔄 調整順序：機器學習移到儀表板後面（第3位）
  const navItems = [
    { 
      path: '/', 
      label: t('navigation.home'), 
      icon: '/images/icon-home.png',
      fallbackEmoji: '🏠'
    },
    { 
      path: '/dashboard', 
      label: t('navigation.dashboard'), 
      icon: '/images/icon-dashboard.png',
      fallbackEmoji: '🗺️'
    },
    { 
      path: '/ml', 
      label: t('navigation.ml'), 
      icon: '/images/icon-ml.png',
      fallbackEmoji: '🧠'
    },
    { 
      path: '/detector', 
      label: t('navigation.detector'), 
      icon: '/images/icon-detector.png',
      fallbackEmoji: '🔬'
    }
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
        
        {/* Logo 和品牌區域 */}
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#2d3748',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {/* Logo 圖片 */}
          <img 
            src={`${process.env.PUBLIC_URL}/images/logo.png`} 
            alt="Sharks from Space Logo"
            style={{
              height: '45px',
              width: 'auto',
              objectFit: 'contain',
              transition: 'all 0.3s ease'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          
          {/* 後備 Emoji */}
          <span style={{ 
            display: 'none',
            fontSize: '2rem'
          }}>
            🦈
          </span>
          
          {/* 品牌名稱 */}
          <span>
            Sharks from Space
          </span>
        </Link>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* 導航選項 - 新順序：首頁 → 儀表板 → 機器學習 → 偵測器 */}
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
                <NavIcon 
                  src={item.icon}
                  alt={item.label}
                  fallbackEmoji={item.fallbackEmoji}
                  size="18px"
                />
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
