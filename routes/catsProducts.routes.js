import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

router.get('/cats-products/autos', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/101.json'));
});

router.get('/cats-products/juguetes', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/102.json'));
});

router.get('/cats-products/muebles', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/103.json'));
});

router.get('/cats-products/herramientas', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/104.json'));
});

router.get('/cats-products/computadoras', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/105.json'));
});

router.get('/cats-products/vestimenta', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/106.json'));
});

router.get('/cats-products/electrodomesticos', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/107.json'));
});

router.get('/cats-products/deportes', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/108.json'));
});

router.get('/cats-products/celulares', (req, res) => {
  res.sendFile(join(__dirName, '../db/cats_products/109.json'));
});

export default router;
