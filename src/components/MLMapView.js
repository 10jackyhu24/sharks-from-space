import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MLMapView({ 
  points = [],
  activeLayer="openstreetmap",
  t
}) {
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

      {/* ✅ 這裡畫出所有點 */}
      {points.map((p, i) => (
        <Marker 
          position={[p.lat, p.lng]}
          icon={createCustomSharkIcon(t)}
        >
          <Popup>
            <div>
              <strong>{t('ml.point.longitude')}：</strong>{p.lng}<br/>
              <strong>{t('ml.point.latitude')}：</strong>{p.lat}<br/>
              <strong>{t('ml.point.predict')}：</strong>{p.prediction}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
