// src/pages/MachineLearning.js - 支援翻譯版本
import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

function MachineLearning() {
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
          {t('ml.title')}
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
          {t('ml.subtitle')}
        </p>
      </section>

      <div style={{ padding: '60px 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* SDM 介紹 */}
          <div className="card" style={{ padding: '3rem', marginBottom: '4rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#2d3748', marginBottom: '2rem' }}>
              {t('ml.sdmTitle')}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#667eea', fontSize: '1.8rem', marginBottom: '1rem' }}>
                  {t('ml.randomForest')}
                </h3>
                <div style={{ 
                  width: '200px', 
                  height: '200px', 
                  margin: '0 auto',
                  background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  🌲
                </div>
              </div>
              
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: '1.7' }}>
                  {t('ml.randomForestDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* 數據處理流程 */}
          <section style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: '#2d3748' }}>
              {t('ml.dataProcessing')}
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              {[
                {
                  icon: '🛰️',
                  title: '衛星數據',
                  items: ['SWOT 海面高度', 'PACE 葉綠素-a', 'MODIS 海溫']
                },
                {
                  icon: '⚙️', 
                  title: '特徵工程',
                  items: ['渦流偵測', '溫度梯度', '營養上升流']
                },
                {
                  icon: '🧠',
                  title: '模型訓練', 
                  items: ['隨機森林', '交叉驗證', '超參數調優']
                },
                {
                  icon: '📈',
                  title: '預測輸出',
                  items: ['棲地適宜性', '分佈熱點', '置信區間']
                }
              ].map((step, index) => (
                <div key={index} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
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
                    {step.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 模型效能指標 */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="card" style={{ padding: '3rem' }}>
              <h3 style={{ 
                fontSize: '2rem', 
                textAlign: 'center', 
                marginBottom: '3rem', 
                color: '#2d3748' 
              }}>
                {t('ml.performanceMetrics')}
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '2rem' 
              }}>
                {[
                  { key: 'accuracy', value: '94.2%', color: '#10B981' },
                  { key: 'precision', value: '91.7%', color: '#3B82F6' },
                  { key: 'recall', value: '89.3%', color: '#8B5CF6' },
                  { key: 'f1Score', value: '90.5%', color: '#F59E0B' }
                ].map(metric => (
                  <div key={metric.key} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      margin: '0 auto 1rem',
                      borderRadius: '50%',
                      background: `conic-gradient(${metric.color} ${parseFloat(metric.value)}%, #e5e7eb 0%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: metric.color
                      }}>
                        {metric.value}
                      </div>
                    </div>
                    <h4 style={{ color: '#2d3748', margin: 0 }}>
                      {t(`ml.${metric.key}`)}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 技術實現細節 */}
          <section>
            <h3 style={{
              fontSize: '2rem',
              textAlign: 'center', 
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              🔧 技術實現細節
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem' 
            }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  📊 特徵變數
                </h4>
                <ul style={{ color: '#4a5568', fontSize: '0.9rem', lineHeight: '1.6' }}>
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
                <ul style={{ color: '#4a5568', fontSize: '0.9rem', lineHeight: '1.6' }}>
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
                <ul style={{ color: '#4a5568', fontSize: '0.9rem', lineHeight: '1.6' }}>
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
