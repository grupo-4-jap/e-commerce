// Imports
import {
  PRODUCT_INFO_COMMENTS_URL,
  PRODUCT_INFO_URL,
} from './constants/API.js';
import getJSONData from './utils/getJSONData.js';
import { getUserData } from './utils/loggingUser.js';
import addEvents from './utils/addEvents.js';
import { PRODUCT } from './constants/CONSTANTS.js';
import { getCartProducts } from './utils/getCartProducts.js';

// Get product-info data
const productID = getProductID();

// DOM Elements
const form = document.getElementById('form-save-comment');

// Global variables
let productData = {};
let commentsData = {};

const myCarouselElement = document.querySelector('#carouselExampleIndicators');
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false,
});

/* {
  "id": 40281,
  "name": "Computadora de escritorio",
  "description": "Computadora de escritorio. Potencia y rendimiento, para juegos o trabajo",
  "cost": 2599,
  "currency": "USD",
  "soldCount": 11,
  "category": "Computadoras",
  "images": [
      "img/prod40281_1.jpg",
      "img/prod40281_2.jpg",
      "img/prod40281_3.jpg",
      "img/prod40281_4.jpg"
  ],
  "relatedProducts": [
      {
          "id":50743,
          "name":"PlayStation 5",
          "image": "img/prod50743_1.jpg"
      },
      {
          "id":50744,
          "name":"Bicicleta",
          "image": "img/prod50744_1.jpg"
      }
  ]
} */

/*  {
    "product": 50741,
    "score": 5,
    "description": "Precioso, a mi nena le encantó",
    "user": "silvia_fagundez",
    "dateTime": "2021-02-20 14:00:42"
}, */

function getProductID() {
  const productID = localStorage.getItem('productID');
  return productID !== null ? productID : 50921;
}

function showProduct(product) {
  const container = document.getElementById('product-description');
  const { name, cost, description, currency, soldCount, category, images } =
    product;
  container.innerHTML = `
    <h1 class="pb-4">${name}</h1>
    <hr>
    <p class="fw-bold">Precio</p>
    <p class="fw-light">${currency} ${cost}</p>
    <p class="fw-bold">Descripción</p>
    <p class="fw-light">${description}</p>
    <p class="fw-bold">Categoría</p>
    <p class="fw-light">${category}</p>
    <p class="fw-bold">Cantidades vendidas</p>
    <p class="fw-light">${soldCount}</p>
    <button class="btn btn-primary" id="buy-btn">Comprar</button>
  `;

  // This renders the carousel images
  const carouselImages = document.querySelectorAll('.carousel-image-handler');
  for (let i = 0; i < 4; i++) {
    carouselImages[i].src = images[i];
  }
}

function showComments(comments) {
  const commentator = document.getElementById('comments-container');

  if (comments.length === 0) {
    commentator.innerHTML +=
      '<p>No hay comentarios aún. Se la primera en comentar.</p>';
  } else {
    commentator.innerHTML = '';
    let count = 0;
    comments.forEach((comment) => {
      const { user, dateTime, description, score } = comment;

      if (comment.productID === productID || comment.productID === undefined) {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
            <p><b>${user}</b> - ${dateTime} - <span id="star-container${count}"></span></p>
            <p>${description}</p>
            <hr>
          `;
        commentator.appendChild(commentElement);
        const starContainer = document.getElementById(`star-container${count}`);
        showStars(score, starContainer);
        count++;
      }
    });
  }
}

function showStars(score, parent) {
  let count = 1;
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    if (count <= score) {
      star.classList = 'fa fa-star checked';
    } else {
      star.classList = 'fa fa-star';
    }
    count++;
    parent.appendChild(star);
  }
}

// Show related products
function showRelatedProducts() {
  const relatedProductsContainer = document.getElementById('related-container');
  const relatedProducts = productData.relatedProducts;

  relatedProducts.forEach((relatedProduct) => {
    const productCard = document.createElement('div');
    const { name, image, id } = relatedProduct;

    productCard.innerHTML = `
      <div class="related card m-3 cursor-active" style="max-width: 18rem;" id="${id}">
        <img src="${image}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
        </div>
      </div>
    `;

    relatedProductsContainer.appendChild(productCard);
  });
}

async function addCart(product) {
  // const localProducts =
  //   JSON.parse(localStorage.getItem('cart')) === null
  //     ? []
  //     : JSON.parse(localStorage.getItem('cart'));
  // const products = localProducts === null ? [] : localProducts;
  // const { id, name, cost, currency, images } = product;
  // // This prevents repeated items in the cart
  // if (localProducts.length > 0) {
  //   const isInCart = localProducts.some(
  //     (localProduct) => localProduct.id === id
  //   );
  //   if (isInCart) {
  //     for (const localProduct of localProducts) {
  //       if (localProduct.id === product.id) {
  //         localProduct.count++;
  //       }
  //     }
  //   } else {
  //     products.push({
  //       id,
  //       name,
  //       unitCost: cost,
  //       currency,
  //       image: images[0],
  //       count: 1,
  //     });
  //   }
  // } else {
  //   products.push({
  //     id,
  //     name,
  //     unitCost: cost,
  //     currency,
  //     image: images[0],
  //     count: 1,
  //   });
  // }
  // localStorage.setItem('cart', JSON.stringify(products));

  product.count = 1;
  const { accessToken } = JSON.parse(localStorage.getItem('userData'));

  await fetch('http://localhost:3000/cart', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify([product]),
  });
}

function getComments() {
  const comments = [];
  const allComments = JSON.parse(localStorage.getItem('Comments'));

  if (allComments) {
    for (const c of allComments) {
      if (c.user && c.description && c.dateTime && c.score) {
        const date = new Date(c.dateTime);
        const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        c.dateTime = dateTime;
        comments.push(c);
      }
    }
  }

  return comments;
}

function saveComment(description, score) {
  const allComments = JSON.parse(localStorage.getItem('Comments'));
  const userData = getUserData();

  if (allComments) {
    allComments.push({
      user: userData.email,
      description,
      score,
      dateTime: new Date(),
      productID: productID,
    });
    localStorage.setItem('Comments', JSON.stringify(allComments));
  } else {
    localStorage.setItem(
      'Comments',
      JSON.stringify([
        {
          user: userData.email,
          description,
          score,
          dateTime: new Date(),
          productID: productID,
        },
      ])
    );
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  productData = await getJSONData({
    URL: PRODUCT_INFO_URL,
    options: productID,
  }).then((data) => data.body);

  showProduct(productData);
  showRelatedProducts();
  addEvents('related', PRODUCT);

  // Get product comment data
  commentsData = await getJSONData({
    URL: PRODUCT_INFO_COMMENTS_URL,
    options: productID,
  });

  const comments = commentsData.body.concat(getComments());

  showComments(comments);

  const buyBtn = document.querySelector('#buy-btn');
  buyBtn.addEventListener('click', function () {
    addCart(productData);
    window.location.href = 'cart.html';
  });
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const commentInp = document.getElementById('comment-area');
  const punctuationSel = document.getElementById('punctuation');

  const comment = commentInp.value.trim();

  if (comment.length === 0) {
    alert('El comentario no puede estar vacío!');
    return;
  }

  const punt = parseInt(punctuationSel.value);

  saveComment(comment, punt);
  commentInp.value = '';
  punctuationSel.value = 1;
  commentsData = await getJSONData({
    URL: PRODUCT_INFO_COMMENTS_URL,
    options: productID,
  });

  const comments = commentsData.body.concat(getComments());

  showComments(comments);
});
