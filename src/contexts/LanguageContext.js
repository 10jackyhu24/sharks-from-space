// src/contexts/LanguageContext.js - 擴充完整翻譯版本
import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  zh: {
    navigation: {
      home: "首頁",
      story: "故事",
      dashboard: "追蹤儀表板",
      ml: "機器學習",
      detector: "智能偵測器", 
    },
    home: {
      // Hero Section - 故事性內容
      heroTitle: "遠端遙測墨西哥灣鯨鯊",
      heroSubtitle: "當 NASA 衛星遇上海洋頂級掠食者",
      heroDescription: "我們運用最先進的太空技術，追蹤地球海洋中最神秘的生物。每一次心跳、每一次游動，都是大自然寫給我們的密碼。",
      heroMission: "這不僅是科學研究，更是為了拯救海洋生態的使命",
      
      // Call to Action
      exploreButton: "數據分析",
      watchStory: "專題故事",
      
      // Mission Statement
      missionTitle: "目標：解碼鯨鯊棲息秘密",
      missionDesc: "在人們的刻板印象中，鯊魚常被視為冷血的掠食者，象徵危險與恐懼。然而，正因為牠們位居食物鏈的頂端，鯊魚在維持海洋生態平衡中扮演了不可或缺的角色。缺少了鯊魚，整個食物網將失去穩定性，從浮游生物到漁業資源都會受到衝擊。根據 《Nature》2021 年的研究，自 1970 年以來，全球鯊魚與魟魚數量下降了 71%，其主要原因是過度捕撈，導致高達 四分之三的遠洋鯊魚與魟魚物種面臨滅絕風險。這不僅是物種保育的危機，更是整個海洋生態系功能崩解的警訊。",
      
      // Technology Highlight
      techTitle: "為什麼預測牠們的位置很重要?",
      techDesc: "2025 年，一支加州大學研究團隊啟動了 Project SharkEye，利用 AI 影像辨識技術與微感測器即時追蹤大白鯊，並將數據分享給研究者與當地社群，降低人類與鯊魚的衝突。受到這個計畫的啟發，結合 NASA 開放衛星數據（PACE、SWOT） 與機器學習模型，不僅能在技術端預測鯊魚覓食熱點，還能和社群互動，推動海洋保育教育。藉由改進的鯊魚位置預測人類在決策上能夠更重視保育政策、漁業管理、社會安全和教育與公眾參與；透過科學數據與社群互動，我們的願景是建構一個 人類與鯊魚共存的和平海洋生態系。",

      // 新增區域 1 - 研究方法
      methodTitle: "研究方法：衛星遙測與機器學習整合",
      methodDesc: "我們的研究方法結合了 NASA 的多光譜衛星影像、海洋環境數據，以及鯨鯊的生物遙測資料。透過 PACE 衛星監測海洋顏色變化來識別浮游生物聚集區，SWOT 任務則提供海面高度和洋流資訊。這些環境因子與鯨鯊的 GPS 追蹤數據結合後，我們使用隨機森林演算法建立預測模型，能夠以 85% 以上的準確率預測鯨鯊可能出現的海域。此外，我們也整合了漁業數據和海水溫度記錄，建構更全面的生態系統模型，為保育決策提供科學依據。",

      // 新增區域 2 - 未來願景
      visionTitle: "未來願景：科技與保育的永續結合", 
      visionDesc: "展望未來，我們計劃將此技術模型推廣到其他海洋物種的保育工作上。透過建立開放的數據平台，讓全球的研究者、保育團體、甚至是漁民都能即時獲得海洋生物的預測資訊。我們相信，當科技的力量與社會的參與結合，不僅能減少人類活動對海洋生物的負面影響，更能創造經濟與環境的雙贏局面。最終目標是建立一個智慧海洋監測網絡，讓每一次的科學發現都能轉化為實際的保育行動，確保後代子孫也能在健康的海洋環境中，與這些壯麗的生物共同生存。"
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
          },
          MLProbabilityHeatmap: {
            unit: "數值"
          }
        },
        dataDtatistics: {
          shark: "{{count}} 隻鯊魚",
          densityZones: "{{count}} 個密度區",
          monitoringPoints: "{{count}} 個監測點"
        }
      },
      sharkChart: {
        sharkOceanHeatmaps: "鯊魚海域熱力圖",
        selectPeriod: "選擇週期",
        selectonePeriod: "請選擇一個週期來查看數據",
        loading: "載入中..."
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
      sdmTitle: "物種分布模型 (SDM)",
      randomForest: "🌲 隨機森林演算法",
      randomForestDesc: "結合多棵決策樹的集成學習方法，透過分析海洋環境特徵預測鯊魚棲地適宜性，提供高準確度的分佈預測模型",
      dataProcessing: "📊 數據處理流程",
      performanceMetrics: "📈 模型效能指標",
      accuracy: "準確率",
      precision: "精確率", 
      recall: "召回率",
      f1Score: "F1 分數",
      fileUpload: {
        title: "檔案上傳 (ML 預測)",
        subtitle: "已選檔案",
        predictionResult: "預測結果 (機率分布)",
        resultAlert: "預測/訓練失敗，請檢查後端 API 是否正常運作"
      },
      dataProcessingWorkflow: {
        satelliteData: {
          title: "衛星數據",
          first: "SWOT 海面高度",
          second: "PACE 葉綠素-a",
          third: "MODIS 海溫"
        },
        featureEngineering: {
          title: "特徵工程",
          first: "渦流偵測",
          second: "溫度梯度",
          third: "營養上升流",
        },
        modelTrainning: {
          title: "模型訓練",
          first: "隨機森林",
          second: "交叉驗證",
          third: "超參數調優"
        },
        predictOutput: {
          title: "預測輸出",
          first: "棲地適宜性",
          second: "分佈熱點",
          third: "置信區間"
        }
      },
      technicalImplementationDetails: {
        title: "技術實現細節",
        featureVariables: {
          title: "特徵變數",
          content: {
            ssha: "海面高度異常 (SSHA)",
            chlorophyll: "葉綠素-a 濃度",
            sst: "海面溫度 (SST)",
            eddy: "渦流強度與方向",
            depthSlope: "深度與坡度",
            nutrients: "營養鹽分佈"
          }
        },
        modelArchitecture: {
          title: "模型架構",
          content: {
            0: "決策樹數量：{{count}} 棵",
            1: "最大深度：{{count}} 層",
            2: "最小樣本分割：{{count}}",
            3: "特徵抽樣：√n 隨機選取",
            4: "Bootstrap 抽樣：{{count}}%",
            5: "交叉驗證：{{count}}-fold"
          }
        },
        applicationScenarios: {
          title: "應用場景",
          content: {
            0: "即時棲地預測",
            1: "保護區劃設",
            2: "漁業管理建議",
            3: "氣候變遷影響評估",
            4: "生態廊道規劃",
            5: "研究航次路線優化",
          }
        }
      },
      MLProbabilityHeatmap: "機器學習機率熱圖",
      MLProbabilityHeatmapDesc: "顯示機器學習預測的鯊魚出現機率"
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
      members: "Story",
      dashboard: "Tracking Dashboard", 
      ml: "Machine Learning",
      detector: "Smart Detector",
    },
    home: {
      // Hero Section - Story-driven content
      heroTitle: "Mexican Bay Whale Sharks Seen from Space",
      heroSubtitle: "When NASA Satellites Meet Ocean Predators",
      heroDescription: "We harness cutting-edge space technology to track the ocean's most mysterious creatures. Every heartbeat, every movement, is nature's code written just for us.",
      heroMission: "This isn't just scientific research—it's our mission to save marine ecosystems",
      
      // Call to Action
      exploreButton: "Data Analysis",
      watchStory: "Our Story",
      
      // Mission Statement
      missionTitle: "Mission: Decode Whale Shark Habitat Secrets",
      missionDesc: "In popular imagination, sharks are often seen as ruthless predators—symbols of danger and fear. Yet, precisely because they occupy the top of the food chain, sharks are indispensable for maintaining the balance of marine ecosystems. Without sharks, the stability of the entire food web—from phytoplankton to fisheries—would be at risk. According to a 2021 Nature study, global populations of sharks and rays have declined by 71% since 1970, primarily due to overfishing. Alarmingly, three-quarters of oceanic shark and ray species are now threatened with extinction, putting essential ecosystem functions at risk.",
      
      // Technology Highlight
      techTitle: "Why is Predicting Their Location Important?",
      techDesc: "In 2025, a research team at the University of California launched Project SharkEye, applying AI and image analysis to track great white sharks and share data with both scientists and local communities. Inspired by this, we aim to integrate NASA's open satellite datasets (PACE, SWOT) with machine learning to identify shark foraging hotspots while fostering public engagement and education. By improving shark location prediction, humans can make more informed decisions that emphasize conservation policies, fisheries management, public safety, and education with community engagement. Through scientific data and social interaction, our vision is to build a peaceful ocean ecosystem where humans and sharks coexist.",

      // New Section 1 - Research Methods
      methodTitle: "Research Methods: Satellite Remote Sensing and Machine Learning Integration",
      methodDesc: "Our research methodology combines NASA's multispectral satellite imagery, ocean environmental data, and whale shark biotelemetry data. Through PACE satellite monitoring of ocean color changes to identify phytoplankton aggregation areas, while the SWOT mission provides sea surface height and ocean current information. When these environmental factors are combined with whale shark GPS tracking data, we use Random Forest algorithms to build predictive models that can predict whale shark occurrence areas with over 85% accuracy. Additionally, we integrate fisheries data and sea temperature records to construct more comprehensive ecosystem models, providing scientific basis for conservation decisions.",

      // New Section 2 - Future Vision  
      visionTitle: "Future Vision: Sustainable Integration of Technology and Conservation",
      visionDesc: "Looking ahead, we plan to extend this technological model to conservation work for other marine species. By establishing an open data platform, researchers, conservation groups, and even fishermen worldwide can access real-time predictive information about marine life. We believe that when the power of technology combines with social participation, it can not only reduce the negative impact of human activities on marine life, but also create win-win situations for both economy and environment. The ultimate goal is to establish an intelligent ocean monitoring network, where every scientific discovery can be transformed into actual conservation action, ensuring that future generations can coexist with these magnificent creatures in healthy marine environments."
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
          },
          MLProbabilityHeatmap: {
            unit: "Value"
          }
        },
        dataDtatistics: {
          shark: "{{count}} Sharks",
          densityZones: "{{count}} Density Zones",
          monitoringPoints: "{{count}} Monitoring Points"
        }
      },
      sharkChart: {
        sharkOceanHeatmaps: "Shark ocean heatmaps",
        selectPeriod: "Select period",
        selectonePeriod: "Please select a weekly period to view the data.",
        loading: "Loading..."
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
      f1Score: "F1 Score",
      fileUpload: {
        title: "CSV File Upload (ML Predict)",
        subtitle: "Selected files",
        predictionResult: "Prediction results (probability distribution)",
        resultAlert: "Prediction / training failed. Please check if the backend API is functioning correctly."
      },
      dataProcessingWorkflow: {
        satelliteData: {
          title: "Satellite Data",
          first: "SWOT sea surface height",
          second: "PACE chlorophyll-a",
          third: "MODIS sea surface temperature"
        },
        featureEngineering: {
          title: "Feature Engineering",
          first: "Eddy Detection",
          second: "Temperature Gradient",
          third: "Nutrient Upwelling",
        },
        modelTrainning: {
          title: "Model Trainning",
          first: "random forest",
          second: "Cross-Validation",
          third: "Hyperparameter Tuning"
        },
        predictOutput: {
          title: "Predicted Output",
          first: "Habitat Suitability",
          second: "Distribution Hotspot",
          third: "Confidence Interval"
        }
      },
      technicalImplementationDetails: {
        title: "Technical implementation details",
        featureVariables: {
          title: "Feature Variables",
          content: {
            ssha: "Sea Surface Height Anomaly (SSHA)",
            chlorophyll: "Chlorophyll-a Concentration",
            sst: "Sea Surface Temperature (SST)",
            eddy: "Eddy Intensity and Direction",
            depthSlope: "Depth and Slope",
            nutrients: "Nutrient Distribution"
          }
        },
        modelArchitecture: {
          title: "Model Architecture",
          content: {
            0: "Number of decision trees: {{count}}",
            1: "Maximum depth: {{count}} layers",
            2: "Minimum samples for split: {{count}}",
            3: "Feature sampling: √n randomly selected",
            4: "Bootstrap sampling: {{count}}%",
            5: "Cross-validation: {{count}}-fold"
          }
        },
        applicationScenarios: {
          title: "Application Scenarios",
          content: {
            0: "Real-time habitat prediction",
            1: "Protected area planning",
            2: "Fisheries management recommendations",
            3: "Climate change impact assessment",
            4: "Ecological corridor planning",
            5: "Research voyage route optimization",
          }
        }
      },
      MLProbabilityHeatmap: "ML Probability Heatmap",
      MLProbabilityHeatmapDesc: "Show the machine learning–predicted probability of shark occurrence."
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