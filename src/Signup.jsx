import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './constants';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email && password && passwordConfirm && nickname) {
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}/signup`, {
          email: email,
          password: password,
          nickname: nickname,
        });

        if (response.status === 201 || response.status === 200) {
          alert("회원가입 성공!");
          navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert("이미 존재하는 닉네임입니다.");
        } else {
          alert("회원가입 중 오류가 발생했습니다.");
        }
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} /><br />
        <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} /><br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Signup;