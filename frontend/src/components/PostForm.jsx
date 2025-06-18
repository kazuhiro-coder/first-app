import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');
const decoded = jwtDecode(token);           // トークンをデコード
const userId = decoded.userId; 

const PostForm = () => {
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !time || !comment) {
  alert("すべての項目を入力してください！");
  return;
}

    const token = localStorage.getItem('token'); // ログイン後に保存されたトークン
    const userId = "685279f07ef552a74045093d"; // ※あとで自動化する！

    try {
      await axios.post('http://localhost:5000/api/posts', {
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

  return (
    <div>
      <h2>勉強記録を投稿</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="教科・内容"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="勉強時間（分）"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        /><br />
        <textarea
          placeholder="コメント"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        /><br />
        <button type="submit">投稿</button>
      </form>
    </div>
  );
};

export default PostForm;
