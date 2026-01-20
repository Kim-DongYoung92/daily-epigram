import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEpigram = () => {
  const navigate = useNavigate();

  // 상태 관리: 내용, 저자 타입, 저자 이름, 출처 제목, 출처 URL, 태그
  const [content, setContent] = useState('');
  const [authorType, setAuthorType] = useState('직접 입력');
  const [authorName, setAuthorName] = useState('');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [tagInput, setTagInput] = useState(''); // 태그 입력창 상태
  const [tags, setTags] = useState([]); // 추가된 태그 배열

  // 유효성 검사 변수
  const isContentTooLong = content.length > 500;
  const isFormValid = content.length > 0 && !isContentTooLong && (authorType !== '직접 입력' || authorName.trim() !== '');

  // 태그 추가 로직 (엔터 키 입력 시)
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (tags.length >= 3) {
        alert("태그는 최대 3개까지만 가능합니다.");
        return;
      }
      if (tagInput.length > 10) {
        alert("태그는 최대 10자까지 입력 가능합니다.");
        return;
      }
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // 태그 삭제 로직
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // 작성완료 버튼 클릭
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 1. 입력한 데이터들을 하나로 묶기
    const newEpigram = {
      id: Date.now(),
      content,
      author: authorType === '직접 입력' ? authorName : authorType,
      sourceTitle,
      sourceUrl,
      tags,
      createdAt: new Date().toISOString(),
    };

    // 2. 브라우저 저장소(localStorage)에 저장하는 핵심 로직
    const existingEpigrams = JSON.parse(localStorage.getItem('epigrams') || '[]');
    const updatedEpigrams = [newEpigram, ...existingEpigrams];
    localStorage.setItem('epigrams', JSON.stringify(updatedEpigrams));

    alert("에피그램이 등록되었습니다!");

    // 3. 등록 후 피드(리스트) 페이지로 이동
    navigate('/epigramlist');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>에피그램 만들기</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* 내용 입력 영역 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>내용 <span style={{ color: 'red' }}>*</span></label>
          <textarea
            placeholder="500자 이내로 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', height: '150px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            {isContentTooLong && <span style={{ color: 'red', fontSize: '12px' }}>500자를 초과할 수 없습니다.</span>}
            <span style={{ fontSize: '12px', color: '#888', marginLeft: 'auto' }}>{content.length}/500</span>
          </div>
        </div>

        {/* 저자 선택 영역 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>저자 <span style={{ color: 'red' }}>*</span></label>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
            {['직접 입력', '알 수 없음', '본인'].map((type) => (
              <label key={type} style={{ fontSize: '14px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="authorType"
                  checked={authorType === type}
                  onChange={() => setAuthorType(type)}
                  style={{ marginRight: '5px' }}
                /> {type}
              </label>
            ))}
          </div>
          {authorType === '직접 입력' && (
            <input
              type="text"
              placeholder="저자 이름을 입력해주세요."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          )}
        </div>

        {/* 출처 입력 영역 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>출처</label>
          <input
            type="text"
            placeholder="출처 제목 입력"
            value={sourceTitle}
            onChange={(e) => setSourceTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '8px' }}
          />
          <input
            type="text"
            placeholder="URL (ex. https://www.website.com)"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </div>

        {/* 태그 입력 영역 */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>태그</label>
          <input
            type="text"
            placeholder="입력하여 태그 작성 (최대 10자, 엔터로 추가)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            {tags.map((tag, index) => (
              <span key={index} style={{ background: '#f0f2f5', padding: '4px 10px', borderRadius: '16px', fontSize: '13px' }}>
                #{tag} <button type="button" onClick={() => removeTag(index)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#888' }}>&times;</button>
              </span>
            ))}
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isFormValid ? '#cfd6e1' : '#eee',
            color: isFormValid ? '#4a5568' : '#aaa',
            fontWeight: 'bold',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
        >
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default AddEpigram;