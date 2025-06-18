// 必要なモジュールを読み込む
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



// アプリの作成
const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors());
app.use(express.json()); // JSONをパース

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);


// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB接続成功'))
  .catch((err) => console.error('❌ MongoDB接続失敗:', err));

// 仮ルート（動作確認用）
app.get('/', (req, res) => {
  res.send('📡 Expressサーバー動作中！');
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 サーバー起動：http://localhost:${PORT}`);
});
