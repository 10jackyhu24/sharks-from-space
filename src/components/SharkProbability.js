// src/components/SharkProbability.js
import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

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

// 自訂 HeatmapLayer
function HeatmapLayer({ points, options }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !points || points.length === 0) return;
    const layer = L.heatLayer(points, options);
    layer.addTo(map);
    return () => {
      try {
        map.removeLayer(layer);
      } catch (e) {}
    };
  }, [map, JSON.stringify(points), JSON.stringify(options)]);
  return null;
}

export default function SharkProbability({ selectedSlot, activeLayer = 'openstreetmap' }) {

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

  const [sharks, setSharks] = useState([]);

  useEffect(() => {
    if (!selectedSlot || !selectedSlot[0] || !selectedSlot[1]) return;

    const key = `${selectedSlot[0]}_${selectedSlot[1]}`;
    const shark_data_path = slotToFileMap[key] || "";
    if (!shark_data_path) return;

    fetch(`${process.env.PUBLIC_URL}/sharks_data/${shark_data_path}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("載入鯊魚數據:", data);
        // 假設 JSON 格式為 [{lat, lng, predicted_probability}]
        const heatPoints = data
          .filter((d) => d.lat && d.lng && d.predicted_probability !== undefined)
          .map((d) => [d.lat, d.lng, d.predicted_probability]);
        setSharks(heatPoints);
      })
      .catch((err) => console.error("載入鯊魚資料失敗：", err));
  }, [selectedSlot]);

  const options = useMemo(() => ({ radius: 25, blur: 15, maxZoom: 10, max: 1 }), []);

  return (
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
        key={activeLayer}  // 🔹 當 activeLayer 改變時，強制重建 TileLayer
        url={getTileLayerUrl()}
        attribution={getTileLayerAttribution()}
      />
      {sharks.length > 0 && <HeatmapLayer points={sharks} options={options} />}
    </MapContainer>
  );
}
