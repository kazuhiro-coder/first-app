const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// GET /api/ranking
router.get('/', async (req, res) => {
  const range = req.query.range || 'all'; // daily, weekly, monthly, all
  console.log("★受け取ったrange:", range);
  let match = {}; // $matchの条件

  if (range !== 'all') {
    const now = new Date();
    let fromDate;

    if (range === 'daily') {
      fromDate = new Date(now.setHours(0, 0, 0, 0)); // 今日の0時
    } else if (range === 'weekly') {
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 7);
      fromDate.setHours(0, 0, 0, 0); 
    
    } else if (range === 'monthly') {
      fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 1);
      fromDate.setHours(0, 0, 0, 0); 
    }

    match = { createdAt: { $gte: fromDate } };
       console.log("★生成されたmatch:", match); 
  }

  try {
    const ranking = await Post.aggregate([
      { $match: match }, // 日・週・月のフィルタ
      {
        $group: {
          _id: '$userId',
          totalTime: { $sum: '$time' }
        }
      },
      { $sort: { totalTime: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          username: '$user.username',
          totalTime: 1
        }
      }
    ]);
console.log(Post.aggregate())
    res.json(ranking);
  } catch (err) {
    console.error('[ランキング取得エラー]', err);
    res.status(500).json({ message: 'ランキングの取得に失敗しました' });
  }
});
module.exports = router;

