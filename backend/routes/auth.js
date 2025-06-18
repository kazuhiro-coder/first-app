const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ユーザー名がすでに存在するか確認
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'ユーザー名は既に使われています' });
    }

    // パスワードをハッシュ化
    const passwordHash = await bcrypt.hash(password, 10);

    // 新しいユーザー作成
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: 'ユーザー登録成功！' });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'ユーザーが存在しません' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'パスワードが間違っています' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

module.exports = router;
