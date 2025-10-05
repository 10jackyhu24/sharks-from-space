// src/pages/Dashboard.js - 修正版本
import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Header from "../components/Header";
import MapView from "../components/MapView";
import SharkChart from "../components/SharkChart";
import SharkProbability from '../components/SharkProbability';
import { Space } from 'antd';
import { mlAPI } from "../services/api";
import Papa from "papaparse";
import MLMapView from '../components/MLMapView';
import MLSharkProbability from '../components/MLSharkProbability';
import * as turf from "@turf/turf";

function Dashboard() {
  const { t } = useTranslation();
  
  // 狀態管理：預設選中兩種鯊魚
  const [selectedSpecies, setSelectedSpecies] = useState([
    'Whale Shark', 'Tiger Shark'  // 確保只選中這兩個正確的物種
  ]);
  const [activeLayer, setActiveLayer] = useState('openstreetmap');
  const [visualizationMode, setVisualizationMode] = useState('markers');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [file, setFile] = useState(null);   // 🔹 CSV 檔案
  const [prediction, setPrediction] = useState(null); // 🔹 預測結果
  const [predictionPoints, setPredictionPoints] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);



  const handleFileUpload = async (event) => {
  const uploadedFile = event.target.files[0];
  if (!uploadedFile) return;
  setFile(uploadedFile);

  // ✅ 1. 用 PapaParse 解析 CSV
  Papa.parse(uploadedFile, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      console.log("📄 CSV 內容:", results.data);

      // 把 CSV 的經緯度取出
      const filteredData = results.data.map(row => ({
        lat: parseFloat(row["Latitude"]),
        lng: parseFloat(row["Longitude"]),
      }));

      console.log("🎯 篩選後的欄位:", filteredData);

      // ✅ 定義墨西哥灣的多邊形邊界（順序與 shapely 相同）
      const gulfPolygon = turf.polygon([[
        [-88.340037, 21.632458],
        [-90.358898, 21.039513],
        [-90.613529, 20.171280],
        [-94.360244, 18.195934],
        [-97.725013, 21.902715],
        [-97.142999, 25.843384],
        [-96.815616, 28.224622],
        [-93.432660, 29.751845],
        [-90.140643, 29.102355],
        [-89.085742, 29.054669],
        [-88.678740, 30.317403],
        [-87.668368, 30.294529],
        [-85.328981, 29.664102],
        [-84.068312, 30.036088],
        [-82.755656, 28.745213],
        [-82.893000, 27.838119],
        [-81.198495, 25.153368],
        [-81.681720, 24.255506],
        [-84.488387, 22.530819],
        [-87.465895, 21.716910],
        [-88.340037, 21.632458],
      ]]);

      // ✅ 2. 呼叫後端 ML API
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await mlAPI.predictWithCsv(formData);
        const predictions = response['predictions']['values'];
        console.log("✅ ML 預測回傳:", predictions);

        // ✅ 3. 對應預測值
        const combinedData = filteredData.map((point, i) => ({
          ...point,
          prediction: predictions[i] ?? 0,
        }));

        // ✅ 4. 篩選出預測為 1 且在海洋內的點
        const positivePoints = combinedData.filter(d => {
          if (d.prediction !== 1) return false;
          const pt = turf.point([d.lng, d.lat]);
          return turf.booleanPointInPolygon(pt, gulfPolygon);
        });

        console.log("🌊 留下的有效海上點:", positivePoints);

        // ✅ 更新 state，傳給地圖畫
        setPrediction(predictions);
        setPredictionPoints(positivePoints);
        setMapPoints(positivePoints);

      } catch (err) {
        console.error("❌ ML 預測或訓練失敗:", err);
        alert(t('ml.fileUpload.resultAlert'));
      }
    }
  });
};


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
            {/* <span> ({t('dashboard.titleDesc')})</span> */}
          </h3>
          <MLMapView 
            points = {mapPoints}
            activeLayer={activeLayer}
            t={t}
          />
          <br />
          <h3 className="map-title"> 🗺️ {t('dashboard.mapView.sharkProbability')} </h3>
          <MLSharkProbability activeLayer={activeLayer} points={mapPoints} />
        </div>
        
        {/* 右側：圖表和資訊 */}
        <div className="sidebar">
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
            {/* {prediction && (
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
            )} */}
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