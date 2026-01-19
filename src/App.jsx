// src/App.jsx (수정본)
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup'; // 1. 회원가입 컴포넌트 불러오기

function App() {
  return (
    <div>
      <nav>
        <Link to="/">로고</Link> |
        <Link to="/login">로그인</Link> |
        <Link to="/signup">회원가입</Link> {/* 2. 가입 페이지 링크 추가 */}
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* 3. 경로 설정 */}
      </Routes>
    </div>
  );
}

export default App;