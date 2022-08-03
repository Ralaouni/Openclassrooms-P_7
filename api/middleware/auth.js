const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('; ')
    .find(row => row.startsWith('token'))
    .split('=')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.headers.authorization.split('; ')
    .find(row => row.startsWith('userId'))
    .split('=')[1] !== userId) {
      res.json({
        error: new Error('Invalid User Id !')
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};