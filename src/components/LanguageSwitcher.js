// src/components/LanguageSwitcher.js - 自製版本
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

function LanguageSwitcher({ style = {} }) {
  const { currentLanguage, changeLanguage } = useTranslation();

  const languages = [
    { code: 'zh', name: '中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ...style
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

export default LanguageSwitcher;
