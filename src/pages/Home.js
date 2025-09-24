// src/pages/Home.js - 修正按鈕連結版本
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
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
            🦈 Sharks from Space
          </h1>
          <p style={{
            fontSize: '1.3rem',
            opacity: '0.95',
            lineHeight: '1.6',
            marginBottom: '3rem'
          }}>
            結合 NASA 衛星技術與海洋生物學，透過太空視角追蹤鯊魚，
            探索海洋生態系統的奧秘，為海洋保育開啟新篇章
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
            開始探索 →
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
            🌊 項目背景與故事
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛰️</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>衛星追蹤技術</h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                利用 NASA 最新的衛星數據，包括 SWOT、PACE、MODIS 等系統，
                從太空監測海洋環境變化與鯊魚活動軌跡。
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔬</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>智能標籤系統</h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                開發新型概念標籤，不僅追蹤鯊魚位置，更能即時偵測覓食行為，
                透過銥衛星傳輸數據建立預測模型。
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
              <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>機器學習預測</h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                運用隨機森林演算法建立物種分佈模型（SDM），
                預測鯊魚覓食棲地，為海洋保育提供科學依據。
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
              🎯 研究目標
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>生態保護</h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                  透過精確追蹤，了解鯊魚生態習性，制定更有效的海洋保護策略
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>漁業管理</h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                  預測鯊魚分佈區域，協助永續漁業發展與海洋資源管理
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '12px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>氣候研究</h4>
                <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                  以鯊魚為指標物種，研究氣候變遷對海洋生態系統的影響
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
            📅 項目里程碑
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
              { phase: '第一階段', title: '數據收集與整合', desc: '建立 NASA 衛星數據獲取管道，整合海洋環境資料' },
              { phase: '第二階段', title: '標籤系統開發', desc: '設計智能標籤原型，測試銥衛星通訊功能' },
              { phase: '第三階段', title: '機器學習模型', desc: '訓練物種分佈預測模型，驗證預測準確性' },
              { phase: '第四階段', title: '平台建置', desc: '開發互動式視覺化平台，提供即時監測功能' }
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
