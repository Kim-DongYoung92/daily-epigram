
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import EpigramList from './EpigramList';
import AddEpigram from './AddEpigram';
import EpigramDetail from './EpigramDetail';

function App() {
  return (
    <div>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>로고</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>로그인</Link>
        <Link to="/signup" style={{ marginRight: '10px' }}>회원가입</Link>
        <Link to="/epigramlist" style={{ marginRight: '10px' }}>피드</Link>
        <Link to="/create">만들기</Link>
      </nav>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/epigramlist" element={<EpigramList />} />
        <Route path="/create" element={<AddEpigram />} />
        <Route path="/epigrams/:id" element={<EpigramDetail />} />
      </Routes>
    </div>
  );
}

export default App;