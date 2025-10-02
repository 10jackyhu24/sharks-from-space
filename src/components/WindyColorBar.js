// src/components/WindyColorBar.js - Windy 風格色彩條
import React from 'react';

function WindyColorBar({ 
  mode, 
  minValue = 0, 
  maxValue = 100, 
  unit = '',
  position = 'bottom-right',
  t
}) {
  
  // 根據模式獲取漸變配置
  const getGradientConfig = () => {
    switch(mode) {
      case 'density':
        return {
          gradient: 'linear-gradient(to right, #0080ff 0%, #80ff00 20%, #ffff00 40%, #ff8000 60%, #ff4000 80%, #ff0000 100%)',
          title: t('dashboard.mapView.windyColorBar.density.title'),
          unit: t('dashboard.mapView.windyColorBar.density.unit'),
          steps: [0, 2, 5, 8, 12, 20]
        };
      case 'chlorophyll':
        return {
          gradient: 'linear-gradient(to right, #f7fcf5 0%, #c2e699 25%, #78c679 50%, #31a354 75%, #006837 100%)',
          title: t('dashboard.mapView.windyColorBar.chlorophyll.title'),
          unit: 'mg/m³',
          steps: [0, 0.3, 0.5, 0.8, 1.2, 2.0]
        };
      case 'temperature':
        return {
          gradient: 'linear-gradient(to right, #2166ac 0%, #67a9cf 20%, #d1e5f0 40%, #fddbc7 60%, #ef8a62 80%, #b2182b 100%)',
          title: t('dashboard.mapView.windyColorBar.temperature.title'),
          unit: '°C',
          steps: [5, 10, 15, 20, 25, 30]
        };
      default:
        return {
          gradient: 'linear-gradient(to right, #0080ff, #ff0000)',
          title: t('dashboard.mapView.windyColorBar.MLProbabilityHeatmap.unit'),
          unit: '',
          steps: [minValue, maxValue]
        };
    }
  };

  const config = getGradientConfig();
  
  // 位置樣式
  const getPositionStyle = () => {
    const base = {
      position: 'absolute',
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      backdropFilter: 'blur(10px)',
      padding: '12px'
    };

    switch(position) {
      case 'bottom-right':
        return { ...base, bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { ...base, bottom: '20px', left: '20px' };
      case 'top-right':
        return { ...base, top: '60px', right: '20px' };
      case 'top-left':
        return { ...base, top: '60px', left: '20px' };
      default:
        return { ...base, bottom: '20px', right: '20px' };
    }
  };

  return (
    <div style={getPositionStyle()}>
      {/* 標題 */}
      <div style={{ 
        fontSize: '12px', 
        fontWeight: '600', 
        color: '#2d3748',
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        {config.title}
      </div>

      {/* 色彩條容器 */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* 最大值標籤 */}
        <div style={{ 
          fontSize: '10px', 
          color: '#4a5568',
          marginBottom: '3px',
          fontWeight: '500'
        }}>
          {config.steps[config.steps.length - 1]} {config.unit}
        </div>

        {/* 色彩條主體 */}
        <div style={{
          width: '200px',
          height: '12px',
          background: config.gradient,
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '6px',
          position: 'relative',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
        }}>
          {/* 刻度標記 */}
          {config.steps.slice(1, -1).map((step, index) => {
            const position = ((step - config.steps[0]) / (config.steps[config.steps.length - 1] - config.steps[0])) * 100;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: `${position}%`,
                  width: '2px',
                  height: '16px',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '1px'
                }}
              />
            );
          })}
        </div>

        {/* 最小值標籤 */}
        <div style={{ 
          fontSize: '10px', 
          color: '#4a5568',
          marginTop: '3px',
          fontWeight: '500'
        }}>
          {config.steps[0]} {config.unit}
        </div>

        {/* 刻度值顯示 */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          width: '200px',
          marginTop: '5px',
          fontSize: '8px',
          color: '#718096'
        }}>
          {config.steps.map((step, index) => (
            <span key={index} style={{
              opacity: index === 0 || index === config.steps.length - 1 ? 0 : 1
            }}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* 說明文字 */}
      <div style={{ 
        fontSize: '9px', 
        color: '#718096',
        textAlign: 'center',
        marginTop: '6px',
        maxWidth: '200px',
        lineHeight: '1.3'
      }}>
        {mode === 'density' && '基於網格密度分析'}
        {mode === 'chlorophyll' && '海洋初級生產力指標'}
        {mode === 'temperature' && 'NASA 衛星觀測數據'}
      </div>
    </div>
  );
}

export default WindyColorBar;
