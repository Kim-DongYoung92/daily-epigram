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
      const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });


      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));

      alert("로그인 성공!");
      navigate('/epigramlist');
    } catch (error) {
      console.log(error)
      alert("로그인 정보가 올바르지 않습니다.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;