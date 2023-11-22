import express from 'express';
import cors from 'cors';

import cats from './routes/cats.routes.js';
import catsProducts from './routes/catsProducts.routes.js';
import products from './routes/products.routes.js';
import comments from './routes/comments.routes.js';

const app = express();
const port = 3001;

// Cors config
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Cats route
app.use(cats);

// Category products routes
app.use(catsProducts);

// Product routes
app.use(products);

// Comment routes
app.use(comments);

app.listen(port, () => {
  console.log(`✅ Servidor funcionando`);
});
