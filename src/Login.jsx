import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './constants';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password,
      });

      // 서버에서 준 토큰 저장
      const token = response.data.accessToken;
      localStorage.setItem('accessToken', token);

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("이메일 또는 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;