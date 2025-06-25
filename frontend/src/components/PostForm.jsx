import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Home.css';





const PostForm = () => {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [timeSlider, setTimeSlider] = useState(60);
  const [comment, setComment] = useState('');
const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

 
  const decoded = jwtDecode(token);           // トークンをデコード
  const userId = decoded.userId; 
  const API_BASE = process.env.REACT_APP_API_BASE || ''; 

useEffect(() => {
   if (!token) {
    console.error('Token is missing or invalid');
    return <div>Token not found or invalid. Please log in again.</div>;
  }

  const fetchPosts = async () => {
    try {
       const res = await axios.get(`${API_BASE}/api/dailyPosts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
     
      setPosts(res.data);
      console.log("投稿取得成功", res.data);
    } catch (err) {
      console.error("投稿取得エラー", err);
    }
  };

  fetchPosts();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !time || !comment) {
  alert("すべての項目を入力してください！");
  return;
}

    try {
      await axios.post('/api/posts', {
        userId,
        subject,
        time,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('投稿が完了しました！');
      setSubject('');
      setTime('');
      setComment('');
    } catch (err) {
      alert('投稿に失敗しました');
    }
  };

  // 時間の選択方法がスライダーで選ばれた場合
  const handleSliderChange = (e) => {
    setTimeSlider(e.target.value);
    setTime(e.target.value); // 入力ボックスが空のときにスライダーの値を使用
  };

  // 時間を直接入力した場合
  const handleInputChange = (e) => {
    setTime(e.target.value);
  };

    return (
     <div className="container">
      <h2 className="section-title">📝 今日の学習</h2>
      <div className="stats-grid">
        {posts.map((post) => (
          <div key={post._id} className="study-item">
            <div className="study-info">
              <h3>{post.subject}</h3>
              <div className="study-meta">
                {new Date(post.date).toLocaleString()} | {post.userId.username}
              </div>
              <p className="study-meta">{post.comment}</p>
            </div>
            <div className="study-duration">{post.time}分</div>
          </div>
        ))}
      </div>

      <div className="recent-study mt-4">
        <h3 className="section-title">📘 新しい学習記録を追加</h3>
        <form onSubmit={handleSubmit}>
          <div className="stats-grid">
            <div>
              <label className="form-label">科目</label>
              <input
                type="text"
                className="form-control"
                placeholder="例: 数学"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">学習時間（分）</label>
              <input
                type="number"
                className="form-control"
                placeholder="例: 120"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label">学習内容</label>
            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary">
              📘 記録を保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
