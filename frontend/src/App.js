import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PostForm from './components/PostForm';
import PostList from './components/PostList';




function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/posts" element={<PostForm />} />
          <Route path="/list" element={<PostList />} /> 
        {/* 投稿ページなど、今後追加 */}
      </Routes>
    </Router>
  );
}

export default App;
