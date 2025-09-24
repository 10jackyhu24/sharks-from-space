// src/pages/Detector.js
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';

// 3D 鯊魚標籤組件
function SharkTag({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* 標籤主體 */}
      <Box
        ref={meshRef}
        args={[1, 0.3, 0.1]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial color={hovered ? '#FF6B6B' : '#4ECDC4'} />
      </Box>
      
      {/* 天線 */}
      <Box args={[0.05, 0.8, 0.05]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#2C3E50" />
      </Box>
      
      {/* 標籤文字 */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.1}
        color="#2C3E50"
        anchorX="center"
        anchorY="middle"
      >
        Shark Tag v2.0
      </Text>
    </group>
  );
}

function Detector() {
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
          🔬 智能鯊魚偵測器
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: '0.9'
        }}>
          新一代概念標籤 · 即時行為偵測 · 銥衛星通訊
        </p>
      </section>

      <div style={{ padding: '60px 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* 3D 展示 */}
            <div className="card" style={{ height: '500px', padding: '2rem' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                🎮 3D 標籤模型
              </h3>
              <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <SharkTag />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              </Canvas>
              <p style={{ 
                textAlign: 'center', 
                marginTop: '1rem', 
                fontSize: '0.9rem',
                color: '#666'
              }}>
                滑鼠拖拽旋轉 • 滾輪縮放 • 點擊標籤互動
              </p>
            </div>

            {/* 規格介紹 */}
            <div>
              <h3 style={{
                fontSize: '2rem',
                color: '#2d3748',
                marginBottom: '2rem'
              }}>
                🚀 技術規格
              </h3>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    📡 通訊系統
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    銥衛星即時通訊 • 全球覆蓋 • 低功耗設計
                  </p>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    🎯 感測功能
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    高頻加速度感測 • 覓食行為識別 • GPS 定位追蹤
                  </p>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    🔋 電源管理
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    事件觸發式啟動 • 太陽能充電 • 超長待機時間
                  </p>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    🌊 防護設計
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    深海防水 • 抗壓耐腐蝕 • 生物相容材質
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 工作流程 */}
          <section style={{ marginTop: '5rem' }}>
            <h3 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              ⚡ 工作流程
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '📍', title: '標籤部署', desc: '安全附著於鯊魚背鰭，開始追蹤任務' },
                { icon: '📊', title: '數據收集', desc: '持續監測位置、行為、環境參數' },
                { icon: '🛰️', title: '衛星傳輸', desc: '透過銥衛星即時上傳關鍵數據' },
                { icon: '🧠', title: '智能分析', desc: 'AI 演算法識別覓食、游泳等行為模式' }
              ].map((step, index) => (
                <div key={index} className="card" style={{ 
                  textAlign: 'center', 
                  padding: '2rem' 
                }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem' 
                  }}>
                    {step.icon}
                  </div>
                  <h4 style={{ 
                    color: '#2d3748', 
                    marginBottom: '1rem' 
                  }}>
                    {step.title}
                  </h4>
                  <p style={{ 
                    color: '#4a5568', 
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {step.desc}
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
