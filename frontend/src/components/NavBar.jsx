import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'  // Bootstrapスタイルをインポート



const NavBar = ({token, handleLogout}) => {
const navigate = useNavigate();

  return (
  <nav className="navbar navbar-expand-lg navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark" >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto"> {/* 左側に配置するためにme-autoを使用 */}
            <li className="nav-item">
              <Link className="nav-link active" to="/posts">投稿フォーム</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/list">投稿一覧</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto"> {/* 右側に配置するためにms-autoを使用 */}
            {token ? (
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>ログアウト</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/login">ログイン</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
