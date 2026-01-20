import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EpigramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. 에피그램 목록 상태 관리
  const [epigrams, setEpigrams] = useState(() => {
    const saved = localStorage.getItem('epigrams');
    return saved ? JSON.parse(saved) : [];
  });

  // 해당 게시글 찾기
  const epigram = epigrams.find(item => item.id === Number(id));

  // 2. 수정 버튼 클릭 시 실행될 함수 
  const handleEdit = () => {
    navigate('/addepigram', { state: { editData: epigram } });
  };

  // 3. 삭제 함수
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedList = epigrams.filter(item => item.id !== Number(id));
      setEpigrams(updatedList);
      localStorage.setItem('epigrams', JSON.stringify(updatedList));
      alert("삭제되었습니다.");
      navigate('/epigramlist');
    }
  };

  if (!epigram) return <div style={{ padding: '20px' }}>글을 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>

      {/* 수정/삭제 버튼 영역 */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={handleEdit}
          style={{ marginRight: '10px', padding: '5px 15px', cursor: 'pointer' }}
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          style={{ padding: '5px 15px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          삭제
        </button>
      </div>

      <div style={{ color: '#007bff', marginBottom: '15px' }}>
        {epigram.tags?.map((tag, i) => <span key={i}>#{tag} </span>)}
      </div>

      <h1 style={{ fontSize: '22px', fontWeight: 'normal', lineHeight: '1.6', marginBottom: '30px' }}>
        {epigram.content}
      </h1>

      <p style={{ color: '#666' }}>- {epigram.author} -</p>

      {epigram.sourceTitle && (
        <div style={{ marginTop: '20px' }}>
          <span>{epigram.sourceTitle}</span>
          {epigram.sourceUrl && (
            <button onClick={() => window.open(epigram.sourceUrl, '_blank')} style={{ marginLeft: '10px' }}>
              원문 보러가기 ↗
            </button>
          )}
        </div>
      )}

      <hr style={{ margin: '40px 0', border: '0.5px solid #eee' }} />
      <p style={{ color: '#ccc' }}>좋아요와 댓글 기능은 곧 추가될 예정입니다!</p>
    </div>
  );
};

export default EpigramDetail;