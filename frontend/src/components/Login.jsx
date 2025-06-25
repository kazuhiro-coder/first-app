import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // スタイルシートをインポート

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_BASE = process.env.REACT_APP_API_BASE || ''; 
      const res = await axios.post(`${API_BASE}/api/login`, {
  username,
  password,
});
      const token = res.data.token;
      localStorage.setItem('token', token);     // トークン保存
      setToken(token);                          // Appに状態渡す
      alert('ログイン成功！');
      navigate('/posts');
    } catch (err) {
      alert('ログイン失敗');
    }
  };

  return (
    <>
     <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>

<div class="login-wrapper">
      <div className=" login-container">
        <div className="logo-section">
          <div className="logo">StudyApp</div>
          <h1 className="login-title">ログイン</h1>
        </div>

        <form className="login-form" id="loginForm" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">ユーザー名</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="form-input" 
              placeholder="ユーザー名を入力"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">パスワード</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-input" 
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            ログイン
            <span className="loading" id="loading"></span>
          </button>
        </form>

        <div className="additional-links">
          <a href="#">パスワードを忘れた方はこちら</a>
        </div>
      </div>
      </div>
      </>
  );
};

export default Login;
