import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>投稿一覧</h2>
      {posts.length === 0 ? (
        <p>投稿がまだありません。</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <strong>{post.subject}</strong> - {post.time}分<br />
              {post.comment}<br />
              投稿者: {post.userId?.username || "不明"}<br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
