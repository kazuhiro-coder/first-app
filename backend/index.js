// 必要なモジュールを読み込む
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();



// アプリの作成
const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json()); // JSONをパース

const rankingRoutes = require('./routes/ranking');
app.use('/api/ranking', rankingRoutes);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB接続成功'))
  .catch((err) => console.error('❌ MongoDB接続失敗:', err));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 サーバー起動：http://localhost:${PORT}`);
});
