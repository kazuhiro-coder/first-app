import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PrivateRoute from './components/PrivateRoute';
import Ranking from './components/Ranking';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

 const handleLogout = () => {
    // ローカルストレージからトークンを削除
    localStorage.removeItem('token');
    setToken('');  // tokenを空にしてログアウト
  };
  
  return (
    <Router>
      <NavBar token={token} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<PrivateRoute token={token} handleLogout={handleLogout}><Home token={token} handleLogout={handleLogout}/></PrivateRoute>} />
        <Route path="/login" element={<Login setToken={setToken} />} />
         <Route path="/register" element={<Register />} />
        <Route path="/posts" element={
          <PrivateRoute>
            <PostForm />
          </PrivateRoute>
        } />
        <Route path="/list" element={
          <PrivateRoute>
            <PostList />
          </PrivateRoute>
        } />
        <Route path="/ranking" element={
          <PrivateRoute>
            <Ranking />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

