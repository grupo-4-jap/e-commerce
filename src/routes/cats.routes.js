import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = Router();

export default router.get('/cats', (req, res) => {
  const __fileName = fileURLToPath(import.meta.url);
  const __dirName = dirname(__fileName);
  res.sendFile(join(__dirName, '../db/cats/cat.json'));
});
