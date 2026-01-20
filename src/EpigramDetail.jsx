import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EpigramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. 상태 관리
  const [epigrams, setEpigrams] = useState(() => {
    const saved = localStorage.getItem('epigrams');
    return saved ? JSON.parse(saved) : [];
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [commentInput, setCommentInput] = useState('');

  // 좋아요를 눌렀는지 여부 상태 (로컬 스토리지 연동)
  const [isLiked, setIsLiked] = useState(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    return likedPosts.includes(Number(id));
  });

  const epigram = epigrams.find(item => item.id === Number(id));

  // [기능 1] 공유하기 (URL 복사)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL이 클립보드에 복사되었습니다!");
  };

  // [기능 2] 좋아요 토글 로직
  const handleLike = () => {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    let newLikeCount = epigram.likeCount || 0;

    if (isLiked) {
      // 이미 좋아요를 누른 경우 -> 취소
      newLikeCount = Math.max(0, newLikeCount - 1);
      likedPosts = likedPosts.filter(postId => postId !== Number(id));
      setIsLiked(false);
    } else {
      // 좋아요를 안 누른 경우 -> 추가
      newLikeCount = newLikeCount + 1;
      likedPosts.push(Number(id));
      setIsLiked(true);
    }

    // 전역 에피그램 목록 업데이트 및 저장
    const updatedEpigrams = epigrams.map(item =>
      item.id === Number(id) ? { ...item, likeCount: newLikeCount } : item
    );

    setEpigrams(updatedEpigrams);
    localStorage.setItem('epigrams', JSON.stringify(updatedEpigrams));
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  };

  // [기능 3] 댓글 등록
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      content: commentInput,
      writer: "익명",
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setCommentInput('');
  };

  // [기능 4] 삭제 로직
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedList = epigrams.filter(item => item.id !== Number(id));
      localStorage.setItem('epigrams', JSON.stringify(updatedList));
      alert("삭제되었습니다.");
      navigate('/epigramlist');
    }
  };

  if (!epigram) return <div style={{ padding: '20px' }}>글을 찾을 수 없습니다.</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handleShare} style={btnStyle}>공유</button>
        <button onClick={() => navigate('/addepigram', { state: { editData: epigram } })} style={btnStyle}>수정</button>
        <button onClick={handleDelete} style={{ ...btnStyle, color: 'red' }}>삭제</button>
      </div>

      <div style={{ textAlign: 'center', padding: '40px 0', borderBottom: '1px solid #eee' }}>
        <div style={{ color: '#007bff', marginBottom: '15px', fontSize: '14px' }}>
          {epigram.tags?.map((tag, i) => <span key={i} style={{ marginRight: '8px' }}>#{tag}</span>)}
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 'normal', lineHeight: '1.6', marginBottom: '20px' }}>
          "{epigram.content}"
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>- {epigram.author} -</p>

        {/* 좋아요 버튼 스타일 변경: 활성화 시 색상 변경 */}
        <button
          onClick={handleLike}
          style={{
            ...btnStyle,
            marginTop: '30px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isLiked ? '#ffebee' : '#fff', // 눌렀을 때 배경색 연한 빨강
            borderColor: isLiked ? '#ffcdd2' : '#ddd'
          }}
        >
          {isLiked ? '❤️' : '🤍'} {epigram.likeCount || 0}
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>댓글 {comments.length}</h3>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력해 주세요"
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '0 20px', borderRadius: '8px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>
            등록
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {comments.map(comment => (
            <div key={comment.id} style={{ paddingBottom: '15px', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{comment.writer}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={{ fontSize: '15px', color: '#333' }}>{comment.content}</div>
            </div>
          ))}
          {comments.length === 0 && <p style={{ color: '#999', textAlign: 'center' }}>첫 댓글을 남겨보세요!</p>}
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '6px 14px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s'
};

export default EpigramDetail;