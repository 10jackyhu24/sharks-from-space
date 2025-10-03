// src/store/sharkStore.js - 全域狀態管理
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { sharkAPI } from '../services/api';

export const useSharkStore = create(
  subscribeWithSelector((set, get) => ({
    // 數據狀態
    sharks: [],
    environmentalData: {},
    predictionData: null,
    loading: false,
    error: null,

    // 視覺化控制
    selectedSpecies: ['Whale Shark', 'Tiger Shark'], // 重置為正確的兩個物種
    timeRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30天前
      end: new Date()
    },
    showHeatmap: false,
    activeEnvironmentalLayers: ['sst', 'chlorophyll'],
    
    // UI 狀態
    activeView: 'map',
    sidebarCollapsed: false,
    playbackSpeed: 1,
    isPlaying: false,

    // Actions
    fetchSharkData: async () => {
      set({ loading: true, error: null });
      try {
        const data = await sharkAPI.getSharkTracks(get().timeRange);
        set({ sharks: data, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    fetchPredictionData: async (species, date) => {
      try {
        const prediction = await sharkAPI.getHabitatPrediction(species, date);
        set({ predictionData: prediction });
      } catch (error) {
        console.error('Failed to fetch prediction:', error);
      }
    },

    updateTimeRange: (newRange) => {
      set({ timeRange: newRange });
      get().fetchSharkData(); // 自動重新載入數據
    },

    toggleSpecies: (species) => {
      const current = get().selectedSpecies;
      const updated = current.includes(species)
        ? current.filter(s => s !== species)
        : [...current, species];
      set({ selectedSpecies: updated });
    },

    toggleEnvironmentalLayer: (layer) => {
      const current = get().activeEnvironmentalLayers;
      const updated = current.includes(layer)
        ? current.filter(l => l !== layer)
        : [...current, layer];
      set({ activeEnvironmentalLayers: updated });
    }
  }))
);
