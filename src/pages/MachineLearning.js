// src/pages/MachineLearning.js
import React from 'react';

function MachineLearning() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
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
          🧠 機器學習架構
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: '0.9'
        }}>
          隨機森林演算法 · 物種分佈模型 · 棲地預測系統
        </p>
      </section>

      <div style={{ padding: '60px 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* 演算法概述 */}
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              🎯 Species Distribution Model (SDM)
            </h2>

            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem'
              }}>
                🌳🌳🌳
              </div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                隨機森林演算法
              </h3>
              <p style={{
                color: '#4a5568',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                結合多棵決策樹的集成學習方法，透過分析海洋環境特徵
                預測鯊魚棲地適宜性，提供高準確度的分佈預測模型
              </p>
            </div>
          </section>

          {/* 數據流程 */}
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              📊 數據處理流程
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { 
                  icon: '🛰️',
                  title: '衛星數據',
                  items: ['SWOT 海面高度', 'PACE 葉綠素-a', 'MODIS 海溫']
                },
                {
                  icon: '🔄',
                  title: '特徵工程',
                  items: ['渦流偵測', '溫度梯度', '營養上升流']
                },
                {
                  icon: '🧠',
                  title: '模型訓練',
                  items: ['隨機森林', '交叉驗證', '超參數調優']
                },
                {
                  icon: '🎯',
                  title: '預測輸出',
                  items: ['棲地適宜性', '分佈熱點', '置信區間']
                }
              ].map((step, index) => (
                <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {step.icon}
                  </div>
                  <h4 style={{ color: '#2d3748', marginBottom: '1rem' }}>
                    {step.title}
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    color: '#4a5568',
                    fontSize: '0.9rem'
                  }}>
                    {step.items.map((item, i) => (
                      <li key={i} style={{ marginBottom: '0.5rem' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 模型性能 */}
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              📈 模型效能指標
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { metric: '準確率', value: '87.3%', color: '#10B981' },
                { metric: '精確率', value: '84.7%', color: '#3B82F6' },
                { metric: '召回率', value: '89.1%', color: '#8B5CF6' },
                { metric: 'F1 分數', value: '86.8%', color: '#F59E0B' }
              ].map((item, index) => (
                <div key={index} className="card" style={{
                  padding: '2rem',
                  textAlign: 'center',
                  border: `3px solid ${item.color}20`,
                  background: `${item.color}05`
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: item.color,
                    marginBottom: '0.5rem'
                  }}>
                    {item.value}
                  </div>
                  <div style={{
                    color: '#4a5568',
                    fontWeight: '600'
                  }}>
                    {item.metric}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 技術細節 */}
          <section>
            <h2 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              ⚙️ 技術實現細節
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  🔢 特徵變數
                </h4>
                <ul style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  <li>海面高度異常 (SSHA)</li>
                  <li>葉綠素-a 濃度</li>
                  <li>海面溫度 (SST)</li>
                  <li>渦流強度與方向</li>
                  <li>深度與坡度</li>
                  <li>營養鹽分佈</li>
                </ul>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  🏗️ 模型架構
                </h4>
                <ul style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  <li>決策樹數量：500 棵</li>
                  <li>最大深度：15 層</li>
                  <li>最小樣本分割：5</li>
                  <li>特徵抽樣：√n 隨機選取</li>
                  <li>Bootstrap 抽樣：63.2%</li>
                  <li>交叉驗證：5-fold</li>
                </ul>
              </div>

              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  🎯 應用場景
                </h4>
                <ul style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  <li>即時棲地預測</li>
                  <li>保護區劃設</li>
                  <li>漁業管理建議</li>
                  <li>氣候變遷影響評估</li>
                  <li>生態廊道規劃</li>
                  <li>研究航次路線優化</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default MachineLearning;
