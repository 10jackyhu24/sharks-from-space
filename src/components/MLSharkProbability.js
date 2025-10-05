// src/components/SharkProbability.js
import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useMap } from "react-leaflet";


// 小幫手：把每個資料點「密化(splat)」成多個帶權重的熱力點，讓 heatmap 更平滑且和原始點對齊
function createSplatHeatPoints(points = [], opts = {}) {
  const {
    radiusKm = 25,         // 每個點影響半徑 (公里)，可調
    samplesPerRing = 8,    // 每個環的樣本數
    rings = [0.25, 0.55, 0.9], // 各環距離比例（相對於 radiusKm）
    maxPoints = 30000      // 防止生成過多點造成性能問題
  } = opts;

  const degPerKmLat = 1 / 111; // 1 deg latitude ≈ 111 km
  const out = [];
  let count = 0;

  for (const p of points) {
    if (!p || !isFinite(p.lat) || !isFinite(p.lng)) continue;
    // 支援多種欄位名稱
    const prob = Number(
      p.predicted_probability ?? p.prob ?? p.probability ?? p.prediction ?? p.value ?? 0
    );
    if (!isFinite(prob) || prob <= 0) continue;

    // 加入中心點（權重就是機率）
    out.push([p.lat, p.lng, prob]);
    count++;
    if (count >= maxPoints) break;

    const latRad = (p.lat * Math.PI) / 180;

    for (const frac of rings) {
      const rKm = radiusKm * frac;
      // 轉換成經緯度差
      const dLatDeg = rKm * degPerKmLat;
      // 經度要除以 cos(lat)
      const dLngDeg = rKm * degPerKmLat / Math.max(Math.cos(latRad), 1e-6);

      // 權重衰減（外圈比內圈弱）
      const ringWeightFactor = Math.max(0, 1 - frac);

      for (let i = 0; i < samplesPerRing; i++) {
        const angle = (2 * Math.PI * i) / samplesPerRing;
        const dy = dLatDeg * Math.sin(angle);
        const dx = dLngDeg * Math.cos(angle);
        const weight = prob * ringWeightFactor * (0.6 + 0.4 * Math.random()); // 加一點隨機，避免完全規則
        out.push([p.lat + dy, p.lng + dx, Math.max(0, weight)]);
        count++;
        if (count >= maxPoints) break;
      }
      if (count >= maxPoints) break;
    }
    if (count >= maxPoints) break;
  }

  // 當輸入的點很多時（比如上萬），直接用原始點以節省計算
  if (points.length > 2000 && out.length > 50000) {
    // fallback: 只用原始點的 intensity（不密化）
    return points
      .filter(p => isFinite(p.lat) && isFinite(p.lng))
      .map(p => [p.lat, p.lng, Number(p.predicted_probability ?? p.prob ?? p.probability ?? p.prediction ?? p.value ?? 0) || 0]);
  }

  return out;
}

// Heatmap 建 layer 的小組件（保持原樣）
function HeatmapLayer({ points, options }) {
  const map = window._leaflet_map_for_heat || null;
  // 我們要用 useEffect 在 mount 時加 layer —— 但因為在 functional 元件內不能直接 useMap()（原版也可），
  // 這裡直接操作 map 會比較簡單。若你要用 useMap()，把這個 component 放進 MapContainer children 中。
  // 為簡潔起見：直接回傳 null 並在父元件用 effect 加 layer（下面父元件已使用 useEffect）。
  return null;
}

export default function SharkProbability({
  points = [],                // 傳入: [{lat, lng, predicted_probability/prob/probability/prediction}]
  activeLayer = "openstreetmap",
  radiusKm = 25,
  samplesPerRing = 8,
  rings = [0.25, 0.55, 0.9],
  maxPoints = 30000,
  t
}) {
  // Tile URL / attribution
  const getTileLayerUrl = () => {
    switch (activeLayer) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };
  const getTileLayerAttribution = () => {
    switch (activeLayer) {
      case "satellite":
        return "&copy; Esri";
      case "terrain":
        return "&copy; OpenTopoMap";
      default:
        return "&copy; OpenStreetMap contributors";
    }
  };

  // 產生 heat points（密化）
  const heatPoints = useMemo(() => {
    if (!points || points.length === 0) return [];
    return createSplatHeatPoints(points, { radiusKm, samplesPerRing, rings, maxPoints });
  }, [points, radiusKm, samplesPerRing, JSON.stringify(rings), maxPoints]);

  // 把 heat layer 加到地圖上（使用 effect）
  useEffect(() => {
    // 找到 leaflet map instance（react-leaflet 的 MapContainer 會放一個 global 參考，或你也可改成 useMap hook）
    const map = document.querySelector('.shark-probability-leaflet')?._leaflet_map_instance || null;
    // fallback: 用 window 上的 map（如果你已用其他方法設定）
    const realMap = window._leaflet_map_instance || map;

    if (!realMap) {
      // fallback: 我們在 render 階段用 children 的方式把 layer 加入 MapContainer（下面改用常規方法）
      return;
    }
  }, [heatPoints]);

  // heat layer options: radius 與 blur 對平滑度影響大
  const options = { radius: 25, blur: 20, maxZoom: 12, max: 1 };

  return (
    <MapContainer
      className="shark-probability-leaflet"
      center={[25.5, -90]}
      zoom={5}
      minZoom={4}
      maxZoom={12}
      maxBounds={[[18, -105], [33, -75]]}
      maxBoundsViscosity={1.0}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        key={activeLayer}
        url={getTileLayerUrl()}
        attribution={getTileLayerAttribution()}
      />

      {/* 直接把 heat layer 加到地圖上（用一個 small component） */}
      {heatPoints && heatPoints.length > 0 && <InnerHeatLayer points={heatPoints} options={options} />}
    </MapContainer>
  );
}


// 內部子元件：把 L.heatLayer 加/移除（使用 useMap 正規做法）
function InnerHeatLayer({ points, options }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const layer = L.heatLayer(points, options);
    layer.addTo(map);
    return () => {
      try { map.removeLayer(layer); } catch (e) {}
    };
  }, [map, JSON.stringify(points), JSON.stringify(options)]);
  return null;
}