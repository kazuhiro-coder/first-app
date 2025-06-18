const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'トークンがありません' });

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { userId: xxx }
    next();
  } catch (err) {
    return res.status(403).json({ message: '無効なトークンです' });
  }
};

module.exports = authenticateToken;
