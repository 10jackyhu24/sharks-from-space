import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MLMapView({ 
  points = [],
  activeLayer="openstreetmap",
  t
}) {
  // 創建自定義鯊魚圖標
  function createCustomSharkIcon(t) {
    
    // 使用小圓點樣式
    return L.divIcon({
      html: `
        <div style="
          width: 12px;
          height: 12px;
          background: red;
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

  return (
    <MapContainer
      center={[25.5, -90]}
      zoom={5}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* ✅ 這裡畫出所有點 */}
      {points.map((p, i) => (
        <Marker 
          position={[p.lat, p.lng]}
          icon={createCustomSharkIcon(t)}
        >
          <Popup>
            <div>
              <strong>經度：</strong>{p.lng}<br/>
              <strong>緯度：</strong>{p.lat}<br/>
              <strong>預測：</strong>{p.prediction}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
