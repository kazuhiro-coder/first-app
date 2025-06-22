import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css'
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('投稿取得エラー:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
   <div className="container mt-4">
      <h2 className="mb-4">投稿一覧</h2>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-12 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{post.subject}</h5>
                <p className="card-text">{post.comment}</p>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">投稿者: {post.userId.username || '不明'}</small>
                  <small className="text-muted">{post.time} 分間</small>
                    <small className="text-muted">
          投稿日: {new Date(post.date).toLocaleString('ja-JP')}
        </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
