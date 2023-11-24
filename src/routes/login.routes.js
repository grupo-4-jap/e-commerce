import { Router } from 'express';

import { checkUser } from '../controllers/checkUser.js';
import { generateAccessToken } from '../controllers/generateAccessToken.js';
import users from '../db/users.json' assert { type: 'json' };

const router = Router();

router.post('/login', (req, res) => {
  // const userLogging = req.body;
  // const { username } = userLogging;
  // const accessToken = generateAccessToken(username);
  // res.json({ accessToken: accessToken });

  const userLogging = req.body;

  if (!checkUser(users, userLogging)) {
    res.send('Usuario no registrado');
  } else {
    const { username } = userLogging;
    const accessToken = generateAccessToken(username);
    res
      .header('authorization', accessToken)
      .json({ message: 'Usuario autenticado', token: accessToken });
  }
});

export default router;
