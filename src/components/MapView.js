// src/components/MapView.js - 自定義圖標和色彩條版本
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import WindyColorBar from './WindyColorBar';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const getProbColor = (prob) => {
  if (prob > 0.8) return '#ff0000';   // 高機率 → 紅
  if (prob > 0.6) return '#ff8000';   // 中高 → 橘
  if (prob > 0.4) return '#ffff00';   // 中等 → 黃
  if (prob > 0.2) return '#80ff00';   // 低 → 綠
  return '#00ffcc';                   // 極低 → 藍綠
};


function MapView({ 
  selectedSpecies = [], 
  showHeatmap = false, 
  activeLayer = 'openstreetmap',
  visualizationMode = 'markers',
  t,
  selectedSlot = [],
  predictionPoints = [],
}) {
  const [sharks, setSharks] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [iconsLoaded, setIconsLoaded] = useState({});

  useEffect(() => {
    // 預載入自定義圖標
    const iconFiles = {
      'Shark_pin': `${process.env.PUBLIC_URL}/images/shark_pin.svg`,
      'Tiger Shark': `${process.env.PUBLIC_URL}/images/tiger-shark.png`,
      'Great White': `${process.env.PUBLIC_URL}/images/great-white.png`,
      'Hammerhead': `${process.env.PUBLIC_URL}/images/hammerhead.png`,
      'Whale Shark': `${process.env.PUBLIC_URL}/images/whale-shark.png`
    };

    const loadIcons = async () => {
      const loadedIcons = {};
      
      for (const [species, path] of Object.entries(iconFiles)) {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = path;
          });
          loadedIcons[species] = path;
          console.log(`✅ 載入圖標: ${species}`);
        } catch (error) {
          console.warn(`⚠️ 無法載入 ${species} 圖標，使用預設圖標`);
          loadedIcons[species] = null; // 使用預設圖標
        }
      }
      
      setIconsLoaded(loadedIcons);
    };

    loadIcons();

    // 載入鯊魚數據
    // 時間區間 → 對應的 JSON 檔案
    const slotToFileMap = {
      "2014-07-10_2014-07-16": "null.json",
      "2014-07-17_2014-07-23": "null.json",
      "2014-07-24_2014-07-30": "null.json",
      "2014-07-31_2014-08-06": "null.json",
      "2014-08-07_2014-08-13": "round_4_20140807_to_20140813.json",
      "2014-08-14_2014-08-20": "round_5_20140814_to_20140820.json",
      "2014-08-21_2014-08-27": "round_6_20140821_to_20140827.json",
      "2014-08-28_2014-09-03": "round_7_20140828_to_20140903.json",
      "2014-09-04_2014-09-10": "round_8_20140904_to_20140910.json",
      "2014-09-11_2014-09-17": "round_9_20140911_to_20140917.json",
      "2014-09-18_2014-09-25": "round_10_20140918_to_20140925.json",
      "2014-09-26_2014-10-02": "round_11_20140926_to_20141002.json",
      "2014-10-02_2014-10-07": "round_12_20141003_to_20141007.json",
      "2014-10-08_2014-10-14": "round_13_20141008_to_20141014.json",
      "2014-10-15_2014-10-21": "round_14_20141015_to_20141021.json",
      "2014-10-22_2014-10-28": "round_15_20141022_to_20141028.json",
      "2014-10-29_2014-11-04": "round_16_20141029_to_20141104.json",
      "2014-11-05_2014-11-11": "round_17_20141105_to_20141111.json",
      "2014-11-12_2014-11-18": "round_18_20141112_to_20141118.json",
      "2014-11-19_2014-11-25": "round_19_20141119_to_20141125.json",
      "2014-11-26_2014-12-02": "round_20_20141126_to_20141202.json",
      "2014-12-03_2014-12-09": "round_21_20141203_to_20141209.json",
      "2014-12-10_2014-12-16": "round_22_20141210_to_20141216.json",
      "2014-12-17_2014-12-22": "round_23_20141217_to_20141223.json",
      
    };

    let shark_data_path = "";

    if (selectedSlot && selectedSlot[0] && selectedSlot[1]) {
      const key = `${selectedSlot[0]}_${selectedSlot[1]}`;
      shark_data_path = slotToFileMap[key] || ""; // 找不到就給空字串
    }

    console.log("🦈 對應檔案:", shark_data_path);
    fetch(`${process.env.PUBLIC_URL}/sharks_data/${shark_data_path}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("載入鯊魚數據:", data);
        setSharks(data);
      })
      .catch((err) => console.error("載入鯊魚資料失敗：", err));

    // 載入環境數據
    fetch(`${process.env.PUBLIC_URL}/environmental_data.csv`)
      .then((res) => res.text())
      .then((csvText) => {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index]?.trim();
            return obj;
          }, {});
        });
        console.log("載入環境數據:", data);
        setEnvironmentalData(data);
      })
      .catch((err) => console.error("載入環境數據失敗：", err));
  }, [selectedSlot]);

  // 過濾鯊魚數據
  const filteredSharks = sharks.filter(shark => 
    selectedSpecies.includes(shark.species)
  );

  // 修正數據標記錯誤：數據中的 "Tiger Shark" 實際上是鯨鯊
  const adjustedSharks = sharks.map(shark => {
    // 將數據中的 "Tiger Shark" 映射為 "Whale Shark"，因為數據中的 Tiger Shark 實際是鯨鯊
    if (shark.species === 'Tiger Shark') {
      return { ...shark, species: 'Whale Shark' };
    }
    return shark;
  }).filter(shark => selectedSpecies.includes(shark.species));

  // 計算熱力圖數據
  const heatmapData = useMemo(() => {
    if (adjustedSharks.length === 0) return [];
    
    const gridSize = 5;
    const grid = {};
    
    adjustedSharks.forEach(shark => {
      const gridLat = Math.floor(shark.lat / gridSize) * gridSize;
      const gridLng = Math.floor(shark.lng / gridSize) * gridSize;
      const key = `${gridLat},${gridLng}`;
      
      if (!grid[key]) {
        grid[key] = {
          lat: gridLat + gridSize/2,
          lng: gridLng + gridSize/2,
          count: 0
        };
      }
      grid[key].count++;
    });

    return Object.values(grid);
  }, [adjustedSharks]);

  // 環境數據處理
  const processedEnvData = environmentalData.map(point => ({
    ...point,
    lat: parseFloat(point.lat),
    lng: parseFloat(point.lng),
    chlorophyll_a: parseFloat(point.chlorophyll_a) || 0,
    temperature: parseFloat(point.temperature) || 0,
    shark_sightings: parseInt(point.shark_sightings) || 0
  })).filter(point => !isNaN(point.lat) && !isNaN(point.lng));

  // 顏色和大小計算函數
  const getChlorophyllColor = (value) => {
    if (value > 1.2) return '#006837';
    if (value > 0.8) return '#31a354';
    if (value > 0.5) return '#78c679';
    if (value > 0.3) return '#c2e699';
    return '#f7fcf5';
  };

  const getDensityColor = (count, maxCount) => {
    const intensity = count / maxCount;
    if (intensity > 0.8) return '#ff0000';
    if (intensity > 0.6) return '#ff8000';
    if (intensity > 0.4) return '#ffff00';
    if (intensity > 0.2) return '#80ff00';
    return '#0080ff';
  };

  const getDensityRadius = (count, maxCount) => {
    const intensity = count / maxCount;
    return 20000 + (intensity * 80000);
  };

  const maxDensity = Math.max(...heatmapData.map(d => d.count), 1);

  // 地圖圖層設置
  const getTileLayerUrl = () => {
    switch(activeLayer) {
      case 'satellite':
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case 'terrain':
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const getTileLayerAttribution = () => {
    switch(activeLayer) {
      case 'satellite':
        return '&copy; Esri';
      case 'terrain':
        return '&copy; OpenTopoMap';
      default:
        return '&copy; OpenStreetMap contributors';
    }
  };

  // 獲取色彩條模式
  const getColorBarMode = () => {
  switch(visualizationMode) {
    case 'heatmap':
      return 'density';
    case 'environmental':
      return 'chlorophyll';
   case 'ml':
     return 'probability';  // 🔹 新增 ML 模式
      default:
        return null;
    }
  };


  return (
    <div style={{ position: 'relative' }}>
      {/* Windy 風格色彩條 */}
      {getColorBarMode() && (
        <WindyColorBar 
          mode={getColorBarMode()}
          position="bottom-right"
          t={t}
        />
      )}

      {/* 簡化的右上角圖例（只在標記模式顯示） */}
      {visualizationMode === 'markers' && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.95)',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '11px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '180px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{fontWeight: 'bold', marginBottom: '8px', color: '#2d3748'}}>
            🦈 {t('dashboard.mapView.trackingSpecies')}
          </div>
          
          <div>
            {selectedSpecies.map(species => (
              <div key={species} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '6px'
              }}>
                {/* 顯示自定義圖標預覽 */}
                {species === 'Whale Shark' && iconsLoaded['Shark_pin'] ? (
                  <img 
                    src={iconsLoaded['Shark_pin']}
                    alt={species}
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '8px',
                      objectFit: 'contain'
                    }}
                  />
                ) : iconsLoaded[species] ? (
                  <img 
                    src={iconsLoaded[species]}
                    alt={species}
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '8px',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '12px',
                    height: '12px', 
                    backgroundColor: getSpeciesColor(species, t),
                    borderRadius: '50%',
                    marginRight: '8px',
                    border: '1px solid white',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}></div>
                )}
                <span style={{ fontSize: '10px' }}>{getSpeciesName(species, t)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 數據統計 */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(255,255,255,0.95)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '11px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
          {
            visualizationMode === 'markers' ? `🦈 ${t('dashboard.mapView.dataDtatistics.shark', {count: adjustedSharks.length})}`:
            visualizationMode === 'heatmap' ? `🔥 ${t('dashboard.mapView.dataDtatistics.densityZones', {count: heatmapData.length})}` :
            `🌊 ${t('dashboard.mapView.dataDtatistics.monitoringPoints', {count: adjustedSharks.length})}`
          }
        </div>
      </div>

      <MapContainer
        center={[25.5, -90]}  // 墨西哥灣中心
        zoom={5}              // 適合墨西哥灣的縮放級別
        minZoom={4}           // 最小縮放（不能縮得太小）
        maxZoom={12}          // 最大縮放（可以放大看細節）
        maxBounds={[          // 限制可視範圍
          [18, -105],         // 西南角
          [33, -75]           // 東北角
        ]}
        maxBoundsViscosity={1.0}  // 邊界限制的強度
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url={getTileLayerUrl()}
          attribution={getTileLayerAttribution()}
        />
        
        {/* 鯊魚標記模式 - 使用自定義圖標 */}
        {visualizationMode === 'markers' && adjustedSharks.map((shark) => (
          <Marker 
            key={shark.id} 
            position={[shark.lat, shark.lng]}
            icon={createCustomSharkIcon(shark.species, iconsLoaded, t)}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                  padding: '10px',
                  backgroundColor: getSpeciesColor(shark.species, t) + '20',
                  borderRadius: '8px'
                }}>
                  {iconsLoaded[shark.species] && (
                    <img 
                      src={iconsLoaded[shark.species]}
                      alt={shark.species}
                      style={{
                        width: '24px',
                        height: '24px',
                        marginRight: '10px',
                        objectFit: 'contain'
                      }}
                    />
                  )}
                  <h3 style={{ 
                    margin: 0,
                    color: getSpeciesColor(shark.species, t),
                    fontSize: '16px'
                  }}>
                    {getSpeciesName(shark.species, t)}
                  </h3>
                </div>
                
                <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  <div><strong>🕐 時間:</strong> {new Date(shark.timestamp).toLocaleString()}</div>
                  <div><strong>📍 座標:</strong> {shark.lat.toFixed(4)}, {shark.lng.toFixed(4)}</div>
                  <div><strong>🏷️ ID:</strong> {shark.id}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 密度分佈模式 */}
        {visualizationMode === 'heatmap' && heatmapData.map((density, index) => (
          <Circle
            key={`density-${index}`}
            center={[density.lat, density.lng]}
            radius={getDensityRadius(density.count, maxDensity)}
            pathOptions={{
              color: getDensityColor(density.count, maxDensity),
              fillColor: getDensityColor(density.count, maxDensity),
              fillOpacity: 0.6,
              weight: 2,
              opacity: 0.8
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#2d3748', margin: '0 0 8px 0' }}>
                  🔥 密度熱點
                </h4>
                <div style={{ fontSize: '13px' }}>
                  <div><strong>區域:</strong> {density.lat.toFixed(2)}°, {density.lng.toFixed(2)}°</div>
                  <div><strong>鯊魚數量:</strong> {density.count} 隻</div>
                  <div><strong>密度等級:</strong> {
                    density.count / maxDensity > 0.8 ? '極高' :
                    density.count / maxDensity > 0.6 ? '高' :
                    density.count / maxDensity > 0.4 ? '中等' : '低'
                  }</div>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* 環境數據模式 */}
        {visualizationMode === 'environmental' && processedEnvData.map((point, index) => (
          <Circle
            key={`env-${index}`}
            center={[point.lat, point.lng]}
            radius={Math.max(10000, point.chlorophyll_a * 50000)}
            pathOptions={{
              color: getChlorophyllColor(point.chlorophyll_a),
              fillColor: getChlorophyllColor(point.chlorophyll_a),
              fillOpacity: 0.7,
              weight: 2,
              opacity: 0.9
            }}
          >
            <Popup>
              <div style={{ minWidth: '180px' }}>
                <h4 style={{ color: '#2e7d94', margin: '0 0 10px 0' }}>
                  🌊 海洋環境監測
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                  <div><strong>📍 座標:</strong> {point.lat.toFixed(3)}°, {point.lng.toFixed(3)}°</div>
                  <div><strong>🌿 葉綠素-a:</strong> {point.chlorophyll_a.toFixed(2)} mg/m³</div>
                  <div><strong>🌡️ 海溫:</strong> {point.temperature.toFixed(1)}°C</div>
                  <div><strong>🌊 深度:</strong> {point.depth}m</div>
                  <div><strong>🦈 目擊次數:</strong> {point.shark_sightings}次</div>
                  <div style={{
                    marginTop: '8px',
                    padding: '5px',
                    background: getChlorophyllColor(point.chlorophyll_a) + '40',
                    borderRadius: '4px',
                    fontSize: '11px'
                  }}>
                    營養狀態: {
                      point.chlorophyll_a > 1.2 ? '富營養' :
                      point.chlorophyll_a > 0.8 ? '中營養' :
                      point.chlorophyll_a > 0.5 ? '適中' : '貧營養'
                    }
                  </div>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
        {/* 🔹 ML Predicted Probability Heatmap */}
        {visualizationMode === 'ml' && predictionPoints.map((p, idx) => (
          <Circle
            key={`ml-${idx}`}
            center={[p.lat, p.lng]}
            radius={40000}  // 視需求調整
            pathOptions={{
              color: getProbColor(p.prob),
              fillColor: getProbColor(p.prob),
              fillOpacity: 0.5,
              weight: 1
            }}
          >
            <Popup>
              <div style={{ fontSize: '13px' }}>
                <strong>🦈 ML 預測</strong><br/>
                Lat: {p.lat.toFixed(3)}, Lng: {p.lng.toFixed(3)}<br/>
                Predicted Probability: {(p.prob * 100).toFixed(1)}%
              </div>
            </Popup>
          </Circle>
        ))}

      </MapContainer>
    </div>
  );
}

// 創建自定義鯊魚圖標
function createCustomSharkIcon(species, iconsLoaded, t) {
  const config = getSharkConfig(species, t);
  
  // 使用小圓點樣式
  return L.divIcon({
    html: `
      <div style="
        width: 12px;
        height: 12px;
        background: ${config.labelColor};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
      </div>
    `,
    className: 'custom-shark-dot',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -6],
  });
}

// 保持原有的輔助函數
function getSharkConfig(species, t) {
  const configs = {
    'Tiger Shark': { labelColor: '#FF0000', name: t('dashboard.tigerShark') }, // 虎鯊 → 橘色
    'Whale Shark': { labelColor: '#FF8C00', name: t('dashboard.whaleShark') }, // 鯨鯊 → 藍色
    // 'Hammerhead': { labelColor: '#00AA00', name: t('dashboard.hammerhead') }, // 雙髻鯊 → 綠色
    // 'Great White': { labelColor: '#FF0000', name: t('dashboard.greatWhite') } // 大白鯊 → 紅色
  };
  return configs[species] || configs['Whale Shark'];
}

function getSpeciesColor(species, t) {
  return getSharkConfig(species, t).labelColor;
}

function getSpeciesName(species, t) {
  return getSharkConfig(species, t).name;
}

export default MapView;