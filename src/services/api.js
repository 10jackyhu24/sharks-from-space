// src/services/api.js - API 管理
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const sharkAPI = {
  // 獲取鯊魚追蹤數據
  async getSharkTracks(timeRange, species = null) {
    const params = {
      start_date: timeRange.start.toISOString(),
      end_date: timeRange.end.toISOString(),
      ...(species && { species })
    };
    const response = await apiClient.get('/shark_tracks', { params });
    return response.data;
  },

  // 獲取棲地預測數據
  async getHabitatPrediction(species, date, bounds) {
    const response = await apiClient.post('/habitat_prediction', {
      species,
      date: date.toISOString(),
      bounds
    });
    return response.data;
  },

  // 獲取環境數據圖層
  async getEnvironmentalLayers(layer, date, bounds) {
    const response = await apiClient.get(`/environmental_layers/${layer}`, {
      params: {
        date: date.toISOString(),
        bounds: JSON.stringify(bounds)
      }
    });
    return response.data;
  },

  // 獲取數據故事點
  async getDataStoryPoints(region) {
    const response = await apiClient.get('/data_story_points', {
      params: { region }
    });
    return response.data;
  }
};

// 錯誤處理攔截器
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
