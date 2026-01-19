// src/EpigramList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './constants';

function EpigramList() {
  const navigate = useNavigate();
  const [epigrams, setEpigrams] = useState([]); // 에피그램 목록 저장용

  // 1. 페이지가 로드될 때 서버에서 데이터 가져오기 (요구사항: 화면과 같이 노출)
  useEffect(() => {
    const getEpigrams = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/epigrams`);
        // 서버 응답 구조가 { list: [...] } 형태라고 가정합니다.
        setEpigrams(response.data.list || []);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };
    getEpigrams();
  }, []);

  return (
    <div>
      <header>
        <h2>사용자들이 직접 인용한 에피그램들</h2>
      </header>

      {/* 2. 에피그램 리스트 (카드 형태 구조) */}
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
        {epigrams.map((item) => (
          <div key={item.id} style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px' }}>
            <p>{item.content}</p>
            <p style={{ textAlign: 'right' }}>- {item.author} -</p>
            <small style={{ color: 'blue' }}>#태그 #예시</small>
          </div>
        ))}
      </main>

      {/* 3. 에피그램 더보기 버튼 (요구사항 반영) */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={() => alert('다음 페이지 데이터를 가져옵니다.')}>
          + 에피그램 더보기
        </button>
      </div>

      {/* 4. 에피그램 만들기 버튼 (요구사항: 작성 페이지 이동) */}
      <button
        onClick={() => navigate('/create')}
        style={{ position: 'fixed', bottom: '30px', right: '30px', padding: '15px', borderRadius: '50px' }}
      >
        + 에피그램 만들기
      </button>
    </div>
  );
}

export default EpigramList;