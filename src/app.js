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

const users = [
  {
    username: 'admin@admin.com',
    password: 'password123',
  },
  {
    username: 'subgrupo4@login.com',
    password: 'super-pass',
  },
];

function checkUser(usersArray, inputs) {
  const { username, password } = inputs;
  return usersArray.find(
    (user) => user.username === username && user.password === password
  );
}

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
  if (checkUser(users, req.body)) {
    const { username } = req.body;
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Usuario y/o contraseña incorrectos' });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor funcionando`);
});
