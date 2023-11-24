import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY);
}
