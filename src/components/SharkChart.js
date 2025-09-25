import React from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from '../contexts/LanguageContext';
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
const data = (t) => {
  const result = {
    labels: [t('dashboard.tigerShark'), t('dashboard.greatWhite'), t('dashboard.hammerhead'), t('dashboard.whaleShark')],
    datasets: [
      {
        label: t('dashboard.numberOfOccurrences'),
        data: [12, 19, 7, 5],
        backgroundColor: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
      },
    ],
  }
  return result;
};

function SharkChart({t}) {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>{t('dashboard.sharkSightingStatistics')}</h2>
      <Bar data={data(t)} />
    </div>
  );
}

export default SharkChart;
