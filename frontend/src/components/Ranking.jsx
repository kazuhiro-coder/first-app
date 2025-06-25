import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css'; // スタイルシートをインポート

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [range, setRange] = useState('weekly'); // 初期は weekly

  
  useEffect(() => {
    
    const fetchRanking = async () => {
      try {
       const API_BASE = process.env.REACT_APP_API_BASE || '';
       const res = await axios.get(`${API_BASE}/api/ranking?range=${range}`);
        setRanking(res.data);
        console.log('ランキングデータ:', res.data);
      } catch (err) {
        console.error('ランキング取得失敗:', err);
      }
    };

    fetchRanking();
  }, [range]); // range が変わるたびに再取得


  return (
   <div className="container">
    <h1 class="page-title">勉強時間ランキング</h1>

      <div className=" period-filter mb-4">
        {['daily', 'weekly', 'monthly'].map((r) => (
          <button
            key={r}
            className={`btn ${range === r ? 'btn-primary' : ''} period-btn` }
            onClick={() => setRange(r)}
          >
            {r === 'daily' ? '日' : r === 'weekly' ? '週' : '月'}
          </button>
        ))}
      </div>

      <div class="ranking-container">
        {ranking.map((user, index) => (
          <div key={index} class="ranking-item">
            <div class={`rank-badge ${['rank-1', 'rank-2', 'rank-3'][index] || 'rank-other'}`}>
              {index + 1}
            </div>
            <div class="user-info">
              <div class="user-name">{user.username}</div>
              <div class= "user-details">
                {range === 'daily' ? '日間' : range === 'weekly' ? '週間' : '月間'}学習時間 {index + 1}位
              </div>
            </div>
            <div class="study-time" >{user.totalTime}分</div>
          </div>
        ))} 
      </div>
    </div>
  );
};

export default Ranking;

