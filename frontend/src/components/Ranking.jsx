import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [range, setRange] = useState('weekly'); // 初期は weekly

  useEffect(() => {
    
    const fetchRanking = async () => {
      try {
       
       const res = await axios.get(`/api/ranking?range=${range}`);
        setRanking(res.data);
      } catch (err) {
        console.error('ランキング取得失敗:', err);
      }
    };

    fetchRanking();
  }, [range]); // range が変わるたびに再取得

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">勉強時間ランキング</h2>

      {/* ▼ 範囲切り替えボタン */}
      <div className="text-center mb-4">
        <button className="btn btn-outline-primary mx-1" onClick={() => { console.log("★日ボタン押下"); setRange('daily');}}>日</button>
        <button className="btn btn-outline-primary mx-1" onClick={() =>{ console.log("★週ボタン押下"); setRange('weekly');}}>週</button>
        <button className="btn btn-outline-primary mx-1" onClick={() => { console.log("★月ボタン押下"); setRange('monthly');}}>月</button>
      </div>

      {/* ▼ ランキングリスト */}
      <ol className="list-group list-group-numbered">
        {ranking.map((user, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{user.username}</div>
              合計 {user.totalTime} 分
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Ranking;

