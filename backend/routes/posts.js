const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// POST /api/posts  ← 勉強記録を投稿
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { userId, subject, time, comment } = req.body;

    const newPost = new Post({
      userId: req.user.userId,
      subject,
      time,
      comment
    });

    await newPost.save();
    res.status(201).json({ message: '投稿が完了しました！' });
  } catch (err) {
    console.error('[投稿エラー]', err);  // ← これ追加
    res.status(500).json({ message: '投稿に失敗しました', error: err.message });
  }
});

// GET /api/posts  ← 投稿一覧を取得
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).populate('userId', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: '取得に失敗しました', error: err.message });
  }
});

module.exports = router;
