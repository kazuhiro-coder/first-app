import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
  useEffect(() => {
    const progressRing = document.querySelector('.progress-ring-progress');
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const progress = 75;
    const offset = circumference - (progress / 100) * circumference;
    if (progressRing) progressRing.style.strokeDashoffset = offset;

    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach((number, index) => {
      const target = parseInt(number.textContent);
      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        number.textContent = Math.floor(current);
      }, 50 + index * 20);
    });
  }, []);
console.log("Home画面読み込みました");
  return (
    <>
      <header className="header">
        <div className="logo">StudyApp</div>
        <nav className="nav">
          <a href="#" className="active">ホーム</a>
          <a href="#">投稿フォーム</a>
          <a href="#">投稿一覧</a>
          <a href="#">ランキング</a>
        </nav>
        <a href="#" className="logout-btn">ログアウト</a>
      </header>

      <div className="container">
        <section className="welcome-section">
          <h1 className="welcome-title">お疲れ様です！</h1>
          <p className="welcome-subtitle">今日も勉強を頑張りましょう</p>
        </section>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">280</div>
            <div className="stat-label">今週の学習時間</div>
            <div className="stat-unit">分</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">今月の学習日数</div>
            <div className="stat-unit">日</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">85</div>
            <div className="stat-label">今週の達成率</div>
            <div className="stat-unit">%</div>
          </div>
          <div className="stat-card">
            <div className="progress-ring">
              <svg width="80" height="80">
                <circle className="progress-ring-circle" cx="40" cy="40" r="30" />
                <circle className="progress-ring-progress" cx="40" cy="40" r="30" />
              </svg>
              <div className="progress-text">75%</div>
            </div>
            <div className="stat-label">今日の目標</div>
          </div>
        </div>

        <section className="recent-study">
          <h2 className="section-title">📚 最近の学習記録</h2>

          <div className="study-item">
            <div className="study-info">
              <h3>数学 - 行列</h3>
              <div className="study-meta">2025/6/25 19:25:13 | kz</div>
            </div>
            <div className="study-duration">120分</div>
          </div>
          <div className="study-item">
            <div className="study-info">
              <h3>国語 - 古典</h3>
              <div className="study-meta">2025/6/25 19:30:08 | kaz</div>
            </div>
            <div className="study-duration">123分</div>
          </div>
          <div className="study-item">
            <div className="study-info">
              <h3>数学 - 微積分</h3>
              <div className="study-meta">2025/6/22 22:44:25 | kz</div>
            </div>
            <div className="study-duration">150分</div>
          </div>
        </section>

        <div className="quick-actions">
          <a href="#" className="action-btn">
            <div className="action-icon">✏️</div>
            <div>新しい学習を記録</div>
          </a>
          <a href="#" className="action-btn">
            <div className="action-icon">📊</div>
            <div>学習統計を見る</div>
          </a>
          <a href="#" className="action-btn">
            <div className="action-icon">🏆</div>
            <div>ランキングを確認</div>
          </a>
          <a href="#" className="action-btn">
            <div className="action-icon">⚙️</div>
            <div>設定</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
