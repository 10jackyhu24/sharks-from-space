// src/pages/Dashboard.js - 修正版本
import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Header from "../components/Header";
import MapView from "../components/MapView";
import SharkChart from "../components/SharkChart";
import SharkProbability from '../components/SharkProbability';
import { Space } from 'antd';

function Dashboard() {
  const { t } = useTranslation();
  
  // 狀態管理：預設選中兩種鯊魚
  const [selectedSpecies, setSelectedSpecies] = useState([
    'Whale Shark', 'Tiger Shark'  // 確保只選中這兩個正確的物種
  ]);
  const [activeLayer, setActiveLayer] = useState('openstreetmap');
  const [visualizationMode, setVisualizationMode] = useState('markers');
  const [selectedSlot, setSelectedSlot] = useState(null);

  // 物種切換邏輯
  const toggleSpecies = (species) => {
    if (selectedSpecies.includes(species)) {
      setSelectedSpecies(selectedSpecies.filter(s => s !== species));
    } else {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  // 物種配置 (已修正並簡化)
  const getSpeciesConfig = (species) => {
    const configs = {
      'Whale Shark': { color: '#FF8C00', icon: '🟠', name: t('species.whaleShark') },
      'Tiger Shark': { color: '#FF0000', icon: '🔴', name: t('species.tigerShark') },
    };
    // 提供一個預設值，以防萬一
    return configs[species] || { color: '#333', icon: '❓', name: species };
  };
  
  // 要顯示的物種列表 (已簡化)
  const availableSpecies = ['Whale Shark', 'Tiger Shark'];

  return (
    <div className="app-container">
      <main className="main-grid">
        {/* 左側：整合的控制面板 */}
        <div className="control-panel">
          <h3 className="section-title">{t('dashboard.controlPanel')}</h3>
          
          {/* 物種篩選 */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.speciesFilter')}</h4>
            <div className="checkbox-group">
              {availableSpecies.map(species => {
                const config = getSpeciesConfig(species);
                return (
                  <label key={species} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedSpecies.includes(species)}
                      onChange={() => toggleSpecies(species)}
                    />
                    <span 
                      className="species-label"
                      style={{ color: config.color }}
                    >
                      {config.icon} {config.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 視覺化模式選擇 (已移除 Environmental Data 和 Heatmap) */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.visualization')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { 
                  value: 'markers', 
                  label: t('dashboard.sharkMarkers'), 
                  desc: t('dashboard.markerModeDesc')
                }
              ].map(mode => (
                <label 
                  key={mode.value} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: visualizationMode === mode.value ? 
                      'linear-gradient(135deg, #667eea20, #764ba220)' : '#f8fafc',
                    border: visualizationMode === mode.value ? 
                      '2px solid #667eea' : '2px solid #e2e8f0',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="visualization"
                    value={mode.value}
                    checked={visualizationMode === mode.value}
                    onChange={(e) => setVisualizationMode(e.target.value)}
                    style={{ 
                      marginRight: '10px', 
                      marginTop: '2px',
                      accentColor: '#667eea'
                    }}
                  />
                  <div>
                    <div style={{ 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      color: '#2d3748',
                      marginBottom: '2px'
                    }}>
                      {mode.label}
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#718096', 
                      lineHeight: '1.3'
                    }}>
                      {mode.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 地圖樣式選擇 */}
          <div>
            <h4 className="section-subtitle">🗺️ {t('dashboard.mapStyle')}</h4>
            <select 
              className="custom-select"
              value={activeLayer}
              onChange={(e) => setActiveLayer(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <option value="openstreetmap">🗺️ {t('dashboard.standardMap')}</option>
              <option value="satellite">🛰️ {t('dashboard.satelliteImages')}</option>
              <option value="terrain">🏔️ {t('dashboard.terrainMap')}</option>
            </select>
          </div>

          {/* 顯示選項 (已移除熱力圖 checkbox) */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.displayOptions')}</h4>
            <div style={{ 
              background: '#f8fafc', 
              padding: '12px', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                fontSize: '11px', 
                color: '#718096'
              }}>
                <div><strong>{t('dashboard.currentMode')}:</strong> {
                  visualizationMode === 'markers' ? t('dashboard.sharkMarkers') : t('dashboard.densityDistribution')
                }</div>
                <div><strong>{t('dashboard.mapStyle')}:</strong> {getLayerName(activeLayer, t)}</div>
              </div>
            </div>
          </div>

          {/* 即時統計 (總數已更新) */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.realTimeStats')}</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">{t('dashboard.selectedSpecies')}</div>
                <div className="stat-value">{selectedSpecies.length}/{availableSpecies.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">{t('dashboard.displayStatus')}</div>
                <div className="stat-value">
                  {selectedSpecies.length > 0 ? '✅' : '❌'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 中間：地圖區域 */}
        <div className="map-container">
          <h3 className="map-title">
            🗺️ {t('dashboard.mapTitle')}
            <span className="species-count">
              ({
                visualizationMode === 'markers' ? t('dashboard.speciesDisplayed', {count: selectedSpecies.length}) : t('dashboard.densityMode')
              })
            </span>
            <span> ({t('dashboard.titleDesc')})</span>
          </h3>
          <MapView 
            selectedSpecies={selectedSpecies}
            activeLayer={activeLayer}
            visualizationMode={visualizationMode}
            t={t}
            selectedSlot={selectedSlot}
          />
          <br />
          <h3 className="map-title"> 🗺️ {t('dashboard.mapView.sharkProbability')} </h3>
          <SharkProbability selectedSlot={selectedSlot} activeLayer={activeLayer} />
        </div>
        
        {/* 右側：圖表和資訊 */}
        <div className="sidebar">
          <div className="card">
            <SharkChart 
              t={t}
              onTimeSlotChange={setSelectedSlot}
            />
          </div>
          
          <div className="card">
            <h3 className="section-title">{t('dashboard.researchInfo')}</h3>
            <div className="research-info">
              <p><strong>{t('dashboard.projectName')}:</strong> Sharks from Space</p>
              <p><strong>{t('dashboard.dataSource')}:</strong> {t('dashboard.satelliteTracking')}</p>
              <p><strong>{t('dashboard.trackedSpecies')}:</strong> {selectedSpecies.map(s => getSpeciesConfig(s).name).join(', ') || t('common.noneSelected')}</p>
              <p><strong>{t('dashboard.researchPurpose')}:</strong> {t('dashboard.researchPurposeDesc')}</p>
              <p><strong>{t('dashboard.updateFrequency')}:</strong> {t('common.realTimeUpdate')}</p>
              <p><strong>{t('dashboard.coverage')}:</strong> {t('common.globalCoverage')}</p>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">{t('dashboard.oceanData')}</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">{t('dashboard.trackingTags')}</div>
                <div className="stat-value">2</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">{t('dashboard.dataPoints')}</div>
                <div className="stat-value">~1K</div>
              </div>
            </div>
            
            {/* 視覺化模式說明 (已簡化) */}
            <div style={{ 
              marginTop: '12px',
              padding: '8px',
              background: '#f0f9ff',
              borderLeft: '3px solid #0ea5e9',
              borderRadius: '4px',
              fontSize: '11px'
            }}>
              <strong>📍 {
                visualizationMode === 'markers' ? t('dashboard.markingMode') : t('dashboard.densityMode')
              }:</strong> {
                visualizationMode === 'markers' ? t('dashboard.markerModeDesc') : t('dashboard.densityModeDesc')
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 輔助函數
function getLayerName(layer, t) {
  const names = {
    'openstreetmap':'🗺️  ' + t('dashboard.standardMap'),
    'satellite': '🛰️  ' + t('dashboard.satelliteImages'),
    'terrain': '🏔️ ' + t('dashboard.terrainMap')
  };
  return names[layer] || layer;
}

export default Dashboard;