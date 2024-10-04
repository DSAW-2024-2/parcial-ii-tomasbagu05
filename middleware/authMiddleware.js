const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: 'Se requiere autenticación' });
}
const token = authHeader.split(' ')[1];
jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
});
}

module.exports = authMiddleware;
