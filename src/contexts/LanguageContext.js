// src/contexts/LanguageContext.js - 擴充完整翻譯版本
import React, { createContext, useContext, useState, useEffect } from 'react';
import SharkProbability from '../components/SharkProbability';

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
      heroTitle: "Shark from Space",
      heroSubtitle: "2025 NASA Space Apps Challenge",
      heroDescription: "運用NASA衛星數據，追蹤海洋中的頂級掠食者。",
      heroMission: "no water, no life. no blue, no green -- Dr. Sylvia Earle ",
      
      // Call to Action
      exploreButton: "追蹤鯊魚！",
      watchStory: "鯊魚的故事",
      
      // Mission Statement
      missionTitle: "鯊魚滅絕的全球警訊",
      missionDesc: "在人們的刻板印象中，鯊魚常被視為「冷血」的掠食者，象徵危險與恐懼。然而，正因為牠們位居食物鏈的頂端，鯊魚在維持海洋生態平衡中扮演了不可或缺的角色。若是缺少鯊魚，整個食物網將失去穩定性，從浮游生物到漁業資源都會受到衝擊。根據 pacoureau et al. 2021 年一篇刊登於《Nature》的研究，自 1970 年以來，全球鯊魚與魟魚數量下降了 71%，其主要原因是過度捕撈，導致高達四分之三的遠洋鯊魚與魟魚物種面臨滅絕風險，拉響整個海洋生態系功能崩解的警鈴。",
      missionImageCaption: "Pacoureau et al.(2021) 顯示自 1970 年以來，不同海域與生態特徵的鯊魚族群變化。大西洋族群在長期下降後趨於低點，太平洋在 1970–1990 年快速下降後以較慢速度減少，而印度洋的下降最劇烈。從生態特徵來看，熱帶鯊魚比溫帶鯊魚下降更快，大型鯊魚（>500 公分）減少幅度最大，世代時間長（>30 年）的物種最脆弱，恢復速度最慢。這凸顯熱帶大型掠食性鯊魚的高風險。",
      
      // Technology Highlight
      techTitle: "從數據到行動的鯊魚熱點預測計畫",
      techDesc: "2020 年，Gorkin et al. 開發了一套名為 Sharkeye 的自主空中監控系統，利用飛艇與機器學習即時偵測鯊魚，並將數據分享給研究者與當地社群，降低人類與鯊魚的衝突。受到這個計畫的啟發，我們結合 NASA 開放衛星數據（MODIS, MEaSUREs） 與機器學習模型，預測鯊魚覓食熱點，並透過網站顯示科學數據與社群互動，推廣海洋保育教育，讓人類更重視保育政策、漁業管理與公民科學的參與。",
      techImageCaption: "Gorkin et al.(2020) 開發的 Sharkeye 透過預處理空拍影像與物件偵測模型，分析出每個網格可能的物件，標示出偵測結果如鯊魚或泳客等。",

      // 新增區域 1 - 研究方法
      methodTitle: "研究方法：衛星遙測與機器學習整合",
      methodDesc: "我們的研究方法結合了 NASA 的海洋環境數據，以及棲息在墨西哥灣的鯨鯊資料。透過 MODIS 衛星監測海洋溫度，並透過海洋顏色變化推論葉綠素濃度，MEASUREs 則結合多衛星數據提供海面高度異常數據。將環境數據與鯨鯊的位置資訊結合後，我們使用隨機森林(Random Forest)演算法建立模型，預測鯨鯊未來可能的棲息地位置。",
      methodImageCaption: "隨機森林 (Random Forest) 模型使用 2014 年 9 月 26 日至 10 月 14 日的已知物種位置訓練資料來預測下週位置（左） 。 我們比較 2014 年 10 月 15 日至 10 月 21 日的實際位置（中）和預測位置（右）。暖色調（黃、綠色）區域表示物種出現的機率較高，預測熱點與實際觀測位置高度吻合。",
      

      // 新增區域 1.5 - 研究結果
      resultsTitle: "鯨鯊與環境的互動",
      resultsDesc: "我們發現鯊魚偏好溫暖且葉綠素濃度低的貧瘠表層水域，這看似與常理不符，理論上掠食者應該出現在營養的環境中。然而我們進一步發現，這些水域是巨大的「暖反氣旋渦流」，顯示出正海平面高度異常。鯊魚巧妙地利用這些從表層延伸至數百米深處的暖水柱，讓牠們能夠潛入富含獵物的深層進行更長時間的狩獵，同時又保持在相對溫暖的水體中。這項發現打破我們過往對於鯊魚棲地的認知。",
      resultsImageCaption: "鯊魚位置與海面溫度（Sea Surface Temperature, SST）及葉綠素a（Chlorophyll-a, CHL-a）濃度的關係。數據顯示鯊魚的觀測點（綠點）絕大多數集中在海面溫度較高（通常高於 28°C）且葉綠素a濃度極低（通常低於 0.4 mg m⁻³）的水域。相比之下，隨機選取的控制點（灰點）則廣泛分佈於各種環境條件下，包括那些溫度較低、生產力較高的水域。",
      resultsImageCaption2: "鯊魚的移動軌跡（多色線條）疊加在海面高度異常（Sea Surface Height Anomaly, SSHA）圖上。該地圖的地理範圍集中在墨西哥灣東北部，大約位於北緯 24-28 度與西經 85-90 度之間。",

      // 新增區域 1.6 - 研究結果2
      results2Title: "環境參數重要性",
      results2Desc: "環境參數重要性分析顯示，葉綠素a濃度是預測鯊魚位置最強的變數，此結果量化葉綠素相比於溫度或海表高度異常，是辨識暖核渦流最清晰的表層指標。其次，年份日的重要性也極高，表明鯊魚的分佈具有強烈的季節性規律，並被模型成功捕捉。與此形成鮮明對比的是，經緯度等靜態地理座標的重要性極低，顯示鯊魚的棲地選擇是由水的動態特性所決定，而非其固定的地理位置。",
      results2ImageCaption: "隨機森林特徵重要性條形圖，量化了每個環境變數對模型預測準確性的貢獻程度。",

      // 新增區域 2 - 未來願景
      visionTitle: "未來願景：科技與保育的永續", 
      visionDesc: "透過統計分析和機器學習，我們展示了墨西哥灣鯊魚的棲息地選擇行為及其背後的生態機制。這些掠食者喜好棲息在暖核反氣旋渦流的中心區域。透過其溫暖、低葉綠素的表層特徵以及正海面高度異常，我們將能從太空中透過衛星數據來推論鯊魚位置。同時，我們透過已知的鯊魚位置訓練隨機森林機器學習模型，該模型解釋環境變數與物種存在之間複雜、非線性的關係，並能夠生成準確、動態的棲息地預測，從而驗證了我們對於生態學的理解。未來我們能結合衛星數據與機器學習模型，分析追蹤器回傳的資料，藉此識別關鍵的生物熱點，包含鯊魚與各種被捕食的生物，從生產者到消費者，預測物種分佈因氣候變遷而可能發生的轉變，並為漁業禁捕進行動態管理，以減少對脆弱物種的誤捕，保護其關鍵棲息地。透過建立一個開放數據平台，研究人員與保育團體將能獲取關於海洋生物的即時預測資訊。透過資訊共享，如與OCEARCH或全球科學家合作，共同分析全球數據與更多鯊魚物種，我們將能建立一個智慧海洋監測網絡，確保未來世代能夠在健康的海洋環境中與這些多樣的生物共存。"
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
      environmentalModeDesc: "監測海洋環境與生態關聯",
      standardMap: "標準地圖",
      satelliteImages: "衛星圖像",
      terrainMap: "地形圖",
      heatmapMode: "熱力圖模式",
      currentMode: "當前模式",
      satelliteTracking: "MODIS(SST, CHL-a), MEaSUREs(SSHA), Movebank(鯨鯊)",
      researchPurposeDesc: "鯊魚棲息地分析",
      markingMode: "標記模式",
      environmentMode: "環境數據模式",
      sharkSightingStatistics: "鯊魚出現統計",
      numberOfOccurrences: '出現次數',
      tigerShark: "虎鯊",
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
        sharkProbability: "鯊魚預測機率",
        dataDtatistics: {
          shark: "{{count}} 個鯊魚紀錄",
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
      title: "EcoTag-Q：量子傳輸鯊魚生態追蹤系統",
      subtitle: "整合式標籤・量子通訊・行為與食物網感測",
      systemOverview: "系統概覽",
      systemImageCaption: "EcoTag-Q 系統架構，從鯊魚身上的智慧標籤到量子安全的雲端資料庫傳輸",
      
      integratedTag: {
        title: "EcoTag-Q",
        description: "此標籤是高度整合的微型實驗室，附著在鯊魚身上進行偵測。"
      },
      
      feedingDetection: {
        title: "覓食行為偵測",
        description: "結合加速度計記錄三軸高頻動作如衝刺加速、咬合與衝擊，以及陀螺儀記錄捕食時的翻滾、俯仰和姿態變化，辨認捕食瞬間的爆發性動作並量化覓食能量消耗。"
      },
      
      preyIdentification: {
        title: "獵物種類判斷",
        description: "透過胃溫感測器測量鯊魚胃部溫度變化，eDNA微型檢測模組從周圍水體採集樣本進行現場DNA分析，以及化學感測器偵測消化過程中的生物標記，精準判斷食物類別。"
      },
      
      aiProcessing: {
        title: "運算與資料處理",
        description: "部署預先訓練的一維卷積神經網絡(1D-CNN)，即時分析動作數據，當符合覓食模式時觸發其他感測器並生成事件摘要，讓被動記錄變為主動辨識，減少能耗增加電池壽命。"
      },
      
      quantumLink: {
        title: "資料與量子傳輸",
        description: "將打包的事件摘要從鯊魚傳送到雲端資料庫，利用量子通訊確保數據的絕對安全。"
      },
      
      acousticUplink: {
        title: "聲學上傳",
        description: "將加密的事件摘要從鯊魚標籤短距離傳輸到固定的接收節點。聲波在水中傳輸效率高且不被吸收。"
      },
      
      seafloorNode: {
        title: "海底節點",
        description: "接收聲學信號，轉換為光信號，並作為量子通訊的起點。連接到光纖網絡，支援量子和傳統數據的傳輸。"
      },
      
      quantumRepeater: {
        title: "量子重複器",
        description: "部署於長距離光纖鏈路的中繼點，克服光子衰減問題。透過糾纏交換和量子記憶體，將量子安全通訊距離從幾十公里延伸到數百甚至數千公里。"
      },
      
      quantumProcessor: {
        title: "量子處理器",
        description: "位於陸上資料中心入口，計算量子位元錯誤率，進行錯誤更正與隱私放大，生成最終的安全金鑰池進行解密。"
      },
      
      cloudServer: {
        title: "雲端伺服器",
        description: "全球分佈的資料中心儲存解密後的數據，提供給科學家和保育單位進行分析和查詢，確保數據的即時性與可擴展性。"
      }
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
      example_csv: "下載範例資料",
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
      realTimeUpdate: "等待資料上傳...",
      globalCoverage: "墨西哥灣"
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
      heroTitle: "Shark from Space",
      heroSubtitle: "2025 NASA Space Apps Challenge",
      heroDescription: "Using NASA satellite data to track the top predators in the ocean.",
      heroMission: "no water, no life. no blue, no green -- Dr. Sylvia Earle ",
      
      
      // Call to Action
      exploreButton: "Track Sharks!",
      watchStory: "The Story of Sharks",
      
      // Mission Statement
      missionTitle: "A Global Alert on Shark Extinction",
      missionDesc: "In popular imagination, sharks are often seen as ruthless predators, symbols of danger and fear. Yet, precisely because they occupy the top of the food chain, sharks are indispensable for maintaining the balance of marine ecosystems. Without sharks, the stability of the entire food web—from phytoplankton to fisheries—would be at risk. According to a 2021 Nature study by Pacoureau et al., global populations of sharks and rays have declined by 71% since 1970, primarily due to overfishing, sounding the alarm for the collapse of entire marine ecosystem functions.",
      missionImageCaption: "Pacoureau et al.(2021) show the changes in shark populations across different oceans and ecological traits since 1970. In the Atlantic, populations stabilized at low levels after a long decline; in the Pacific, sharp drops occurred before 1990 followed by slower declines; and in the Indian Ocean, the decline was most severe. By traits, tropical sharks declined faster than temperate ones, large-bodied species (>500 cm) declined more steeply, and long-generation species (>30 years) proved the most vulnerable with the slowest recovery. This highlights the high conservation risk faced by tropical, large predators.",
      

      // Technology Highlight
      techTitle: "From Data to Action: Predicting Shark Hotspots",
      techDesc: "In 2020, Gorkin et al. developed an autonomous aerial surveillance system named Sharkeye, which uses an airship and machine learning to detect sharks in real-time and shares data with researchers and local communities to reduce human-shark conflict. Inspired by this project, we combine NASA's open satellite data (MODIS, MEaSUREs) with machine learning models to predict shark foraging hotspots. Through a website, we display scientific data and facilitate community interaction to promote marine conservation education, encouraging people to place greater importance on conservation policies, fisheries management, and participation in citizen science.",
      techImageCaption: "Sharkeye, developed by Gorkin et al. (2020), analyzes potential objects in each grid cell using pre-processed aerial imagery and an object detection model, marking the final detected results such as sharks or swimmers.",

      // New Section 1 - Research Methods
      methodTitle: "Research Methods: Satellite Remote Sensing and Machine Learning Integration",
      methodDesc: "Our research methods combine NASA's ocean environmental data, as well as whale shark data inhabiting the Gulf of Mexico. Through MODIS satellite monitoring of ocean temperature, and inferring chlorophyll concentration through ocean color changes, MEASUREs combines multi-satellite data to provide sea surface height anomaly data. After combining environmental data with whale shark position information, we use Random Forest algorithm to build models to predict possible future habitat locations of whale sharks.",
      methodImageCaption: "The Random Forest (RF) model was trained with known species locations from September 26 to October 14, 2014 (Left) to predict the distribution for the subsequent week. We then compare the actual locations from October 15 to October 21, 2014 (Center) with the model's prediction (Right). Warm-colored areas (yellow, green) represent a higher probability of species presence, and the predicted hotspots align well with the actual observations.",
      

      // New Section 1.5 - Research Results
      resultsTitle: "Interaction Between Whale Sharks and Environment",
      resultsDesc: "We discovered that sharks exhibit a preference for warm, nutrient-poor surface waters with low chlorophyll concentrations. This finding is counterintuitive, given that predators are typically expected to aggregate in productive environments. We identified these waters as large, warm anticyclonic eddies, characterized by positive sea surface height anomalies. Sharks use these warm water columns, extending hundreds of meters deep, to make prolonged dives into prey-rich deep waters for hunting, all while staying in a thermally favorable environment. This discovery fundamentally changes our previous understanding of shark habitats.",
      resultsImageCaption: "Shark locations against Sea Surface Temperature (SST) and Chlorophyll-a (CHL-a) concentration. The data clearly shows that shark locations (green dots) are overwhelmingly clustered in waters with high SST (typically > 28°C) and very low CHL-a concentrations (typically < 0.4 mg m⁻³). In contrast, random control points (grey dots) are scattered across a much wider range of conditions, including cooler, more productive waters.",
      resultsImageCaption2: "Shark tracks (multi-colored lines) on a map of Sea Surface Height Anomaly (SSHA). The map is geographically focused on the northeastern Gulf of Mexico, approximately between 24-28°N latitude and 85-90°W longitude",

      // New Section 1.6 - Research Results2
      results2Title: "Environmental Variable Importance",
      results2Desc: "Analysis of environmental parameter importance reveals that chlorophyll-a concentration is the most powerful predictor of shark location, quantitatively confirming that extremely low chlorophyll is the clearest surface signature of warm-core eddies, comparing to the SST and SSHA. Furthermore, the high importance of 'day of the year' highlights a strong seasonality in shark distribution successfully captured by the model. In stark contrast, static geographic coordinates such as longitude and latitude were of minimal importance, demonstrating that shark habitat selection is driven by the dynamic properties of water masses, not by fixed geographic positions.",
      results2ImageCaption: "A Random Forest feature importance bar plot, quantifying the contribution of each environmental variable to the model's predictive accuracy.",

      // New Section 2 - Future Vision  
      visionTitle: "Future Vision: Sustainable Integration of Technology and Conservation",
      visionDesc: "Through statistical analysis and machine learning, we demonstrate the habitat selection behavior of sharks in the Gulf of Mexico and the ecological mechanisms behind it. These predators prefer to inhabit the central regions of warm-core anticyclonic eddies. By leveraging their warm, low-chlorophyll surface characteristics and positive sea surface height anomalies, we will be able to infer shark locations from space using satellite data. Concurrently, we are training a random forest machine learning model using known shark locations. This model explains the complex, non-linear relationships between environmental variables and species presence and is capable of generating accurate, dynamic habitat predictions, thereby validating our understanding of ecology. In the future, we can combine satellite data with machine learning models to analyze data from trackers. This will allow us to identify critical biological hotspots—including sharks and various prey species, from producers to consumers—predict potential shifts in species distribution due to climate change, and implement dynamic management for fishery closures to reduce the bycatch of vulnerable species and protect their critical habitats. By establishing an open data platform, researchers and conservation groups will be able to access real-time predictive information about marine life. Through information sharing, such as collaborating with OCEARCH or scientists worldwide to jointly analyze global data and more shark species, we can establish an intelligent ocean monitoring network, ensuring that future generations can coexist with these diverse creatures in healthy marine environments."
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
      satelliteTracking: "MODIS(SST, CHL-a), MEaSUREs(SSHA), Movebank(Whale Shark)",
      researchPurposeDesc: "Shark Habitat Analysis",
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
        sharkProbability: "Sharks Predicted Probability",
        dataDtatistics: {
          shark: "{{count}} Sharks' Points",
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
      title: "EcoTag-Q: Quantum Enhanced Shark Ecology Tracking System",
      subtitle: "Integrated Tag・Quantum Communication・Behavioral & Food Web Sensing",
      systemOverview: "System Overview",
      systemImageCaption: "EcoTag-Q System: From the smart tags on the shark to the quantum-secure cloud database transmission",

      integratedTag: {
        title: "EcoTag-Q",
        description: "This tag is a highly integrated micro-laboratory attached to the shark for detection."
      },

      feedingDetection: {
        title: "Foraging Behavior Detection",
        description: "Combines an accelerometer to record high-frequency, tri-axial movements like burst acceleration, bites, and impacts, with a gyroscope to record rolls, pitches, and posture changes during predation. This allows for identifying the explosive moments of a predation event and quantifying the energy expenditure of foraging."
      },

      preyIdentification: {
        title: "Prey Type Identification",
        description: "Utilizes a stomach temperature sensor to measure changes in the shark's stomach temperature, an eDNA micro-sensor module to collect water samples for on-site DNA analysis, and a chemical sensor to detect biomarkers during digestion, enabling accurate determination of prey type."
      },

      aiProcessing: {
        title: " Computing & Data Processing",
        description: "Deploys a pre-trained 1D Convolutional Neural Network (1D-CNN) to analyze motion data in real-time. When a foraging pattern is detected, it triggers other sensors and generates an event summary. This shifts the process from passive recording to active identification, reducing power consumption and extending battery life."
      },

      quantumLink: {
        title: "Data & Quantum Transmission",
        description: "Transmits the packaged event summaries from the shark to a cloud database, using quantum communication to ensure the absolute security of the data."
      },

      acousticUplink: {
        title: "Acoustic Upload",
        description: "Transmits encrypted event summaries over a short distance from the shark tag to a fixed receiving node. Acoustic waves are highly efficient for transmission in water."
      },

      seafloorNode: {
        title: "Node",
        description: "Receives the acoustic signal, converts it into an optical signal, and serves as the starting point for quantum communication. It connects to the optical fiber network, supporting the transmission of both quantum and classical data."
      },

      quantumRepeater: {
        title: "Quantum Repeater",
        description: "Deployed at intermediate points along long-distance fiber optic links to overcome photon attenuation. Through entanglement swapping and quantum memory, it extends the range of secure quantum communication from tens to hundreds or even thousands of kilometers."
      },

      quantumProcessor: {
        title: "Quantum Processor",
        description: "Located at the shore-based data center, it calculates the Quantum Bit Error Rate (QBER), performs error correction and privacy amplification, and generates the final secure key pool used for decryption."
      },

      cloudServer: {
        title: "Cloud Server",
        description: "Globally distributed data centers store the decrypted data, making it available to scientists and conservationists for analysis and querying. This ensures the data's real-time availability and scalability."
      }
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
      example_csv: "Download sample file",
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
      realTimeUpdate: "Waiting for data upload...",
      globalCoverage: "Gulf of Mexico"
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