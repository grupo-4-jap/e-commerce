import * as dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';

import cats from './routes/cats.routes.js';
import catsProducts from './routes/catsProducts.routes.js';
import products from './routes/products.routes.js';
import comments from './routes/comments.routes.js';
import cart from './routes/cart.routes.js';
import login from './routes/login.routes.js';

const app = express();
const port = 3000;

// Env config
dotenv.config();

// Cors config
app.use(cors());

// Middleware
app.use(express.json());

// Cats route
app.use(cats);

// Category products routes
app.use(catsProducts);

// Product routes
app.use(products);

// Comment routes
app.use(comments);

// Cart route
app.use(cart);

// Login route
app.use(login);

app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log(`✅ Servidor funcionando`);
});

// app.post('/login', (req, res) => {
//   if (checkUser(users, req.body)) {
//     const { username } = req.body;
//     const token = jwt.sign({ username }, SECRET_KEY);
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: 'Usuario y/o contraseña incorrectos' });
//   }
// });

// app.use('/cart', (req, res, next) => {
//   try {
//     const decoded = jwt.verify(req.headers['access-token'], SECRET_KEY);
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Usuario no autorizado' });
//   }
// });
