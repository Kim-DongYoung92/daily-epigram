import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* 요구사항: 상단 네비게이션 바 */}
      <nav>
        {/* 로고 클릭 시 "/" 이동 */}
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: 'black' }}>
          Epigram (로고)
        </Link>

        {/* 피드 클릭 시 피드 페이지 이동 */}
        <Link to="/feed" style={{ marginLeft: '20px' }}>피드</Link>

        <button style={{ float: 'right' }}>로그인</button>
      </nav>

      <hr />

      {/* 페이지 경로 설정 */}
      <Routes>
        {/* 랜딩 페이지 ("/") */}
        <Route path="/" element={<LandingPage />} />

        {/* 피드 페이지 ("/feed") */}
        <Route path="/feed" element={<div><h2>피드 페이지입니다.</h2><p>여기에 에피그램 목록이 나올 예정입니다.</p></div>} />
      </Routes>
    </div>
  );
}

// 랜딩 페이지 컴포넌트 (시안 내용 포함)
function LandingPage() {
  return (
    <main>
      <section>
        <h1>나만 갖고 있기엔 아까운 글이 있지 않나요?</h1>
        <p>다른 사람들과 감성을 공유해 보세요.</p>
        <h3>명언이나 글귀, 토막 상식들을 공유해 보세요.</h3>
      </section>

      <section>
        <h2>사용자들이 직접 인용한 에피그램들</h2>
        <ul>
          <li>"오랫동안 꿈을 그리는 사람은..." - 앙드레 말로</li>
          <li>"이 세상에는 위대한 진실이 하나 있어..." - 파울로 코엘료</li>
        </ul>
      </section>

      <section>
        <h3>감정 상태에 따라, 알맞은 위로를 받을 수 있어요.</h3>
        <div>😊 기쁨 | 😟 고민 | 😢 슬픔 | 😡 분노</div>
      </section>

      <section>
        <h3>내가 요즘 어떤 감정 상태인지 통계로 한눈에 볼 수 있어요.</h3>
        <p>기쁨 35% | 고민 20% | 슬픔 17%</p>
      </section>
    </main>
  );
}

export default App;