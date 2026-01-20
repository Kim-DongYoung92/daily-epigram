import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddEpigram = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 상세 페이지에서 넘겨준 수정용 데이터 받기
  const editData = location.state?.editData;

  // 2. 상태 초기화 (데이터가 없을 경우를 대비해 빈 값 처리 및 데이터 타입 보정)
  const [content, setContent] = useState(editData ? editData.content : '');

  // 저자 타입 판단 로직
  const getInitialAuthorType = () => {
    if (!editData) return '직접 입력';
    if (['알 수 없음', '본인'].includes(editData.author)) return editData.author;
    return '직접 입력';
  };
  const [authorType, setAuthorType] = useState(getInitialAuthorType());

  const [authorName, setAuthorName] = useState(
    editData && !['알 수 없음', '본인'].includes(editData.author) ? editData.author : ''
  );

  const [sourceTitle, setSourceTitle] = useState(editData ? editData.sourceTitle : '');
  const [sourceUrl, setSourceUrl] = useState(editData ? editData.sourceUrl : '');
  const [tagInput, setTagInput] = useState('');

  // [핵심] tags가 배열이 아닐 경우를 대비해 안전하게 초기화
  const [tags, setTags] = useState(() => {
    if (!editData || !editData.tags) return [];
    return Array.isArray(editData.tags) ? editData.tags : [];
  });

  const isContentTooLong = content.length > 500;
  const isFormValid = content.length > 0 && !isContentTooLong && (authorType !== '직접 입력' || authorName.trim() !== '');

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (tags.length >= 3) return alert("태그는 최대 3개까지만 가능합니다.");
      if (tagInput.length > 10) return alert("태그는 최대 10자까지 입력 가능합니다.");
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const existingEpigrams = JSON.parse(localStorage.getItem('epigrams') || '[]');

    if (editData) {
      // 수정 모드
      const updatedEpigrams = existingEpigrams.map(item =>
        item.id === editData.id
          ? {
            ...item,
            content,
            author: authorType === '직접 입력' ? authorName : authorType,
            sourceTitle,
            sourceUrl,
            tags
          }
          : item
      );
      localStorage.setItem('epigrams', JSON.stringify(updatedEpigrams));
      alert("에피그램이 수정되었습니다!");
    } else {
      // 신규 등록 모드
      const newEpigram = {
        id: Date.now(),
        content,
        author: authorType === '직접 입력' ? authorName : authorType,
        sourceTitle,
        sourceUrl,
        tags,
        userId: "me",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('epigrams', JSON.stringify([newEpigram, ...existingEpigrams]));
      alert("에피그램이 등록되었습니다!");
    }
    navigate('/epigramlist');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>
        {editData ? "에피그램 수정하기" : "에피그램 만들기"}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 내용 입력 */}
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

        {/* 저자 선택 */}
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

        {/* 출처 */}
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

        {/* 태그 */}
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
          {editData ? "수정 완료" : "작성 완료"}
        </button>
      </form>
    </div>
  );
};

export default AddEpigram;