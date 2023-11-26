import jwt from 'jsonwebtoken';

export function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (accessToken == null) return res.sendStatus(401);

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
