// src/components/SharkChart.js 1003
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { oceanAPI } from "../services/api";

// Helper: normalize array of numbers to 0..1
const normalizeArray = (arr) => {
  const nums = arr.map((v) => Number(v) || 0);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (max === min) return nums.map(() => 0.5);
  return nums.map((v) => (v - min) / (max - min));
};

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

function MapCard({ title, points, bounds }) {
  const options = useMemo(() => ({ radius: 25, blur: 20, maxZoom: 6, max: 1 }), []);
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

export default function SharkHeatmaps({t}) {
  const [sharkData, setSharkData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false); // 🔹 loading 狀態

  const timeSlots = [
    ["2014-07-10", "2014-07-16"], ["2014-07-17", "2014-07-23"], ["2014-07-24", "2014-07-30"],
    ["2014-07-31", "2014-08-06"], ["2014-08-07", "2014-08-13"], ["2014-08-14", "2014-08-20"],
    ["2014-08-21", "2014-08-27"], ["2014-08-28", "2014-09-03"], ["2014-09-04", "2014-09-10"],
    ["2014-09-11", "2014-09-17"], ["2014-09-18", "2014-09-25"], ["2014-09-26", "2014-10-02"],
    ["2014-10-02", "2014-10-07"], ["2014-10-08", "2014-10-14"], ["2014-10-15", "2014-10-21"],
    ["2014-10-22", "2014-10-28"], ["2014-10-29", "2014-11-04"], ["2014-11-05", "2014-11-11"],
    ["2014-11-12", "2014-11-18"], ["2014-11-19", "2014-11-25"], ["2014-11-26", "2014-12-02"],
    ["2014-12-03", "2014-12-09"], ["2014-12-10", "2014-12-16"], ["2014-12-17", "2014-12-22"],
    ["2014-12-23", "2014-12-30"]
  ];

  const generateDatesInRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      dates.push(current.toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    if (!selectedSlot) return;

    async function fetchData() {
      try {
        setLoading(true); // 🔹 開始載入
        setError(null);

        const [start, end] = selectedSlot;
        const days = generateDatesInRange(start, end);

        let allData = [];
        for (let day of days) {
          const response = await oceanAPI.getOceanDataByDate(day);
          console.log(`📅 ${day} 回傳資料:`, response);

          if (response?.records && Array.isArray(response.records)) {
           allData.push(...response.records);  // ✅ 改成展開 records
          }
        }

        setSharkData(allData);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "載入失敗");
      } finally {
        setLoading(false); // 🔹 載入完成
      }
    }

    fetchData();
  }, [selectedSlot]);

  if (error) return <div className="shark-error">Error loading data: {error}</div>;

  const lats = sharkData.map((d) => Number(d.latitude || d.lat)).filter((v) => !Number.isNaN(v));
  const lngs = sharkData.map((d) => Number(d.longitude || d.lng)).filter((v) => !Number.isNaN(v));
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const bounds = lats.length > 0 ? [[minLat, minLng], [maxLat, maxLng]] : null;

  const CHL_norm = normalizeArray(sharkData.map((d) => Number(d.chl_value ?? 0)));
  const SSHA_norm = normalizeArray(sharkData.map((d) => Number(d.ssha_value ?? 0)));
  const SST_norm = normalizeArray(sharkData.map((d) => Number(d.sst_value ?? 0)));

  const CHL_points = sharkData.map((d, i) => [d.latitude || d.lat, d.longitude || d.lng, CHL_norm[i]]);
  const SSHA_points = sharkData.map((d, i) => [d.latitude || d.lat, d.longitude || d.lng, SSHA_norm[i]]);
  const SST_points = sharkData.map((d, i) => [d.latitude || d.lat, d.longitude || d.lng, SST_norm[i]]);

  return (
    <div className="shark-heatmaps-wrapper">
      <h2 className="shark-header">{t('dashboard.sharkChart.sharkOceanHeatmaps')} (CHL / SSHA / SST)</h2>

      {/* 🔹 Time slot 選單 */}
      <div style={{ marginBottom: "1rem" }}>
        <label>{t('dashboard.sharkChart.selectPeriod')}: </label>
        <select
          onChange={(e) => setSelectedSlot(timeSlots[e.target.value])}
          defaultValue=""
        >
          <option value="" disabled>{t('dashboard.sharkChart.selectPeriod')}</option>
          {timeSlots.map(([start, end], idx) => (
            <option key={idx} value={idx}>
              {start} ~ {end}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 載入中提示 */}
      {loading && <div className="shark-loading">{t('dashboard.sharkChart.loading')}</div>}

      {/* 🔹 地圖顯示 */}
      {!loading && sharkData.length > 0 && (
        <div className="shark-grid">
          <MapCard title="CHL (chlorophyll)" points={CHL_points} bounds={bounds} />
          <MapCard title="SSHA (sea surface height anomaly)" points={SSHA_points} bounds={bounds} />
          <MapCard title="SST (sea surface temperature)" points={SST_points} bounds={bounds} />
        </div>
      )}

      {!loading && sharkData.length === 0 && (
        <div>{t('dashboard.sharkChart.selectonePeriod')}</div>
      )}
    </div>
  );
}
