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
      <section>
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
          {/* Hero Section */}
          <section style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '60px 2rem',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              {t('members.title')}
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
              {t('members.subtitle')}
            </p>
          </section>

          <div style={{ padding: '60px 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              
              {/* 團隊介紹 */}
              <div className="card" style={{ padding: '3rem', marginBottom: '4rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  color: '#2d3748',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  {t('members.aboutTeam')}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  textAlign: 'center',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}>
                  {t('members.teamDescription')}
                </p>
              </div>

              {/* 團隊成員 */}
              <section style={{ marginBottom: '4rem' }}>
                <h3 style={{
                  fontSize: '2rem',
                  textAlign: 'center',
                  marginBottom: '3rem',
                  color: '#2d3748'
                }}>
                  👥 核心團隊成員
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem'
                }}>
                  {[
                    {
                      name: 'Dr. Sarah Chen',
                      role: '海洋生物學家',
                      expertise: '鯊魚生態行為研究',
                      icon: '🦈',
                      color: '#3B82F6'
                    },
                    {
                      name: 'Prof. Michael Rodriguez', 
                      role: '衛星技術專家',
                      expertise: 'NASA 數據分析',
                      icon: '🛰️',
                      color: '#10B981'
                    },
                    {
                      name: 'Dr. Emily Wang',
                      role: '機器學習工程師', 
                      expertise: '物種分佈模型',
                      icon: '🧠',
                      color: '#8B5CF6'
                    },
                    {
                      name: 'Alex Kim',
                      role: '軟體開發工程師',
                      expertise: '全端開發與視覺化',
                      icon: '💻',
                      color: '#F59E0B'
                    },
                    {
                      name: 'Dr. James Liu',
                      role: '數據科學家',
                      expertise: '海洋大數據分析',
                      icon: '📊',
                      color: '#EF4444'
                    },
                    {
                      name: 'Maria Garcia',
                      role: '項目協調員',
                      expertise: '跨領域團隊管理',
                      icon: '🤝',
                      color: '#06B6D4'
                    }
                  ].map((member, index) => (
                    <div key={index} className="card" style={{
                      padding: '2rem',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
                    >
                      <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1rem',
                        background: `linear-gradient(135deg, ${member.color}20, ${member.color}40)`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        border: `3px solid ${member.color}`
                      }}>
                        {member.icon}
                      </div>
                      <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
                        {member.name}
                      </h4>
                      <p style={{ 
                        color: member.color, 
                        fontWeight: '600', 
                        marginBottom: '0.5rem' 
                      }}>
                        {member.role}
                      </p>
                      <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                        {member.expertise}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 合作機構 */}
              <section>
                <h3 style={{
                  fontSize: '2rem',
                  textAlign: 'center',
                  marginBottom: '3rem',
                  color: '#2d3748'
                }}>
                  {t('members.collaboration')}
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '2rem'
                }}>
                  {[
                    {
                      name: 'NASA',
                      description: '衛星數據提供與技術支援',
                      icon: '🚀',
                      color: '#DC2626'
                    },
                    {
                      name: 'OCEARCH',
                      description: '鯊魚追蹤數據合作夥伴',
                      icon: '🦈',
                      color: '#2563EB'
                    },
                    {
                      name: '海洋研究所',
                      description: '海洋生態學術研究合作',
                      icon: '🏛️',
                      color: '#059669'
                    },
                    {
                      name: '國家太空中心',
                      description: '太空技術應用指導',
                      icon: '🛰️',
                      color: '#7C3AED'
                    }
                  ].map((partner, index) => (
                    <div key={index} className="card" style={{
                      padding: '2rem',
                      textAlign: 'center',
                      border: `2px solid ${partner.color}30`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = partner.color;
                      e.target.style.boxShadow = `0 10px 25px ${partner.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = `${partner.color}30`;
                      e.target.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                      }}>
                        {partner.icon}
                      </div>
                      <h4 style={{ 
                        color: partner.color, 
                        marginBottom: '1rem',
                        fontSize: '1.3rem'
                      }}>
                        {partner.name}
                      </h4>
                      <p style={{ 
                        color: '#4a5568', 
                        fontSize: '0.9rem',
                        lineHeight: '1.5'
                      }}>
                        {partner.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* 聯絡資訊 */}
              <div className="card" style={{ 
                padding: '3rem', 
                marginTop: '4rem',
                background: 'linear-gradient(135deg, #667eea10, #764ba210)',
                border: '2px solid #667eea30',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#2d3748', marginBottom: '2rem' }}>
                  📧 聯絡我們
                </h3>
                <p style={{ color: '#4a5568', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  對我們的研究感興趣？歡迎與我們聯繫！
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '2rem',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <strong style={{ color: '#667eea' }}>📧 Email:</strong>
                    <div>sharks.from.space@research.org</div>
                  </div>
                  <div>
                    <strong style={{ color: '#667eea' }}>🐦 Twitter:</strong>
                    <div>@SharksFromSpace</div>
                  </div>
                  <div>
                    <strong style={{ color: '#667eea' }}>🔗 GitHub:</strong>
                    <div>github.com/sharks-from-space</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
