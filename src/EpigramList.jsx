import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EpigramList = () => {
  const navigate = useNavigate();

  const [epigrams] = useState(() => {
    const saved = localStorage.getItem('epigrams');
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        에피그램 피드
      </h2>

      {epigrams.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>등록된 글이 없습니다.</p>
      ) : (
        epigrams.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/epigrams/${item.id}`)}
            style={{
              border: '1px solid #eee',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              cursor: 'pointer'
            }}
          >
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>"{item.content}"</p>
            <p style={{ textAlign: 'right', fontWeight: 'bold', color: '#555' }}>- {item.author}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EpigramList;