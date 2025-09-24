// src/components/DataStoryPanel.js - 修正版
import React, { useState, useEffect } from 'react';
import { Card, Timeline, Button, Tag } from 'antd';
import { InfoCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useSharkStore } from '../store/sharkStore';

function DataStoryPanel() {
  const [stories, setStories] = useState([]);
  const { sharks = [], selectedSpecies = [] } = useSharkStore();

  useEffect(() => {
    generateDataStories();
  }, [sharks, selectedSpecies]);

  const generateDataStories = () => {
    const storyData = [
      {
        title: '深海覓食行為',
        description: '大白鯊在中尺度渦流邊緣進行深海覓食，利用渦流帶來的營養上升流。',
        location: [34.0522, -118.2437],
        species: 'Great White',
        timestamp: '2025-09-20T22:00:00Z',
        type: 'foraging'
      },
      {
        title: '洄游路徑',
        description: '虎鯊沿著溫度梯度線進行季節性洄游，追蹤海龜產卵地點。',
        location: [25.7617, -80.1918],
        species: 'Tiger Shark',
        timestamp: '2025-09-21T08:00:00Z',
        type: 'migration'
      },
      {
        title: '群體聚集',
        description: '雙髻鯊在海底山附近形成大型群體，利用上升流捕食。',
        location: [19.6895, 139.6917],
        species: 'Hammerhead',
        timestamp: '2025-09-19T16:00:00Z',
        type: 'aggregation'
      }
    ];

    setStories(storyData.filter(story => 
      selectedSpecies.length === 0 || selectedSpecies.includes(story.species)
    ));
  };

  const getTypeColor = (type) => {
    const colors = {
      foraging: 'orange',
      migration: 'blue',
      aggregation: 'green'
    };
    return colors[type] || 'default';
  };

  const focusOnStory = (story) => {
    // 未來可以連接到地圖視角控制
    console.log('Focus on story:', story.title);
  };

  return (
    <Card 
      title={<><InfoCircleOutlined /> 數據故事</>} 
      size="small" 
      style={{ margin: '16px', height: '400px', overflowY: 'auto' }}
    >
      <Timeline>
        {stories.map((story, index) => (
          <Timeline.Item key={index} color={getTypeColor(story.type)}>
            <div style={{ marginBottom: '8px' }}>
              <strong>{story.title}</strong>
              <Tag color={getTypeColor(story.type)} style={{ marginLeft: '8px' }}>
                {story.species}
              </Tag>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              {story.description}
            </p>
            <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px' }}>
              {new Date(story.timestamp).toLocaleString()}
            </div>
            <Button
              size="small"
              icon={<EnvironmentOutlined />}
              onClick={() => focusOnStory(story)}
            >
              查看位置
            </Button>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
}

export default DataStoryPanel;
