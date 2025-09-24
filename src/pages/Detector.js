// src/pages/Detector.js - 修復 3D 模型版本
import React, { useRef, useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';

// 3D 鯊魚標籤組件（完整保留）
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
      {/* 主要標籤體 */}
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* 3D 展示區域 */}
            <div className="card" style={{ height: '500px', padding: '2rem' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {t('detector.modelTitle')}
              </h3>
              
              {/* 3D Canvas - 完整保留 */}
              <div style={{ height: '400px', width: '100%' }}>
                <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <SharkTag />
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    enableRotate={true} 
                    maxDistance={10}
                    minDistance={2}
                  />
                </Canvas>
              </div>
              
              <p style={{ 
                textAlign: 'center', 
                marginTop: '1rem', 
                fontSize: '0.9rem',
                color: '#666'
              }}>
                {t('detector.interactionHint')}
              </p>
            </div>

            {/* 技術規格 */}
            <div>
              <h3 style={{
                fontSize: '2rem',
                color: '#2d3748',
                marginBottom: '2rem'
              }}>
                {t('detector.techSpecs')}
              </h3>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    {t('detector.communication.title')}
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    {t('detector.communication.description')}
                  </p>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    {t('detector.sensing.title')}
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    {t('detector.sensing.description')}
                  </p>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    {t('detector.power.title')}
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    {t('detector.power.description')}
                  </p>
                </div>

                <div className="card" style={{ padding: '1.5rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                    {t('detector.protection.title')}
                  </h4>
                  <p style={{ color: '#4a5568', margin: 0 }}>
                    {t('detector.protection.description')}
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
              {t('detector.workflow')}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '📍', titleKey: 'detector.deployment.title', descKey: 'detector.deployment.description' },
                { icon: '📊', titleKey: 'detector.dataCollection.title', descKey: 'detector.dataCollection.description' },
                { icon: '🛰️', titleKey: 'detector.satelliteTransmission.title', descKey: 'detector.satelliteTransmission.description' },
                { icon: '🧠', titleKey: 'detector.intelligentAnalysis.title', descKey: 'detector.intelligentAnalysis.description' }
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
                    {t(step.titleKey)}
                  </h4>
                  <p style={{ 
                    color: '#4a5568', 
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {t(step.descKey)}
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
