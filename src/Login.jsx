import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 이메일 유효성 검사 (blur 시 실행)
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("이메일은 필수 입력입니다.");
    } else if (!email.includes('@')) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else {
      setEmailError("");
    }
  };

  // 비밀번호 유효성 검사 (blur 시 실행)
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("비밀번호는 필수 입력입니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    // 모든 값이 정상일 경우만 이동
    if (email && password && !emailError && !passwordError) {
      alert("로그인 성공!");
      navigate("/"); // 랜딩 페이지로 이동
    }
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>이메일: </label>
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>

        <div>
          <label>비밀번호: </label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>

        <button type="submit">로그인</button>
      </form>
      <p>회원이 아니신가요? 가입하기</p>
    </div>
  );
}

export default Login;