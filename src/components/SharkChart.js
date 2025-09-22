import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 模擬鯊魚種類數據
const data = {
  labels: ["Tiger Shark", "Great White", "Hammerhead", "Whale Shark"],
  datasets: [
    {
      label: "出現次數",
      data: [12, 19, 7, 5],
      backgroundColor: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
    },
  ],
};

function SharkChart() {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>鯊魚出現統計</h2>
      <Bar data={data} />
    </div>
  );
}

export default SharkChart;
