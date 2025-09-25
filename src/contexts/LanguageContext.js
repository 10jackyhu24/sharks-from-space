// src/contexts/LanguageContext.js - 擴充完整翻譯版本
import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  zh: {
    navigation: {
      home: "首頁",
      dashboard: "追蹤儀表板",
      detector: "智能偵測器", 
      ml: "機器學習",
      members: "研究團隊"
    },
    home: {
      title: "Sharks from Space",
      subtitle: "結合 NASA 衛星技術與海洋生物學，透過太空視角追蹤鯊魚，探索海洋生態系統的奧秘，為海洋保育開啟新篇章",
      exploreButton: "開始探索 →",
      projectBackground: "🌊 項目背景與故事",
      satelliteTech: {
        title: "衛星追蹤技術",
        description: "利用 NASA 最新的衛星數據，包括 SWOT、PACE、MODIS 等系統，從太空監測海洋環境變化與鯊魚活動軌跡。"
      },
      smartTag: {
        title: "智能標籤系統",
        description: "開發新型概念標籤，不僅追蹤鯊魚位置，更能即時偵測覓食行為，透過銥衛星傳輸數據建立預測模型。"
      },
      machineLearning: {
        title: "機器學習預測", 
        description: "運用隨機森林演算法建立物種分佈模型（SDM），預測鯊魚覓食棲地，為海洋保育提供科學依據。"
      },
      researchGoals: "🎯 研究目標",
      conservation: {
        title: "生態保護",
        description: "透過精確追蹤，了解鯊魚生態習性，制定更有效的海洋保護策略"
      },
      fisheries: {
        title: "漁業管理",
        description: "預測鯊魚分佈區域，協助永續漁業發展與海洋資源管理"
      },
      climate: {
        title: "氣候研究",
        description: "以鯊魚為指標物種，研究氣候變遷對海洋生態系統的影響"
      },
      milestones: "📅 項目里程碑"
    },
    dashboard: {
      controlPanel: "🎛️ 控制面板",
      speciesFilter: "🐟 物種篩選", 
      visualization: "🎨 視覺化模式",
      mapStyle: "地圖樣式",
      displayOptions: "👁️ 顯示選項",
      realTimeStats: "📊 即時統計",
      selectedSpecies: "選中物種",
      displayStatus: "顯示狀態",
      mapTitle: "鯊魚追蹤地圖",
      sharkMarkers: "🦈 鯊魚標記",
      densityDistribution: "🔥 密度分佈",
      environmentalData: "🌊 環境數據",
      researchInfo: "📚 研究資訊",
      projectName: "項目名稱",
      dataSource: "數據來源",
      trackedSpecies: "追蹤物種",
      researchPurpose: "研究目的",
      updateFrequency: "更新頻率",
      coverage: "覆蓋範圍",
      oceanData: "🌊 海洋數據",
      trackingTags: "追蹤標籤",
      dataPoints: "數據點",
      markerModeDesc: "顯示個別鯊魚精確位置",
      densityModeDesc: "分析鯊魚聚集熱點區域",
      environmentalModeDesc: "監測海洋環境與生態關聯",
      standardMap: "標準地圖",
      satelliteImages: "衛星圖像",
      terrainMap: "地形圖",
      heatmapMode: "熱力圖模式",
      currentMode: "當前模式",
      satelliteTracking: "NASA 衛星追蹤",
      researchPurposeDesc: "海洋生態保護與鯊魚行為分析",
      markingMode: "標記模式",
      densityMode: "密度分布模式",
      environmentMode: "環境數據模式",
      sharkSightingStatistics: "鯊魚出現統計",
      numberOfOccurrences: '出現次數',
      tigerShark: "虎鯊",
      greatWhite: "大白鯊",
      hammerhead: "雙髻鯊",
      whaleShark: "鯨鯊",
      speciesDisplayed: "顯示 {{count}} 個物種",

      mapView: {
        trackingSpecies: "追蹤物種",
        windyColorBar: {
          density: {
            title: "鯊魚密度",
            unit: "隻/區域"
          },
          chlorophyll: {
            title: "葉綠素-a",
          },
          temperature: {
            title: "海表溫度"
          }
        },
        dataDtatistics: {
          shark: "{{count}} 隻鯊魚",
          densityZones: "{{count}} 個密度區",
          monitoringPoints: "{{count}} 個監測點"
        }
      }
    },
    detector: {
      title: "智能鯊魚偵測器",
      subtitle: "新一代概念標籤 · 即時行為偵測 · 銥衛星通訊",
      modelTitle: "🎮 3D 標籤模型",
      interactionHint: "滑鼠拖拽旋轉 • 滾輪縮放 • 點擊標籤互動",
      techSpecs: "🚀 技術規格",
      communication: {
        title: "📡 通訊系統",
        description: "銥衛星即時通訊 • 全球覆蓋 • 低功耗設計"
      },
      sensing: {
        title: "🎯 感測功能",
        description: "高頻加速度感測 • 覓食行為識別 • GPS 定位追蹤"
      },
      power: {
        title: "🔋 電源管理",
        description: "事件觸發式啟動 • 太陽能充電 • 超長待機時間"
      },
      protection: {
        title: "🌊 防護設計",
        description: "深海防水 • 抗壓耐腐蝕 • 生物相容材質"
      },
      workflow: "⚡ 工作流程",
      deployment: { title: "標籤部署", description: "安全附著於鯊魚背鰭，開始追蹤任務" },
      dataCollection: { title: "數據收集", description: "持續監測位置、行為、環境參數" },
      satelliteTransmission: { title: "衛星傳輸", description: "透過銥衛星即時上傳關鍵數據" },
      intelligentAnalysis: { title: "智能分析", description: "AI 演算法識別覓食、游泳等行為模式" }
    },
    ml: {
      title: "機器學習架構",
      subtitle: "隨機森林演算法 · 物種分佈模型 · 棲地預測系統",
      sdmTitle: "Species Distribution Model (SDM)",
      randomForest: "🌲 隨機森林演算法",
      randomForestDesc: "結合多棵決策樹的集成學習方法，透過分析海洋環境特徵預測鯊魚棲地適宜性，提供高準確度的分佈預測模型",
      dataProcessing: "📊 數據處理流程",
      performanceMetrics: "📈 模型效能指標",
      accuracy: "準確率",
      precision: "精確率", 
      recall: "召回率",
      f1Score: "F1 分數"
    },
    members: {
      title: "研究團隊",
      subtitle: "跨領域專家團隊 · 結合海洋科學與太空技術",
      aboutTeam: "關於我們的團隊",
      teamDescription: "我們是一支由海洋生物學家、工程師、數據科學家與軟體開發者組成的跨領域團隊。結合各自的專業知識，致力於運用最新的太空技術來探索海洋生態，為鯊魚保育與海洋研究開創新的可能性。",
      collaboration: "🤝 合作機構"
    },
    species: {
      tigerShark: "虎鯊",
      greatWhite: "大白鯊",
      hammerhead: "雙髻鯊",
      whaleShark: "鯨鯊"
    },
    common: {
      loading: "載入中...",
      error: "發生錯誤",
      realTimeUpdate: "即時更新",
      globalCoverage: "全球海域"
    }
  },
  en: {
    navigation: {
      home: "Home",
      dashboard: "Tracking Dashboard", 
      detector: "Smart Detector",
      ml: "Machine Learning",
      members: "Research Team"
    },
    home: {
      title: "Sharks from Space",
      subtitle: "Combining NASA satellite technology with marine biology, tracking sharks from space to explore marine ecosystems and pioneer ocean conservation",
      exploreButton: "Start Exploring →",
      projectBackground: "🌊 Project Background & Story",
      satelliteTech: {
        title: "Satellite Tracking Technology",
        description: "Utilizing NASA's latest satellite data including SWOT, PACE, MODIS systems to monitor ocean environment changes and shark activity trajectories from space."
      },
      smartTag: {
        title: "Smart Tag System", 
        description: "Developing next-generation conceptual tags that not only track shark locations but also detect feeding behaviors in real-time, transmitting data via Iridium satellites to build predictive models."
      },
      machineLearning: {
        title: "Machine Learning Prediction",
        description: "Utilizing Random Forest algorithms to build Species Distribution Models (SDM), predicting shark feeding habitats and providing scientific basis for ocean conservation."
      },
      researchGoals: "🎯 Research Objectives",
      conservation: {
        title: "Ecosystem Protection",
        description: "Through precise tracking, understand shark ecological habits and develop more effective marine protection strategies"
      },
      fisheries: {
        title: "Fisheries Management", 
        description: "Predict shark distribution areas to assist sustainable fisheries development and marine resource management"
      },
      climate: {
        title: "Climate Research",
        description: "Using sharks as indicator species to study climate change impacts on marine ecosystems"
      },
      milestones: "📅 Project Milestones"
    },
    dashboard: {
      controlPanel: "🎛️ Control Panel",
      speciesFilter: "🐟 Species Filter", 
      visualization: "🎨 Visualization Mode",
      mapStyle: "Map Style",
      displayOptions: "👁️ Display Options",
      realTimeStats: "📊 Real-time Statistics",
      selectedSpecies: "Selected Species",
      displayStatus: "Display Status",
      mapTitle: "Shark Tracking Map",
      sharkMarkers: "🦈 Shark Markers",
      densityDistribution: "🔥 Density Distribution",
      environmentalData: "🌊 Environmental Data",
      researchInfo: "📚 Research Information",
      projectName: "Project Name",
      dataSource: "Data Source",
      trackedSpecies: "Tracked Species",
      researchPurpose: "Research Purpose",
      updateFrequency: "Update Frequency",
      coverage: "Coverage",
      oceanData: "🌊 Ocean Data",
      trackingTags: "Tracking Tags",
      dataPoints: "Data Points",
      markerModeDesc: "Display individual shark precise locations",
      densityModeDesc: "Analyze shark aggregation hotspots",
      environmentalModeDesc: "Monitor marine environment and ecological relationships",
      standardMap: "Standard Map",
      satelliteImages: "Satellite Images",
      terrainMap: "Terrain Map",
      heatmapMode: "Heatmap Mode",
      currentMode: "Current Mode",
      satelliteTracking: "NASA satellite tracking",
      researchPurposeDesc: "Marine Ecological Conservation and Shark Behavior Analysis",
      markingMode: "Marking Mode",
      densityMode: "Density Mode",
      environmentMode: "Environment Mode",
      sharkSightingStatistics: "Shark Sighting Statistics",
      numberOfOccurrences: "Number of Occurrences",
      tigerShark: "Tiger Shark",
      greatWhite: "Great White",
      hammerhead: "Hammerhead",
      whaleShark: "Whale Shark",
      speciesDisplayed: "{{count}} species displayed",
      mapView: {
        trackingSpecies: "Tracking Species",
        windyColorBar: {
          density: {
            title: "Shark Density",
            unit: "/Area"
          },
          chlorophyll: {
            title: "Chlorophyll-a",
          },
          temperature: {
            title: "Sea Surface Temperature"
          }
        },
        dataDtatistics: {
          shark: "{{count}} Sharks",
          densityZones: "{{count}} Density Zones",
          monitoringPoints: "{{count}} Monitoring Points"
        }
      }
    },
    detector: {
      title: "Smart Shark Detector",
      subtitle: "Next-generation concept tags · Real-time behavior detection · Iridium satellite communication",
      modelTitle: "🎮 3D Tag Model",
      interactionHint: "Mouse drag to rotate • Scroll to zoom • Click tag to interact",
      techSpecs: "🚀 Technical Specifications",
      communication: {
        title: "📡 Communication System",
        description: "Iridium satellite real-time communication • Global coverage • Low power design"
      },
      sensing: {
        title: "🎯 Sensing Functions", 
        description: "High-frequency acceleration sensing • Feeding behavior recognition • GPS positioning tracking"
      },
      power: {
        title: "🔋 Power Management",
        description: "Event-triggered activation • Solar charging • Ultra-long standby time"
      },
      protection: {
        title: "🌊 Protection Design",
        description: "Deep-sea waterproof • Pressure and corrosion resistant • Biocompatible materials"
      },
      workflow: "⚡ Workflow",
      deployment: { title: "Tag Deployment", description: "Safely attach to shark dorsal fin, begin tracking mission" },
      dataCollection: { title: "Data Collection", description: "Continuously monitor location, behavior, environmental parameters" },
      satelliteTransmission: { title: "Satellite Transmission", description: "Real-time upload of critical data via Iridium satellites" },
      intelligentAnalysis: { title: "Intelligent Analysis", description: "AI algorithms identify feeding, swimming and other behavioral patterns" }
    },
    ml: {
      title: "Machine Learning Architecture",
      subtitle: "Random Forest Algorithm · Species Distribution Model · Habitat Prediction System",
      sdmTitle: "Species Distribution Model (SDM)",
      randomForest: "🌲 Random Forest Algorithm",
      randomForestDesc: "An ensemble learning method combining multiple decision trees, analyzing marine environmental features to predict shark habitat suitability and provide high-accuracy distribution prediction models",
      dataProcessing: "📊 Data Processing Workflow",
      performanceMetrics: "📈 Model Performance Metrics",
      accuracy: "Accuracy",
      precision: "Precision", 
      recall: "Recall",
      f1Score: "F1 Score"
    },
    members: {
      title: "Research Team",
      subtitle: "Interdisciplinary expert team · Combining marine science with space technology",
      aboutTeam: "About Our Team",
      teamDescription: "We are an interdisciplinary team composed of marine biologists, engineers, data scientists, and software developers. By combining our respective professional knowledge, we are committed to using the latest space technology to explore marine ecology and create new possibilities for shark conservation and marine research.",
      collaboration: "🤝 Collaboration Partners"
    },
    species: {
      tigerShark: "Tiger Shark",
      greatWhite: "Great White",
      hammerhead: "Hammerhead", 
      whaleShark: "Whale Shark"
    },
    common: {
      loading: "Loading...",
      error: "Error occurred",
      realTimeUpdate: "Real-time update",
      globalCoverage: "Global coverage"
    }
  }
};

// Context 創建和 Provider（保持不變）
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sharks-language');
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.includes('en')) {
        setCurrentLanguage('en');
      }
    }
  }, []);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('sharks-language', language);
    console.log(`✅ 語言切換為: ${language}`);
  };

  const interpolate = (template, params) => {
    // 如果沒有傳 params，就直接回傳原始字串
    if (!params) return template;

    // 有 params 就進行替換
    return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      return params[key.trim()] ?? `{{${key}}}`;
    });
  };

  const t = (key, params) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (!value) {
      console.warn(`⚠️ 翻譯缺失: ${key} (${currentLanguage})`);
      return key;
    }
    
    return interpolate(value, params);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    i18n: { language: currentLanguage }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
