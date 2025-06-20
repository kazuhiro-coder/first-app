import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // トークンを取得

  // トークンがない場合はログインページにリダイレクト
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // トークンがあれば、子要素を表示
};

export default PrivateRoute;

