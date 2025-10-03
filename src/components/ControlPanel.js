// src/components/ControlPanel.js - 修正版
import React from 'react';
import { Card, Switch, Select, DatePicker, Divider } from 'antd';
import { EyeOutlined, FilterOutlined, AppstoreOutlined } from '@ant-design/icons'; // 使用正確的圖標
import { useSharkStore } from '../store/sharkStore';

const { Option } = Select;
const { RangePicker } = DatePicker;

function ControlPanel() {
  const {
    selectedSpecies,
    showHeatmap,
    activeEnvironmentalLayers,
    timeRange,
    toggleSpecies,
    updateTimeRange,
    toggleEnvironmentalLayer,
  } = useSharkStore();

  return (
    <div style={{ padding: '16px' }}>
      <Card title={<><FilterOutlined /> 物種篩選</>} size="small">
        <Select
          mode="multiple"
          placeholder="選擇鯊魚種類"
          value={selectedSpecies}
          onChange={(values) => {
            useSharkStore.setState({ selectedSpecies: values });
          }}
          style={{ width: '100%' }}
        >
          <Option value="Whale Shark">鯨鯊</Option>
          <Option value="Tiger Shark">虎鯊</Option>
        </Select>
      </Card>

      <Divider />

      <Card title={<><EyeOutlined /> 視覺化選項</>} size="small">
        <div style={{ marginBottom: '12px' }}>
          <Switch
            checked={showHeatmap}
            onChange={(checked) => 
              useSharkStore.setState({ showHeatmap: checked })
            }
          />
          <span style={{ marginLeft: '8px' }}>熱力圖模式</span>
        </div>
      </Card>

      <Divider />

      <Card title={<><AppstoreOutlined /> 環境圖層</>} size="small">
        <div style={{ marginBottom: '8px' }}>
          <Switch
            checked={activeEnvironmentalLayers?.includes('sst')}
            onChange={() => toggleEnvironmentalLayer?.('sst')}
          />
          <span style={{ marginLeft: '8px' }}>海面溫度</span>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <Switch
            checked={activeEnvironmentalLayers?.includes('chlorophyll')}
            onChange={() => toggleEnvironmentalLayer?.('chlorophyll')}
          />
          <span style={{ marginLeft: '8px' }}>葉綠素 a</span>
        </div>
        <div>
          <Switch
            checked={activeEnvironmentalLayers?.includes('currents')}
            onChange={() => toggleEnvironmentalLayer?.('currents')}
          />
          <span style={{ marginLeft: '8px' }}>洋流</span>
        </div>
      </Card>

      <Divider />

      <Card title="時間範圍" size="small">
        <RangePicker
          showTime
          onChange={(dates) => {
            if (dates) {
              updateTimeRange?.({
                start: dates[0].toDate(),
                end: dates[1].toDate()
              });
            }
          }}
          style={{ width: '100%' }}
        />
      </Card>
    </div>
  );
}

export default ControlPanel;