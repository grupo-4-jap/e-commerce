import {
  PRODUCT_INFO_COMMENTS_URL,
  PRODUCT_INFO_URL,
} from './constants/API.js';
import getJSONData from './utils/getJSONData.js';

let productData = {};
let commentsData = {};

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
  const container = document.getElementById('product-container');
  const { name, cost, description, currency, soldCount, category, images } =
    product;
  container.innerHTML = `
    <h2 class="pb-4">${name}</h2>
    <hr>
    <p class="fw-bold">Precio</p>
    <p class="fw-light">${currency} ${cost}</p>
    <p class="fw-bold">Descripción</p>
    <p class="fw-light">${description}</p>
    <p class="fw-bold">Categoría</p>
    <p class="fw-light">${category}</p>
    <p class="fw-bold">Cantidades vendidas</p>
    <p class="fw-light">${soldCount}</p>
    <p class="fw-bold">Imágenes ilustrativas</p>
    <div class="images-container" id="images-container"></div>
  `;
  const imagesContainer = document.getElementById('images-container');
  images.forEach((image) => {
    const img = document.createElement('img');
    img.className = 'card-image';
    img.src = `${image}`;
    img.style.objectFit = 'contain';
    imagesContainer.appendChild(img);
  });
}

function showComments(comments) {
  const commentator = document.getElementById('comments-container');

  if (comments.length == null) {
    commentator.innerHTML =
      '<p>No hay comentarios aún. Sé el primero en comentar.</p>';
  } else {
    commentator.innerHTML = '';
    let count = 0;
    comments.forEach((comment) => {
      const commentElement = document.createElement('div');
      commentElement.innerHTML = `
          <p><b>${comment.user}</b> - ${comment.dateTime} - <span id="star-container${count}"></span></p>
          <p>${comment.description}</p>
          <hr>
        `;
      commentator.appendChild(commentElement);
      const starContainer = document.getElementById(`star-container${count}`);
      showStars(comment.score, starContainer);
      count++;
    });
  }
}

// <span class="fa fa-star"></span> → estrella color negro
// <span class="fa fa-star checked"></span> → estrella color amarillo

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

document.addEventListener('DOMContentLoaded', async () => {
  // Get product-info data
  const productID = getProductID();
  productData = await getJSONData({
    URL: PRODUCT_INFO_URL,
    options: productID,
  });

  showProduct(productData.body);

  // Get product comment data
  commentsData = await getJSONData({
    URL: PRODUCT_INFO_COMMENTS_URL,
    options: productID,
  });

  showComments(commentsData.body);
});
