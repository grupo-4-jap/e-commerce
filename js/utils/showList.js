import { CATEGORY, PRODUCT } from '../constants/CONSTANTS.js';

function showProductList(array) {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    const { id, image, description, name, soldCount, currency, cost } = product;

    htmlContentToAppend += `
            <div id=${id} class="list-group-item list-group-item-action cursor-active">
                <div class="row d-flex flex-column flex-md-row">
                    <div class="col col-md-3">
                        <img src="${image}" alt="${description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1 category-title">${name} <span class="d-none d-lg-inline">-</span> <br class="d-lg-none" /> 
                            <span class="text-secondary small-price">${currency} ${cost}</span> </h5>
                            <small class="text-muted">${soldCount} vendidos</small>
                        </div>
                        <p class="mb-1 d-none d-md-inline">${description}</p>
                    </div>
                </div>
            </div>
            `;

    document.getElementById('containerProducts').innerHTML =
      htmlContentToAppend;
  }
}

function showCategoryList(array) {
  let htmlContentToAppend = '';

  array.forEach((category) => {
    const { id, imgSrc, description, name, productCount } = category;

    htmlContentToAppend += `
      <div id="${id}" class="list-group-item list-group-item-action cursor-active">
        <div class="row d-flex flex-column flex-md-row">
            <div class="col col-md-3">
                <img src="${imgSrc}" alt="${description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 category-title">${name}</h5>
                    <small class="text-muted">${productCount} artículos</small>
                </div>
                <p class="mb-1 d-none d-md-inline">${description}</p>
            </div>
        </div>
    </div>
    `;
  });

  document.getElementById('cat-list-container').innerHTML = htmlContentToAppend;
}

export default function showList(array, { type }) {
  if (array.length === 0) {
    const main = document.querySelector('main');
    main.innerHTML = `
      <h1 class="d-flex justify-content-center align-items-center" style="height: 50vh">
        WOOOOPS!! PARECE QUE NO HAY PRODUCTOS
      </h1>
      `;
  } else {
    if (type === CATEGORY) {
      showCategoryList(array);
    } else if (type === PRODUCT) {
      showProductList(array);
    }
  }
}
