// src/components/TimeController.js - 修正版
import React, { useState, useEffect } from 'react';
import { Card, Button, Slider, Select } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useSharkStore } from '../store/sharkStore';

function TimeController() {
  const { timeRange, playbackSpeed = 1, isPlaying = false } = useSharkStore();
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + (playbackSpeed * 3600 * 1000);
          const endTime = timeRange?.end?.getTime() || Date.now();
          const startTime = timeRange?.start?.getTime() || (Date.now() - 30 * 24 * 60 * 60 * 1000);
          return next <= endTime ? next : startTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, timeRange]);

  const startTime = timeRange?.start?.getTime() || (Date.now() - 30 * 24 * 60 * 60 * 1000);
  const endTime = timeRange?.end?.getTime() || Date.now();

  return (
    <Card title="時間控制" size="small" style={{ margin: '16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {new Date(currentTime).toLocaleString()}
        </div>
      </div>
      
      <Slider
        min={startTime}
        max={endTime}
        value={currentTime}
        onChange={setCurrentTime}
        tipFormatter={(value) => new Date(value).toLocaleDateString()}
        style={{ marginBottom: '16px' }}
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={() => useSharkStore.setState({ isPlaying: !isPlaying })}
          type="primary"
        >
          {isPlaying ? '暫停' : '播放'}
        </Button>
        
        <Select
          value={playbackSpeed}
          onChange={(speed) => useSharkStore.setState({ playbackSpeed: speed })}
          style={{ width: 80 }}
        >
          <Select.Option value={0.5}>0.5x</Select.Option>
          <Select.Option value={1}>1x</Select.Option>
          <Select.Option value={2}>2x</Select.Option>
          <Select.Option value={5}>5x</Select.Option>
        </Select>
      </div>
    </Card>
  );
}

export default TimeController;
