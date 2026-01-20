import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './constants';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {

      const response = await axios.post(`${BASE_URL}/users`, {
        email: email,
        password: password,
        nickname: nickname,
      });

      console.log("서버응답:", response.data);
      alert("회원가입 성공!");
      navigate('/login');
    } catch (error) {

      console.error("에러상세:", error.response?.data || error.message);
      alert(error.response?.data?.message || "회원가입 실패! 콘솔창을 확인하세요.");
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>회원가입 (서버 연결형)</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '8px', width: '250px' }} />
        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '8px', width: '250px' }} />
        <input type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)} required style={{ padding: '8px', width: '250px' }} />
        <input type="text" placeholder="닉네임" value={nickname} onChange={e => setNickname(e.target.value)} required style={{ padding: '8px', width: '250px' }} />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>가입하기</button>
      </form>
    </div>
  );
}

export default Signup;