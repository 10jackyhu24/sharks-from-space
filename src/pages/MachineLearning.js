// src/pages/Dashboard.js - 支援翻譯版本
import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Header from "../components/Header";
import MapView from "../components/MapView";
import SharkChart from "../components/SharkChart";

function MachineLearning() {
  const { t } = useTranslation();
  readCSV();
  
  // 原有的狀態管理
  const [selectedSpecies, setSelectedSpecies] = useState([
    'Tiger Shark', 'Great White', 'Hammerhead'
  ]);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeLayer, setActiveLayer] = useState('openstreetmap');
  const [visualizationMode, setVisualizationMode] = useState('markers');

  // 原有的切換邏輯
  const toggleSpecies = (species) => {
    if (selectedSpecies.includes(species)) {
      setSelectedSpecies(selectedSpecies.filter(s => s !== species));
    } else {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  // 物種配置
  const getSpeciesConfig = (species) => {
    const configs = {
      'Tiger Shark': { color: '#FF8C00', icon: '🟠', name: t('species.tigerShark') },
      'Great White': { color: '#FF0000', icon: '🔴', name: t('species.greatWhite') },
      'Hammerhead': { color: '#00AA00', icon: '🟢', name: t('species.hammerhead') },
      'Whale Shark': { color: '#0066FF', icon: '🔵', name: t('species.whaleShark') }
    };
    return configs[species] || configs['Tiger Shark'];
  };

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
              {['Tiger Shark', 'Great White', 'Hammerhead', 'Whale Shark'].map(species => {
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

          {/* 視覺化模式選擇 */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.visualization')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { 
                  value: 'markers', 
                  label: t('dashboard.sharkMarkers'), 
                  desc: t('dashboard.markerModeDesc')
                },
                { 
                  value: 'heatmap', 
                  label: t('dashboard.densityDistribution'), 
                  desc: t('dashboard.densityModeDesc')
                },
                { 
                  value: 'environmental', 
                  label: t('dashboard.environmentalData'), 
                  desc: t('dashboard.environmentalModeDesc')
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

          {/* 顯示選項 */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.displayOptions')}</h4>
            <div style={{ 
              background: '#f8fafc', 
              padding: '12px', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <label className="checkbox-item" style={{ marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                />
                <span className="species-label">🔥 {t('dashboard.heatmapMode')}</span>
              </label>
              
              {/* 視覺化模式提示 */}
              <div style={{ 
                fontSize: '11px', 
                color: '#718096',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #e2e8f0'
              }}>
                <div><strong>{t('dashboard.currentMode')}:</strong> {
                  visualizationMode === 'markers' ? t('dashboard.sharkMarkers') :
                  visualizationMode === 'heatmap' ? t('dashboard.densityDistribution') :
                  t('dashboard.environmentalData')
                }</div>
                <div><strong>{t('dashboard.mapStyle')}:</strong> {getLayerName(activeLayer, t)}</div>
              </div>
            </div>
          </div>

          {/* 即時統計 */}
          <div>
            <h4 className="section-subtitle">{t('dashboard.realTimeStats')}</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">{t('dashboard.selectedSpecies')}</div>
                <div className="stat-value">{selectedSpecies.length}/4</div>
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
                visualizationMode === 'markers' ? t('dashboard.speciesDisplayed', {count: selectedSpecies.length}) :
                visualizationMode === 'heatmap' ? t('dashboard.densityMode') :
                t('dashboard.environmentMode')
              })
            </span>
          </h3>
          <MapView 
            selectedSpecies={selectedSpecies}
            showHeatmap={showHeatmap}
            activeLayer={activeLayer}
            visualizationMode={visualizationMode}
            t={t}
          />
        </div>
        
        {/* 右側：圖表和資訊 */}
        <div className="sidebar">
          <div className="card" id="upload-area">
            <h3>📁 {t('ml.fileUpload.title')}</h3>
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">☁️</div>
                <div class="upload-text">{t('ml.fileUpload.subtitle')}</div>
                {/* <input type="file" id="fileInput" onChange={readCSV()}/> */}
            </div>
            <div class="file-list" id="fileList"></div>

            {/* <button class="upload-btn" id="uploadBtn" onclick={printData()}>上傳檔案</button> */}
            <div class="message" id="message"></div>
          </div>
          
          <div className="card">
            <h3 className="section-title">{t('dashboard.researchInfo')}</h3>
            <div className="research-info">
              <p><strong>{t('dashboard.projectName')}:</strong> Sharks from Space</p>
              <p><strong>{t('dashboard.dataSource')}:</strong> {t('dashboard.satelliteTracking')}</p>
              <p><strong>{t('dashboard.trackedSpecies')}:</strong> {selectedSpecies.map(s => getSpeciesConfig(s).name).join(', ')}</p>
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
                <div className="stat-value">3</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">{t('dashboard.dataPoints')}</div>
                <div className="stat-value">1.2K</div>
              </div>
            </div>
            
            {/* 視覺化模式說明 */}
            <div style={{ 
              marginTop: '12px',
              padding: '8px',
              background: '#f0f9ff',
              borderLeft: '3px solid #0ea5e9',
              borderRadius: '4px',
              fontSize: '11px'
            }}>
              <strong>📍 {
                visualizationMode === 'markers' ? t('dashboard.markingMode') :
                visualizationMode === 'heatmap' ? t('dashboard.densityMode') : t('dashboard.environmentMode')
              }:</strong> {
                visualizationMode === 'markers' ? t('dashboard.markerModeDesc') :
                visualizationMode === 'heatmap' ? t('dashboard.densityModeDesc') :
                t('dashboard.environmentalModeDesc')
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

// let csvData = []

// function loadCSV(event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = function(e) {
//     const text = e.target.result;
//     parseCSV(text);
//   };
//   reader.readAsText(file);
// }

// function parseCSV(csvText) {
//   const lines = csvText.split('\n').filter(line => line.trim());
//   csvData = []; // 清空舊資料
  
//   for (let i = 1; i < lines.length; i++) {
//     const values = lines[i].split(',').map(v => v.trim());
//     if (values.length >= 5) {
//       csvData.push({
//         name: values[0],
//         age: parseInt(values[1]) || 0,
//         class: values[2],
//         fare: parseFloat(values[3]) || 0,
//         port: values[4]
//       });
//     }
//   }
  
//   console.log('檔案已載入,共', csvData.length, '筆資料');
// }

// function printData() {
//   if (csvData.length === 0) {
//     console.log('⚠️ 尚未載入任何資料!');
//     alert('請先選擇 CSV 檔案');
//     return;
//   }
  
//   console.log('=== 印出所有資料 ===');
//   console.log('總共', csvData.length, '筆資料');
//   console.log(csvData); // 印出整個陣列
  
//   // 逐筆印出
//   csvData.forEach((item, index) => {
//     console.log(`第 ${index + 1} 筆:`, item);
//   });
// }

function readCSV() {
  fetch('./data/multi_shark_ocean_features_14_individuals.csv')
  .then(response => response.text())
  .then(text => {
    console.log(text);
  });
}

export default MachineLearning;
