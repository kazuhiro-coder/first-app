import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_BASE || '';
        const res = await axios.get(`${API_BASE}/api/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error('投稿取得エラー:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
  <div className="container mt-5">
      <h2 className="text-white mb-4"> 投稿一覧</h2>
      <div className="row">
         {posts.map((post) => (
    <div key={post._id} className="col-md-12 ">
      <div className="study-item d-flex justify-content-between align-items-center">
        <div className="study-info">
          <h3>{post.subject}</h3>
          <p className="study-comment">{post.comment}</p>
           <div className="study-meta">
            {new Date(post.date).toLocaleString('ja-JP')} | {post.userId?.username || '不明'}
          </div>
        </div>
        <div className="study-duration">
          {post.time}分
        </div>
      </div>
    </div>
  ))}
      </div>
    </div>
  );
};

export default PostList;
