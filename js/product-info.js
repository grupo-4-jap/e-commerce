const URL_PRODUCT = 'https://japceibal.github.io/emercado-api/products/';

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

function getProductID() {
  const productID = localStorage.getItem('productID');
  return productID !== null ? productID : 50921;
}

async function getProductData() {
  const result = {};

  try {
    const response = await fetch(URL_PRODUCT + getProductID() + '.json');

    if (response.ok) {
      const json = await response.json();
      result.status = 'ok';
      result.body = json;
    } else {
      throw Error(response.statusText);
    }
  } catch (err) {
    result.status = 'error';
    result.errorMessage = err.message;
    result.body = {};
  }

  return result;
}

async function showProduct(product) {
  const container = document.getElementById('product-container');
  const { name, cost, description, currency, soldCount, category, images } =
    product;
  container.innerHTML = `
  <p class="fw-bold pb-4">${name}</p>
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
    // img.style.aspectRatio = '16/9';
    imagesContainer.appendChild(img);
  });
}

// <img class="card-img-top" src="..." alt="Card image cap">

document.addEventListener('DOMContentLoaded', async () => {
  data = await getProductData();
  showProduct(data.body);
});
