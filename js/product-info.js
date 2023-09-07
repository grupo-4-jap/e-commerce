const URL_PRODUCT = 'https://japceibal.github.io/emercado-api/products/';
const URL_COMMENTS =
  'https://japceibal.github.io/emercado-api/products_comments/';

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

// Sección comentarios
async function loadComments() {
  try {
    const response = await fetch(URL_COMMENTS + getProductID() + '.json ');

    if (response.ok) {
      const comments = await response.json();
      showComments(comments);
    } else {
      throw new Error('Error al obtener comentarios.'); // new
    }
  } catch (error) {
    console.error(error); // esto lo busqué no sé si está bien pero no lo cacé con el result
  }
}

//   {
//     "product": 50741,
//     "score": 5,
//     "description": "Precioso, a mi nena le encantó",
//     "user": "silvia_fagundez",
//     "dateTime": "2021-02-20 14:00:42"
// },

function showComments(comments) {
  const commentator = document.getElementById('comments-container');

  if (comments.length == null) {
    commentator.innerHTML =
      '<p>No hay comentarios aun. Sé el primero en comentar.</p>';
  } else {
    commentator.innerHTML = ''; // limpia el contenido anterior si lo hubiera
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
      console.log(comment.score);
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

// <span class="fa fa-star"></span> → estrella color negro
// <span class="fa fa-star checked"></span> → estrella color amarillo

document.addEventListener('DOMContentLoaded', async () => {
  data = await getProductData();
  showProduct(data.body);
  loadComments(data.body.id); // carga los comentarios
});
