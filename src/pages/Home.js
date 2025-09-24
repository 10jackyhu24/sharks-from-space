// src/pages/Home.js - 支援翻譯版本
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

function Home() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '2rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            🦈 {t('home.title')}
          </h1>
          <p style={{
            fontSize: '1.3rem',
            opacity: '0.95',
            lineHeight: '1.6',
            marginBottom: '3rem'
          }}>
            {t('home.subtitle')}
          </p>
          <Link 
            to="/dashboard"
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateY(0px)';
            }}
          >
            {t('home.exploreButton')}
          </Link>
        </div>
      </section>

      {/* Project Story */}
      <section style={{ padding: '80px 2rem', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2d3748'
          }}>
            {t('home.projectBackground')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛰️</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>
                {t('home.satelliteTech.title')}
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                {t('home.satelliteTech.description')}
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔬</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>
                {t('home.smartTag.title')}
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                {t('home.smartTag.description')}
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>
                {t('home.machineLearning.title')}
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                {t('home.machineLearning.description')}
              </p>
            </div>
          </div>

          {/* Research Goals */}
          <div className="card" style={{ padding: '3rem' }}>
            <h3 style={{
              fontSize: '2rem',
              color: '#2d3748',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              {t('home.researchGoals')}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                  {t('home.conservation.title')}
                </h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                  {t('home.conservation.description')}
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                  {t('home.fisheries.title')}
                </h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                  {t('home.fisheries.description')}
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                  {t('home.climate.title')}
                </h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                  {t('home.climate.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 2rem', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2d3748'
          }}>
            {t('home.milestones')}
          </h2>
          
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(to bottom, #667eea, #764ba2)',
              transform: 'translateX(-50%)'
            }}></div>
            
            {[
              { 
                phase: t('home.phase1.title') || '第一階段', 
                title: t('home.phase1.name') || '數據收集與整合', 
                desc: t('home.phase1.desc') || '建立 NASA 衛星數據獲取管道，整合海洋環境資料' 
              },
              { 
                phase: t('home.phase2.title') || '第二階段', 
                title: t('home.phase2.name') || '標籤系統開發', 
                desc: t('home.phase2.desc') || '設計智能標籤原型，測試銥衛星通訊功能' 
              },
              { 
                phase: t('home.phase3.title') || '第三階段', 
                title: t('home.phase3.name') || '機器學習模型', 
                desc: t('home.phase3.desc') || '訓練物種分佈預測模型，驗證預測準確性' 
              },
              { 
                phase: t('home.phase4.title') || '第四階段', 
                title: t('home.phase4.name') || '平台建置', 
                desc: t('home.phase4.desc') || '開發互動式視覺化平台，提供即時監測功能' 
              }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '3rem',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
              }}>
                <div style={{
                  flex: '1',
                  padding: index % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem',
                  textAlign: index % 2 === 0 ? 'right' : 'left'
                }}>
                  <div className="card" style={{ display: 'inline-block', maxWidth: '300px' }}>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>{item.phase}</h4>
                    <h5 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{item.title}</h5>
                    <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: '#667eea',
                  borderRadius: '50%',
                  border: '3px solid white',
                  boxShadow: '0 0 10px rgba(102, 126, 234, 0.3)',
                  zIndex: 1
                }}></div>
                <div style={{ flex: '1' }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
