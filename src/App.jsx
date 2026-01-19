// src/App.jsx (수정본)
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import EpigramList from './EpigramList';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">로고</Link> |
        <Link to="/login">로그인</Link> |
        <Link to="/signup">회원가입</Link> |
        <Link to="/epigramlist">피드</Link>
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/epigramlist" element={<EpigramList />} />
      </Routes>
    </div>
  );
}

export default App;