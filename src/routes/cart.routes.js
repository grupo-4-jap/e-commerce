import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { validateToken } from '../controllers/validateToken.js';
import { isItemInCart } from '../controllers/isItemInCart.js';

const router = Router();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const __dirFile = join(__dirName, '../db/cart.json');

router.get('/cart', validateToken, (req, res) => {
  res.sendFile(__dirFile);
});

router.post('/cart', validateToken, (req, res) => {
  const [cart] = req.body;

  const jsonString = fs.readFileSync(__dirFile, 'utf-8', (err, data) => {
    if (err) return res.send('Error al leer el archivo en la base de datos');

    return data;
  });

  const json = JSON.parse(jsonString);

  // Check if the item is in the server
  if (!isItemInCart(json, cart)) {
    json.push(cart);
  } else {
    const serverItem = json.find((item) => item.id === cart.id);
    serverItem.count += 1;
  }

  try {
    fs.writeFileSync(__dirFile, JSON.stringify(json));
  } catch (err) {
    console.error(err);
  }

  res.send('Data saved successfully');
});

router.get('/cart/:id', validateToken, (req, res) => {
  res.send(req.body);
});

router.put('/cart/:id', validateToken, (req, res) => {
  const [operation] = req.body;
  const { id } = req.params;

  const files = fs.readFileSync(__dirFile, 'utf-8', (err, data) => {
    if (err) res.send('Error al leer el archivo en la base de datos');

    return data;
  });

  const cart = JSON.parse(files);

  cart.forEach((item, index) => {
    if (index == id) {
      operation === 'add' ? ++item.count : --item.count;
    }
  });

  try {
    fs.writeFileSync(__dirFile, JSON.stringify(cart));
  } catch (err) {
    console.error(err);
  }

  res.send(cart[id]);
});

export default router;
