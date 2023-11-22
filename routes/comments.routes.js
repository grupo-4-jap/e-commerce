import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

router.get('/products-comments/40281', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/40281.json'));
});

router.get('/products-comments/50741', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50741.json'));
});

router.get('/products-comments/50742', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50742.json'));
});

router.get('/products-comments/50743', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50743.json'));
});

router.get('/products-comments/50744', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50744.json'));
});

router.get('/products-comments/50921', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50921.json'));
});

router.get('/products-comments/50922', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50922.json'));
});

router.get('/products-comments/50923', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50923.json'));
});

router.get('/products-comments/50924', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50924.json'));
});

router.get('/products-comments/50925', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/50925.json'));
});

router.get('/products-comments/60801', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/60801.json'));
});

router.get('/products-comments/60802', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/60802.json'));
});

router.get('/products-comments/60803', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/60803.json'));
});

router.get('/products-comments/60804', (req, res) => {
  res.sendFile(join(__dirName, '../db/products_comments/60804.json'));
});

export default router;
