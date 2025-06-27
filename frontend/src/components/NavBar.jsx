import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Home.css';  // Bootstrapスタイルをインポート



const NavBar = ({token, handleLogout}) => {
const navigate = useNavigate();

  return (
    <header className="header">
    <div className="logo" >StudyApp</div>
    <nav className="nav">
      <Link className="active" to="/">ホーム</Link>
      <Link className="active" to="/posts">投稿フォーム</Link>
      <Link className="active" to="/list">投稿一覧</Link>
      <Link className="active" to="/ranking">ランキング</Link>
    </nav>
    <button className="logout-btn" onClick={handleLogout}>ログアウト</button>
  </header>


  );
};

export default NavBar;
