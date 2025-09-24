// src/pages/Dashboard.js - 整合視覺化控制版本
import React, { useState } from 'react';
import Header from "../components/Header";
import MapView from "../components/MapView";
import SharkChart from "../components/SharkChart";

function Dashboard() {
  // 原有的狀態管理
  const [selectedSpecies, setSelectedSpecies] = useState([
    'Tiger Shark', 'Great White', 'Hammerhead'
  ]);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeLayer, setActiveLayer] = useState('openstreetmap');
  
  // 新增視覺化模式狀態
  const [visualizationMode, setVisualizationMode] = useState('markers');

  // 原有的切換邏輯
  const toggleSpecies = (species) => {
    if (selectedSpecies.includes(species)) {
      setSelectedSpecies(selectedSpecies.filter(s => s !== species));
    } else {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  return (
    <div className="app-container">
      <main className="main-grid">
        {/* 左側：整合的控制面板 */}
        <div className="control-panel">
          <h3 className="section-title">🎛️ 控制面板</h3>
          
          {/* 物種篩選 */}
          <div>
            <h4 className="section-subtitle">🐟 物種篩選</h4>
            <div className="checkbox-group">
              {['Tiger Shark', 'Great White', 'Hammerhead', 'Whale Shark'].map(species => (
                <label key={species} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedSpecies.includes(species)}
                    onChange={() => toggleSpecies(species)}
                  />
                  <span 
                    className="species-label"
                    style={{ color: getSpeciesColor(species) }}
                  >
                    {getSpeciesIcon(species)} {getSpeciesName(species)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 視覺化模式選擇 - 新增 */}
          <div>
            <h4 className="section-subtitle">🎨 視覺化模式</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { 
                  value: 'markers', 
                  label: '🦈 鯊魚標記', 
                  desc: `顯示 ${selectedSpecies.length > 0 ? selectedSpecies.length : 0} 個物種`
                },
                { 
                  value: 'heatmap', 
                  label: '🔥 密度分佈', 
                  desc: '熱力圖顯示鯊魚集中區域'
                },
                { 
                  value: 'environmental', 
                  label: '🌊 環境數據', 
                  desc: '海洋環境參數與營養分佈'
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

          {/* 地圖樣式選擇 - 改為下拉式 */}
          <div>
            <h4 className="section-subtitle">🗺️ 地圖樣式</h4>
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
              <option value="openstreetmap">🗺️ 標準地圖</option>
              <option value="satellite">🛰️ 衛星圖像</option>
              <option value="terrain">🏔️ 地形圖</option>
            </select>
          </div>

          {/* 顯示選項 */}
          <div>
            <h4 className="section-subtitle">👁️ 顯示選項</h4>
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
                <span className="species-label">🔥 熱力圖模式</span>
              </label>
              
              {/* 視覺化模式提示 */}
              <div style={{ 
                fontSize: '11px', 
                color: '#718096',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #e2e8f0'
              }}>
                <div><strong>當前模式:</strong> {
                  visualizationMode === 'markers' ? '🦈 鯊魚標記' :
                  visualizationMode === 'heatmap' ? '🔥 密度分佈' :
                  '🌊 環境數據'
                }</div>
                <div><strong>地圖樣式:</strong> {getLayerName(activeLayer)}</div>
              </div>
            </div>
          </div>

          {/* 即時統計 */}
          <div>
            <h4 className="section-subtitle">📊 即時統計</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">選中物種</div>
                <div className="stat-value">{selectedSpecies.length}/4</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">顯示狀態</div>
                <div className="stat-value">
                  {selectedSpecies.length > 0 ? '✅' : '❌'}
                </div>
              </div>
            </div>
            
            {/* 詳細統計 */}
            <div style={{ 
              marginTop: '12px',
              padding: '10px',
              background: '#f7fafc',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#4a5568'
            }}>
              <div style={{ marginBottom: '4px' }}>
                <strong>視覺化:</strong> {
                  visualizationMode === 'markers' ? '標記模式' :
                  visualizationMode === 'heatmap' ? '密度分析' : '環境監測'
                }
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>地圖:</strong> {getLayerName(activeLayer)}
              </div>
              <div>
                <strong>物種:</strong> {selectedSpecies.length > 0 ? selectedSpecies.join(', ') : '未選擇'}
              </div>
            </div>
          </div>
        </div>
        
        {/* 中間：地圖區域 */}
        <div className="map-container">
          <h3 className="map-title">
            🗺️ 鯊魚追蹤地圖
            <span className="species-count">
              ({
                visualizationMode === 'markers' ? `顯示 ${selectedSpecies.length} 個物種` :
                visualizationMode === 'heatmap' ? '密度分佈模式' :
                '環境數據模式'
              })
            </span>
          </h3>
          <MapView 
            selectedSpecies={selectedSpecies}
            showHeatmap={showHeatmap}
            activeLayer={activeLayer}
            visualizationMode={visualizationMode}
          />
        </div>
        
        {/* 右側：圖表和資訊 */}
        <div className="sidebar">
          <div className="card">
            <SharkChart />
          </div>
          
          <div className="card">
            <h3 className="section-title">📚 研究資訊</h3>
            <div className="research-info">
              <p><strong>項目名稱:</strong> Sharks from Space</p>
              <p><strong>數據來源:</strong> NASA 衛星追蹤</p>
              <p><strong>追蹤物種:</strong> {selectedSpecies.join(', ')}</p>
              <p><strong>研究目的:</strong> 海洋生態保護與鯊魚行為分析</p>
              <p><strong>更新頻率:</strong> 即時更新</p>
              <p><strong>覆蓋範圍:</strong> 全球海域</p>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">🌊 海洋數據</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">追蹤標籤</div>
                <div className="stat-value">3</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">數據點</div>
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
                visualizationMode === 'markers' ? '標記模式' :
                visualizationMode === 'heatmap' ? '密度模式' : '環境模式'
              }:</strong> {
                visualizationMode === 'markers' ? '顯示個別鯊魚精確位置' :
                visualizationMode === 'heatmap' ? '分析鯊魚聚集熱點區域' :
                '監測海洋環境與生態關聯'
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 保持原有的輔助函數
function getSpeciesColor(species) {
  const colors = {
    'Tiger Shark': '#FF8C00',
    'Great White': '#FF0000', 
    'Hammerhead': '#00AA00',
    'Whale Shark': '#0066FF'
  };
  return colors[species] || '#808080';
}

function getSpeciesIcon(species) {
  const icons = {
    'Tiger Shark': '🟠',
    'Great White': '🔴',
    'Hammerhead': '🟢',
    'Whale Shark': '🔵'
  };
  return icons[species] || '⚪';
}

function getSpeciesName(species) {
  const names = {
    'Tiger Shark': '虎鯊',
    'Great White': '大白鯊',
    'Hammerhead': '雙髻鯊',
    'Whale Shark': '鯨鯊'
  };
  return names[species] || species;
}

function getLayerName(layer) {
  const names = {
    'openstreetmap': '標準地圖',
    'satellite': '衛星圖像', 
    'terrain': '地形圖'
  };
  return names[layer] || layer;
}

export default Dashboard;
