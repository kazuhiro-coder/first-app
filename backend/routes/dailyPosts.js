const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const posts = await Post.find({ date: { $gte: today } })
      .sort({ date: -1 })
      .populate('userId', 'username');

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: '投稿取得失敗', error: err.message });
  }
});

module.exports = router;