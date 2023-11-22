import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import cats from './routes/cats.routes.js';
import catsProducts from './routes/catsProducts.routes.js';
import products from './routes/products.routes.js';
import comments from './routes/comments.routes.js';

const SECRET_KEY = 'TOP SECRET KEY';

const app = express();
const port = 3000;

// Cors config
app.use(cors());
app.use(express.json());

// Middleware
app.use('/cart', (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers['access-token'], SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Usuario no autorizado' });
  }
});

// Cats route
app.use(cats);

// Category products routes
app.use(catsProducts);

// Product routes
app.use(products);

// Comment routes
app.use(comments);

app.get('/', (req, res) => {
  res.send();
});

app.get('/cart', (req, res) => {
  res.send('Ingreso autorizado');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Usuario y/o contraseña incorrectos' });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor funcionando`);
});
