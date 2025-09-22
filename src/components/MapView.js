import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView() {
  const [sharks, setSharks] = useState([]);

  useEffect(() => {
    fetch("/sharks.json")
      .then((res) => res.json())
      .then((data) => setSharks(data))
      .catch((err) => console.error("載入鯊魚資料失敗：", err));
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {sharks.map((shark) => (
        <Marker key={shark.id} position={[shark.lat, shark.lng]}>
          <Popup>
            <b>{shark.species}</b> <br />
            時間：{new Date(shark.timestamp).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
