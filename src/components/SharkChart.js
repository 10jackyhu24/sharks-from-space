import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // side-effect: extends L.heatLayer
//import "./SharkHeatmaps.css"; // optional: small styles (see README below)

// Helper: normalize array of numbers to 0..1 (handles constant arrays)
const normalizeArray = (arr) => {
  const nums = arr.map((v) => Number(v) || 0);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (max === min) return nums.map(() => 0.5);
  return nums.map((v) => (v - min) / (max - min));
};

// Heatmap layer component (adds/removes leaflet.heat layer)
function HeatmapLayer({ points, options }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    // points already in [lat, lng, intensity] format and intensity 0..1
    const layer = L.heatLayer(points, options);
    layer.addTo(map);

    return () => {
      try {
        map.removeLayer(layer);
      } catch (e) {
        // ignore
      }
    };
  }, [map, JSON.stringify(points), JSON.stringify(options)]);

  return null;
}

// Single map card: title + heatmap
function MapCard({ title, points, bounds }) {
  // Default options for heatmap
  const options = useMemo(() => ({ radius: 25, blur: 20, maxZoom: 6, max: 1 }), []);

  // If bounds is invalid (e.g. single point), set a fallback center/zoom
  const hasValidBounds = Array.isArray(bounds) && bounds.length === 2;

  return (
    <div className="shark-map-card">
      <h3 className="shark-map-title">{title}</h3>
      <MapContainer
        style={{ height: 360, width: "100%" }}
        bounds={hasValidBounds ? bounds : undefined}
        center={!hasValidBounds ? [20, 120] : undefined}
        zoom={!hasValidBounds ? 3 : undefined}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {points && points.length > 0 && <HeatmapLayer points={points} options={options} />}
      </MapContainer>
    </div>
  );
}

// Main component - loads shark.json and renders three heatmaps (CHL, SSHA, SST)
export default function SharkHeatmaps() {
  const [sharkData, setSharkData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/sharks.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setSharkData(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to load shark.json:", err);
        setError(err.message || "載入失敗");
      });
  }, []);

  // If no data, show message
  if (error) return <div className="shark-error">Error loading shark.json: {error}</div>;
  if (!sharkData || sharkData.length === 0)
    return <div className="shark-loading">載入中或找不到資料 (請把 shark.json 放到 public/ 資料夾)</div>;

  // compute bounding box exactly from data (min/max lat & lng) as requested by user
  const lats = sharkData.map((d) => Number(d.lat)).filter((v) => !Number.isNaN(v));
  const lngs = sharkData.map((d) => Number(d.lng)).filter((v) => !Number.isNaN(v));

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const bounds = [[minLat, minLng], [maxLat, maxLng]]; // exact bounding box

  // Prepare normalized intensity points for each variable
  const CHL_values = sharkData.map((d) => Number(d.CHL_value ?? 0));
  const SSHA_values = sharkData.map((d) => Number(d.SSHA_value ?? 0));
  const SST_values = sharkData.map((d) => Number(d.SST_value ?? 0));

  const CHL_norm = normalizeArray(CHL_values);
  const SSHA_norm = normalizeArray(SSHA_values);
  const SST_norm = normalizeArray(SST_values);

  const CHL_points = sharkData.map((d, i) => [Number(d.lat), Number(d.lng), CHL_norm[i]]);
  const SSHA_points = sharkData.map((d, i) => [Number(d.lat), Number(d.lng), SSHA_norm[i]]);
  const SST_points = sharkData.map((d, i) => [Number(d.lat), Number(d.lng), SST_norm[i]]);

  return (
    <div className="shark-heatmaps-wrapper">
      <h2 className="shark-header">Shark ocean heatmaps (CHL / SSHA / SST)</h2>
      <br/>
      <div className="shark-grid">
        <MapCard title="CHL (chlorophyll)" points={CHL_points} bounds={bounds} />
        <MapCard title="SSHA (sea surface height anomaly)" points={SSHA_points} bounds={bounds} />
        <MapCard title="SST (sea surface temperature)" points={SST_points} bounds={bounds} />
      </div>

      {/* <div className="shark-note">
        <strong>說明：</strong>
        <ul>
          <li>點的強度已經根據該變數（CHL/SSHA/SST）做 0..1 正規化，讓熱力圖顯色一致。</li>
          <li>熱力圖使用 <code>leaflet.heat</code> 的模糊/半徑參數來達到「內插/平滑」的視覺效果；若要精準的格網內插（例如 IDW/kriging 產生 raster），我可以再幫你產生一張 image overlay（或用 turf.js / grid-interpolation 實作）。</li>
          <li>請把 <code>shark.json</code> 放在你的 public/ 資料夾，或改 fetch 路徑指向正確位置。</li>
        </ul>
      </div> */}
    </div>
  );
}

