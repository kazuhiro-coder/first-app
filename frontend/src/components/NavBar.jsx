import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Navber.css';  // Bootstrapスタイルをインポート



const NavBar = ({token, handleLogout}) => {
const navigate = useNavigate();

  return (
    <header className="header">
     
     <div className="logo">StudyApp</div>
        <div className="d-flex align-items-center gap-4">
 
    <nav className="nav d-flex gap-3">
      <Link className="active" to="/">ホーム</Link>
      <Link className="active" to="/posts">投稿フォーム</Link>
      <Link className="active" to="/list">投稿一覧</Link>
      <Link className="active" to="/ranking">ランキング</Link>
    </nav>
  </div>
   <div className="d-flex align-items-center gap-2">
    {token ? (
      <button className="logout-btn" onClick={handleLogout}>ログアウト</button>
    ) : (
      <>
        <Link className="logout-btn" to="/login">ログイン</Link>
        <Link className="logout-btn" to="/register">新規登録</Link>
      </>
    )}
  </div>
</header>
  );
};

export default NavBar;
