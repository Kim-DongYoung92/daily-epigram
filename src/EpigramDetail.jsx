import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EpigramDetail = () => {
  const { id } = useParams(); // URL에 있는 ID 숫자 값을 가져옵니다.

  // 창고(localStorage)에서 이 ID에 맞는 데이터만 딱 하나 찾아옵니다.
  const [epigram] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('epigrams') || '[]');
    return saved.find(item => item.id === Number(id));
  });

  // 만약 글을 못 찾았다면 안내 메시지를 보여줍니다.
  if (!epigram) return <div style={{ padding: '20px' }}>글을 찾을 수 없습니다.</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      {/* 1. 태그 표시 */}
      <div style={{ color: '#007bff', marginBottom: '15px' }}>
        {epigram.tags?.map((tag, i) => <span key={i}>#{tag} </span>)}
      </div>

      {/* 2. 에피그램 내용 */}
      <h1 style={{ fontSize: '22px', fontWeight: 'normal', lineHeight: '1.6', marginBottom: '30px' }}>
        {epigram.content}
      </h1>

      {/* 3. 저자 표시 */}
      <p style={{ color: '#666' }}>- {epigram.author} -</p>

      {/* 4. 출처 및 URL 버튼 */}
      {epigram.sourceTitle && (
        <div style={{ marginTop: '20px' }}>
          <span>{epigram.sourceTitle}</span>
          {epigram.sourceUrl && (
            <button
              onClick={() => window.open(epigram.sourceUrl, '_blank')}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
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