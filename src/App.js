import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import MapView from "./components/MapView";
import SharkChart from "./components/SharkChart";

function App() {
  return (
    <div>
      <Header />
      <main style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", padding: "20px" }}>
        <MapView />
        <SharkChart />
      </main>
    </div>
  );
}

export default App;
