import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const files = fs.readdirSync(join(__dirName, '../db/products'));

const router = Router();

files.forEach((file) => {
  const split = file.split('.');
  const fileName = split[0];

  router.get(`/product/${fileName}`, (req, res) => {
    res.sendFile(join(__dirName, `../db/products/${file}`));
  });
});

export default router;
