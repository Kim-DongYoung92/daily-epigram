// src/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // 요구사항: 모든 입력값이 정상일 경우 홈("/")으로 이동
    if (email && password && passwordConfirm && nickname) {
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      alert("회원가입 완료!");
      navigate("/"); // 홈 화면으로 이동
    } else {
      alert("모든 항목을 입력해 주세요.");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>이메일</label><br />
          <input
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>비밀번호</label><br />
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label>비밀번호 확인</label><br />
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <div>
          <label>닉네임</label><br />
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Signup;