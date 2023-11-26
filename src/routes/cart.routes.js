import { Router } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { validateToken } from '../controllers/validateToken.js';

const router = Router();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const __dirFile = join(__dirName, '../db/cart.json');

router.get('/cart', validateToken, (req, res) => {
  res.sendFile(__dirFile);
});

function isItemInCart(serverCart, itemToAdd) {
  if (serverCart.length === 0) return false;

  return serverCart.some((item) => item.id === itemToAdd.id);
}

router.post('/cart', (req, res) => {
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

export default router;
