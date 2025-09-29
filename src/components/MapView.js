// src/components/MapView.js - 自定義圖標和色彩條版本
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import WindyColorBar from './WindyColorBar';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

function MapView({ 
  selectedSpecies = [], 
  showHeatmap = false, 
  activeLayer = 'openstreetmap',
  visualizationMode = 'markers',
  t
}) {
  const [sharks, setSharks] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [iconsLoaded, setIconsLoaded] = useState({});

  useEffect(() => {
    // 預載入自定義圖標
    const iconFiles = {
      'Shark_pin': '/images/icons/shark_pin.svg',
      'Tiger Shark': '/images/icons/tiger-shark.png',
      'Great White': '/images/icons/great-white.png',
      'Hammerhead': '/images/icons/hammerhead.png',
      'Whale Shark': '/images/icons/whale-shark.png'
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
    fetch("/sharks.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("載入鯊魚數據:", data);
        setSharks(data);
      })
      .catch((err) => console.error("載入鯊魚資料失敗：", err));

    // 載入環境數據
    fetch("/environmental_data.csv")
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
  }, []);

  // 過濾鯊魚數據
  const filteredSharks = sharks.filter(shark => 
    selectedSpecies.includes(shark.species)
  );

  // 計算熱力圖數據
  const heatmapData = useMemo(() => {
    if (filteredSharks.length === 0) return [];
    
    const gridSize = 5;
    const grid = {};
    
    filteredSharks.forEach(shark => {
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
  }, [filteredSharks]);

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
            {['Tiger Shark', 'Great White', 'Hammerhead', 'Whale Shark'].map(species => (
              <div key={species} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '6px',
                opacity: selectedSpecies.includes(species) ? 1 : 0.4
              }}>
                {/* 顯示自定義圖標預覽 */}
                {iconsLoaded[species] ? (
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
            visualizationMode === 'markers' ? `🦈 ${t('dashboard.mapView.dataDtatistics.shark', {count: filteredSharks.length})}`:
            visualizationMode === 'heatmap' ? `🔥 ${t('dashboard.mapView.dataDtatistics.densityZones', {count: heatmapData.length})}` :
            `🌊 ${t('dashboard.mapView.dataDtatistics.monitoringPoints', {count: filteredSharks.length})}`
          }
        </div>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url={getTileLayerUrl()}
          attribution={getTileLayerAttribution()}
        />
        
        {/* 鯊魚標記模式 - 使用自定義圖標 */}
        {visualizationMode === 'markers' && filteredSharks.map((shark) => (
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
      </MapContainer>
    </div>
  );
}

// 創建自定義鯊魚圖標
function createCustomSharkIcon(species, iconsLoaded, t) {
  const config = getSharkConfig(species, t);
  
  // 如果有自定義圖標，使用 PNG 圖標
  if (iconsLoaded[species]) {
    return L.icon({
      iconUrl: iconsLoaded[species],
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
      className: `custom-shark-icon-${species.replace(/\s+/g, '-').toLowerCase()}`
    });
  }
  
  // 否則使用預設的 divIcon
  return L.divIcon({
    html: `
      <div style="
        width: 36px;
        height: 36px;
        position: relative;
      ">
        <div style="
          width: 36px;
          height: 36px;
          background: ${config.labelColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          border: 2px solid white;
        ">
          🦈
        </div>
        <div style="
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: ${config.labelColor};
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 8px;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        ">
          ${config.name}
        </div>
      </div>
    `,
    className: 'custom-shark-icon',
    iconSize: [36, 44],
    iconAnchor: [18, 18],
  });
}

// 保持原有的輔助函數
function getSharkConfig(species, t) {
  const configs = {
    'Tiger Shark': { labelColor: '#FF8C00', name: t('dashboard.tigerShark') },
    'Great White': { labelColor: '#FF0000', name: t('dashboard.greatWhite') },
    'Hammerhead': { labelColor: '#00AA00', name: t('dashboard.hammerhead') },
    'Whale Shark': { labelColor: '#0066FF', name: t('dashboard.whaleShark') }
  };
  return configs[species] || configs['Tiger Shark'];
}

function getSpeciesColor(species, t) {
  return getSharkConfig(species, t).labelColor;
}

function getSpeciesName(species, t) {
  return getSharkConfig(species, t).name;
}

export default MapView;
