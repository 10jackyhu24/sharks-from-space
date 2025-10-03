// src/pages/Detector.js - 重新設計版本
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

function Detector() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>
          {t('detector.title')}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: '0.9'
        }}>
          {t('detector.subtitle')}
        </p>
      </section>

      <div style={{ padding: '60px 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* 系統概覽圖片 */}
          <section style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <h3 style={{
              fontSize: '2rem',
              color: '#2d3748',
              marginBottom: '2rem'
            }}>
              {t('detector.systemOverview')}
            </h3>
            <img 
              src={`${process.env.PUBLIC_URL}/images/detector2.png`} 
              alt="Detector system overview" 
              style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                margin: '0 auto',
                display: 'block'
              }} 
            />
            <p style={{
              fontSize: '1rem',
              color: '#718096',
              fontStyle: 'italic',
              marginTop: '1rem'
            }}>
              {t('detector.systemImageCaption')}
            </p>
          </section>

          {/* 第一部分：鯊魚本體搭載之整合式標籤 */}
          <section style={{ marginBottom: '5rem' }}>
            <h3 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              {t('detector.integratedTag.title')}
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              {t('detector.integratedTag.description')}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '🎯', titleKey: 'detector.feedingDetection.title', descKey: 'detector.feedingDetection.description' },
                { icon: '🧬', titleKey: 'detector.preyIdentification.title', descKey: 'detector.preyIdentification.description' },
                { icon: '🧠', titleKey: 'detector.aiProcessing.title', descKey: 'detector.aiProcessing.description' }
              ].map((component, index) => (
                <div key={index} className="card" style={{ 
                  padding: '2rem'
                }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {component.icon}
                  </div>
                  <h4 style={{ 
                    color: '#667eea', 
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {t(component.titleKey)}
                  </h4>
                  <p style={{ 
                    color: '#4a5568', 
                    fontSize: '0.9rem',
                    lineHeight: '1.6'
                  }}>
                    {t(component.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 第二部分：資料傳輸與量子安全鏈路 */}
          <section style={{ marginBottom: '5rem' }}>
            <h3 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              {t('detector.quantumLink.title')}
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              textAlign: 'center',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem'
            }}>
              {t('detector.quantumLink.description')}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '🌊', titleKey: 'detector.acousticUplink.title', descKey: 'detector.acousticUplink.description' },
                { icon: '⚓', titleKey: 'detector.seafloorNode.title', descKey: 'detector.seafloorNode.description' },
                { icon: '💫', titleKey: 'detector.quantumRepeater.title', descKey: 'detector.quantumRepeater.description' },
                { icon: '🔒', titleKey: 'detector.quantumProcessor.title', descKey: 'detector.quantumProcessor.description' },
                { icon: '☁️', titleKey: 'detector.cloudServer.title', descKey: 'detector.cloudServer.description' }
              ].map((node, index) => (
                <div key={index} className="card" style={{ 
                  padding: '1.5rem'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {node.icon}
                  </div>
                  <h4 style={{ 
                    color: '#667eea', 
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontSize: '1.1rem'
                  }}>
                    {t(node.titleKey)}
                  </h4>
                  <p style={{ 
                    color: '#4a5568', 
                    fontSize: '0.85rem',
                    lineHeight: '1.5'
                  }}>
                    {t(node.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Detector;
