import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      const token = res.data.token;
      localStorage.setItem('token', token);     // トークン保存
      setToken(token);                          // Appに状態渡す
      alert('ログイン成功！');
    } catch (err) {
      alert('ログイン失敗');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
