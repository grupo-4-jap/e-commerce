import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { validateToken } from '../controllers/validateToken.js';

const router = Router();

router.get('/cart', validateToken, (req, res) => {
  const __fileName = fileURLToPath(import.meta.url);
  const __dirName = dirname(__fileName);
  res.sendFile(join(__dirName, '../db/cart.json'));
});

export default router;
