// src/services/api.js - API 管理
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://nasa-backend-hzy3.onrender.com/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const oceanAPI = {
  // GET: 依日期獲取海洋數據
  async getOceanDataByDate(targetDate) {
    const response = await apiClient.get(`/api/v1/ocean-data/date/${targetDate}`);
    return response.data;
  },

  // POST: 依日期獲取海洋數據 (提供 JSON body)
  async postOceanDataByDate(date) {
    const response = await apiClient.post('/api/v1/ocean-data/date', { date });
    return response.data;
  },

  // GET: 獲取可用日期清單
  async getAvailableDates() {
    const response = await apiClient.get('/api/v1/ocean-data/available-dates');
    return response.data;
  }
};

export const mlAPI = {
  // POST: 上傳 CSV 進行預測
  async predictWithCsv(formData) {
    const response = await apiClient.post('/api/v1/ml/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // GET: 獲取模型資訊
  async getModelInfo() {
    const response = await apiClient.get('/api/v1/ml/model-info');
    return response.data;
  },

  // POST: 批次資料預測
  async predictBatch(batchData) {
    const response = await apiClient.post('/api/v1/ml/predict-batch', batchData);
    return response.data;
  },

  // POST: 重新載入模型
  async reloadModel() {
    const response = await apiClient.post('/api/v1/ml/reload-model');
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