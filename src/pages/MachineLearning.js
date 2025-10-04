// src/pages/Dashboard.js - 支援翻譯版本
import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Header from "../components/Header";
import MapView from "../components/MapView";
import SharkChart from "../components/SharkChart";
import { mlAPI } from "../services/api";

function MachineLearning() {
  const { t } = useTranslation();
  //readCSV();
  
  // 原有的狀態管理 - 修正為與Dashboard一致
  const [selectedSpecies, setSelectedSpecies] = useState([
    'Whale Shark', 'Tiger Shark'  // 確保只選中這兩個正確的物種
  ]);
  const [activeLayer, setActiveLayer] = useState('openstreetmap');
  const [visualizationMode, setVisualizationMode] = useState('markers');
  const [file, setFile] = useState(null);   // 🔹 CSV 檔案
  const [prediction, setPrediction] = useState(null); // 🔹 預測結果


  // 原有的切換邏輯
  const toggleSpecies = (species) => {
    if (selectedSpecies.includes(species)) {
      setSelectedSpecies(selectedSpecies.filter(s => s !== species));
    } else {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  const [predictionPoints, setPredictionPoints] = useState([]);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      console.log("📤 上傳檔案:", uploadedFile.name);

      // Step 1: 先做預測
      const response = await mlAPI.predictWithCsv(formData);
      console.log("✅ ML 預測回傳:", response);

      setPrediction(response);

      // Step 2: 自動送去訓練
      const trainResp = await mlAPI.trainWithCsv(formData);
      console.log("✅ ML 訓練完成:", trainResp);

      // Step 3: 把預測結果轉換成 {lat, lng, pred}
      if (response && response["預測"] && response["預測"]["值"]) {
        const features = response["文件資訊"]["功能名稱"];
        const latIdx = features.findIndex(f => f.includes("緯度"));
        const lngIdx = features.findIndex(f => f.includes("經度"));

        const points = response["原始資料"].map((row, i) => ({
         lat: parseFloat(row[latIdx]),
         lng: parseFloat(row[lngIdx]),
         pred: response["預測"]["值"][i],
         prob: response["預測"]["樣本機率"]?.[i]?.[1] ?? 0  // 🔹 class=1 機率
         }));

        setPredictionPoints(points);
      }


    } catch (err) {
      console.error("❌ ML 預測或訓練失敗:", err);
      alert(t('ml.fileUpload.resultAlert'));
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
              {['Whale Shark', 'Tiger Shark'].map(species => {
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
                  value: 'environmental', 
                  label: t('dashboard.environmentalData'), 
                  desc: t('dashboard.environmentalModeDesc')
                },
                { 
                   value: 'ml',
                   label: t('ml.MLProbabilityHeatmap'),
                   desc: t('MLProbabilityHeatmapDesc')
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
              {/* 移除了 Heatmap Mode 選項 */}
              
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
                <div className="stat-value">{selectedSpecies.length}/2</div>
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
            activeLayer={activeLayer}
            visualizationMode={visualizationMode}
            t={t}
          />
        </div>
        
        {/* 右側 sidebar */}
        <div className="sidebar">
          {/* 🔹 檔案上傳 + ML 預測 */}
          <div className="card" id="upload-area">
              <input
              
                type="file"
                accept=".csv"
                id="fileInput"
                style={{ display: "none"}}
                onChange={handleFileUpload}
              />

              {/* 自訂按鈕 */}
              <label
                htmlFor="fileInput"
                style={{
                  padding: "8px 15px",
                  borderRadius: "5px",
                  fontSize: "28px",
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>
                  <b>📁 {t('ml.fileUpload.title')}</b>
                  {file && <div>{t('ml.fileUpload.subtitle')}: <strong>{file.name}</strong></div>}
                </span>
              </label>


            {/* 🔹 顯示 ML 預測結果 */}
            {prediction && (
              <div style={{ marginTop: "12px" }}>
                <h4>📊 {t('ml.fileUpload.predictionResult')}</h4>
                <pre style={{ 
                  background: "#f8fafc", 
                  padding: "8px", 
                  borderRadius: "6px", 
                  fontSize: "12px", 
                  maxHeight: "200px", 
                  overflowY: "auto" 
                }}>
                  {JSON.stringify(prediction, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div style={{ marginTop: "12px", textAlign: "center" }}>
            <a
              href={`${process.env.PUBLIC_URL}/Sample_data.zip`}
              download="Sample_data.zip"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#3182ce",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#2b6cb0"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#3182ce"}
            >
              📥 {t('ml.example_csv')}
            </a>
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

export default MachineLearning;