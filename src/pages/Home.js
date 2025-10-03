// src/pages/Home.js - 移除 Members 連結版本
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

function Home() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Smooth scroll to story section
  const scrollToStory = () => {
    const storySection = document.getElementById('mission-section');
    if (storySection) {
      storySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Smooth scroll to any section
  const scrollToSection = (targetId = 'mission-section') => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Full-Screen Hero Section with Background Image */}
      <section style={{
        height: '100vh',
        position: 'relative',
        background: `
          linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%),
          url('${process.env.PUBLIC_URL}/images/hero-background.png') center/cover no-repeat
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        
        {/* Animated Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite alternate'
        }}></div>
        
        {/* Hero Content */}
        <div style={{ 
          maxWidth: '1000px', 
          padding: '0 2rem',
          position: 'relative',
          zIndex: 2,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 1.2s ease-out'
        }}>
          
          {/* Logo and Main Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Logo */}
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo-white.png`}
              alt="Sharks from Space Logo"
              style={{
                height: 'clamp(60px, 10vw, 100px)',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
                transition: 'all 0.3s ease'
              }}
              onError={(e) => {
                e.target.src = `${process.env.PUBLIC_URL}/images/logo.png`;
                e.target.onerror = () => {
                  e.target.style.display = 'none';
                  const emojiBackup = e.target.nextSibling;
                  if (emojiBackup) {
                    emojiBackup.style.display = 'inline';
                  }
                };
              }}
            />
            
            {/* Fallback Emoji */}
            <span style={{ 
              display: 'none',
              fontSize: 'clamp(60px, 10vw, 100px)',
              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))'
            }}>
              🦈
            </span>
            
            {/* Main Title */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: '800',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              {t('home.heroTitle')}
            </h1>
          </div>
          
          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            fontWeight: '600',
            marginBottom: '2rem',
            opacity: '0.95',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            {t('home.heroSubtitle')}
          </p>
          
          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            lineHeight: '1.6',
            marginBottom: '2rem',
            opacity: '0.9',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            {t('home.heroDescription')}
          </p>
          
          {/* Mission Statement */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '1.5rem 2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            <p style={{
              fontSize: '1.1rem',
              fontStyle: 'italic',
              margin: 0,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)'
            }}>
              {t('home.heroMission')}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '3rem'
          }}>
            <Link 
              to="/dashboard"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(0px) scale(1)';
                e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
            >
              <span>🚀</span>
              {t('home.exploreButton')}
            </Link>
            
            <button
              onClick={scrollToStory}
              style={{
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.5)',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.borderColor = 'rgba(255,255,255,0.8)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                e.target.style.transform = 'translateY(0px)';
              }}
            >
              📖 {t('home.watchStory')}
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          onClick={() => scrollToSection('mission-section')}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateX(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateX(-50%) scale(1)';
          }}
        >
          <div style={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '25px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '10px',
              background: 'white',
              borderRadius: '2px',
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scroll 2s infinite'
            }}></div>
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '12px',
            marginTop: '10px',
            letterSpacing: '1px'
          }}>
            SCROLL
          </div>
        </div>
      </section>

      {/* 區域 1: Mission Section */}
      <section 
        id="mission-section"
        style={{
          padding: '100px 2rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#2d3748',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            {t('home.missionTitle')}
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            lineHeight: '1.8',
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: '4rem',
            textAlign: 'left'
          }}>
            {t('home.missionDesc')}
          </p>
          <img src={`${process.env.PUBLIC_URL}/images/fig1.png`} alt="Mission illustration" style={{width: '600px', margin: '2rem auto', display: 'block'}} />
          <p style={{
            fontSize: '1rem',
            color: '#718096',
            fontStyle: 'italic',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {t('home.missionImageCaption')}
          </p>
        </div>
      </section>

      {/* 區域 2: Technology Section */}
      <section 
        id="tech-section"
        style={{
          padding: '100px 2rem',
          background: 'white',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: '#2d3748',
              marginBottom: '3rem',
              fontWeight: '800'
            }}>
              {t('home.techTitle')}
            </h2>
            
            <div style={{
              maxWidth: '1000px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              <p style={{
                fontSize: '1.3rem',
                color: '#4a5568',
                lineHeight: '1.8',
                margin: '0'
              }}>
                {t('home.techDesc')}
              </p>
              <img src={`${process.env.PUBLIC_URL}/images/fig2.png`} alt="Technology highlight illustration" style={{width: '600px', margin: '2rem auto', display: 'block'}} />
              <p style={{
                fontSize: '1rem',
                color: '#718096',
                fontStyle: 'italic',
                marginTop: '1rem',
                textAlign: 'center'
              }}>
                {t('home.techImageCaption')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 區域 3: Method Section */}
      <section 
        id="method-section"
        style={{
          padding: '100px 2rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#2d3748',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            {t('home.methodTitle')}
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            lineHeight: '1.8',
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: '4rem',
            textAlign: 'left'
          }}>
            {t('home.methodDesc')}
          </p>
          <img src={`${process.env.PUBLIC_URL}/images/fig3.png`} alt="Method illustration" style={{width: '600px', margin: '2rem auto', display: 'block'}} />
          <p style={{
            fontSize: '1rem',
            color: '#718096',
            fontStyle: 'italic',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {t('home.methodImageCaption')}
          </p>
        </div>
      </section>

      {/* 區域 3.5: Results Section */}
      <section 
        id="results-section"
        style={{
          padding: '100px 2rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#2d3748',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            {t('home.resultsTitle')}
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            lineHeight: '1.8',
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: '4rem',
            textAlign: 'left'
          }}>
            {t('home.resultsDesc')}
          </p>
          <img src={`${process.env.PUBLIC_URL}/images/fig4.png`} alt="Results illustration" style={{width: '600px', margin: '2rem auto', display: 'block'}} />
          <p style={{
            fontSize: '1rem',
            color: '#718096',
            fontStyle: 'italic',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {t('home.resultsImageCaption')}
          </p>
          <img src={`${process.env.PUBLIC_URL}/images/fig5.png`} alt="Additional results illustration" style={{width: '600px', margin: '2rem auto', display: 'block'}} />
          <p style={{
            fontSize: '1rem',
            color: '#718096',
            fontStyle: 'italic',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {t('home.resultsImageCaption2')}
          </p>
        </div>
      </section>

      {/* 區域 3.6: Results2 Section */}
      <section 
        id="results2-section"
        style={{
          padding: '100px 2rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            color: '#2d3748',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            {t('home.results2Title')}
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: '#4a5568',
            lineHeight: '1.8',
            maxWidth: '1000px',
            margin: '0 auto',
            marginBottom: '4rem',
            textAlign: 'left'
          }}>
            {t('home.results2Desc')}
          </p>
          <img src={`${process.env.PUBLIC_URL}/images/fig6.png`} alt="Results2 illustration" style={{width: '600px', margin: '2rem auto', display: 'block'}} />
          <p style={{
            fontSize: '1rem',
            color: '#718096',
            fontStyle: 'italic',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {t('home.results2ImageCaption')}
          </p>
        </div>
      </section>

      {/* 區域 4: Vision Section */}
      <section 
        id="vision-section"
        style={{
          padding: '100px 2rem',
          background: 'white',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: '#2d3748',
              marginBottom: '3rem',
              fontWeight: '800'
            }}>
              {t('home.visionTitle')}
            </h2>
            
            <div style={{
              maxWidth: '1000px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              <p style={{
                fontSize: '1.3rem',
                color: '#4a5568',
                lineHeight: '1.8',
                margin: '0'
              }}>
                {t('home.visionDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes scroll {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.5; transform: translateX(-50%) translateY(10px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Home;
