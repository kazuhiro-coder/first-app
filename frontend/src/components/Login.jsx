import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
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
     <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">ログイン</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">ユーザー名</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="ユーザー名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">パスワード</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">ログイン</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
