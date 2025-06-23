import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './TimeSlider.css'; 





const PostForm = () => {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [timeSlider, setTimeSlider] = useState(60);
  const [comment, setComment] = useState('');

  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token is missing or invalid');
    return <div>Token not found or invalid. Please log in again.</div>;
  }
  const decoded = jwtDecode(token);           // トークンをデコード
  const userId = decoded.userId; 

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
   <div className="container my-4">
      <h2>勉強記録を投稿</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">科目・内容</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            placeholder="例: 数学"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
         <div className="mb-3">
          <label htmlFor="time" className="form-label">勉強時間</label>
          <div className="d-flex">
            <div className="mr-3" style={{ flex: 1 }}>
              <label htmlFor="timeInput" className="form-label">時間を入力 (分)</label>
              <input
                type="number"
                id="timeInput"
                className="form-control"
                placeholder="例: 60"
                value={time}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label htmlFor="timeSlider" className="form-label">または、スライダーで選択</label>
              <input
                type="range"
                id="timeSlider"
                className="form-control-range"
                min="10"
                max="480"
                step="10"
                value={timeSlider}
                onChange={handleSliderChange}
              />
              <p>{timeSlider} 分</p>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">コメント</label>
          <textarea
            id="comment"
            className="form-control"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">投稿</button>
      </form>
    </div>
  );
};

export default PostForm;
