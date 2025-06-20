import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PrivateRoute from './components/PrivateRoute';

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
        <Route path="/login" element={<Login setToken={setToken} />} />
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
      </Routes>
    </Router>
  );
}

export default App;

