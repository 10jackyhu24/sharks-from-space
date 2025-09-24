// src/pages/Members.js
import React from 'react';

function Members() {
  const members = [
    {
      name: '李研究員',
      role: '項目主持人',
      expertise: '海洋生物學 · 鯊魚生態',
      avatar: '👨‍🔬',
      email: 'researcher.li@university.edu',
      description: '專精鯊魚行為研究，擁有15年海洋生態調查經驗'
    },
    {
      name: '張工程師', 
      role: '技術總監',
      expertise: '衛星通訊 · 硬體設計',
      avatar: '👩‍💻',
      email: 'engineer.zhang@university.edu',
      description: '負責智能標籤硬體開發與衛星通訊系統整合'
    },
    {
      name: '陳數據師',
      role: '數據科學家',
      expertise: '機器學習 · 大數據分析', 
      avatar: '👨‍💼',
      email: 'data.chen@university.edu',
      description: '專責 AI 模型開發與 NASA 衛星數據處理分析'
    },
    {
      name: '王開發者',
      role: '前端工程師',
      expertise: 'React · 數據視覺化',
      avatar: '👩‍🎨',
      email: 'dev.wang@university.edu', 
      description: '建置互動式網頁平台與地理空間數據視覺化'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem'
        }}>
          👥 研究團隊
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: '0.9'
        }}>
          跨領域專家團隊 · 結合海洋科學與太空技術
        </p>
      </section>

      <div style={{ padding: '60px 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* 團隊介紹 */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '2rem',
                color: '#2d3748',
                marginBottom: '2rem'
              }}>
                🌊 關於我們的團隊
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#4a5568',
                lineHeight: '1.8',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                我們是一支由海洋生物學家、工程師、數據科學家與軟體開發者組成的跨領域團隊。
                結合各自的專業知識，致力於運用最新的太空技術來探索海洋生態，
                為鯊魚保育與海洋研究開創新的可能性。
              </p>
            </div>
          </section>

          {/* 成員卡片 */}
          <section>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {members.map((member, index) => (
                <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                  {/* 頭像 */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    margin: '0 auto 1.5rem auto',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                  }}>
                    {member.avatar}
                  </div>

                  {/* 基本資訊 */}
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: '#2d3748',
                    marginBottom: '0.5rem'
                  }}>
                    {member.name}
                  </h3>
                  
                  <div style={{
                    color: '#667eea',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    {member.role}
                  </div>

                  <div style={{
                    background: '#f7fafc',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    display: 'inline-block'
                  }}>
                    {member.expertise}
                  </div>

                  {/* 描述 */}
                  <p style={{
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {member.description}
                  </p>

                  {/* 聯絡方式 */}
                  <div style={{
                    padding: '1rem',
                    background: '#f7fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      color: '#4a5568',
                      fontSize: '0.8rem',
                      marginBottom: '0.5rem'
                    }}>
                      📧 聯絡方式
                    </div>
                    <a 
                      href={`mailto:${member.email}`}
                      style={{
                        color: '#667eea',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}
                    >
                      {member.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 合作機構 */}
          <section style={{ marginTop: '5rem' }}>
            <h2 style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#2d3748'
            }}>
              🤝 合作機構
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { name: 'NASA', desc: '衛星數據提供與技術支援', icon: '🛰️' },
                { name: 'OCEARCH', desc: '鯊魚追蹤數據合作夥伴', icon: '🦈' },
                { name: '海洋研究所', desc: '海洋生態學術研究合作', icon: '🏛️' },
                { name: '國家太空中心', desc: '太空技術應用指導', icon: '🚀' }
              ].map((org, index) => (
                <div key={index} className="card" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  border: '2px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {org.icon}
                  </div>
                  <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>
                    {org.name}
                  </h4>
                  <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                    {org.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Members;
