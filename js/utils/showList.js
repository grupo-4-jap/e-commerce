import { CATEGORY, PRODUCT } from '../constants/CONSTANTS.js';

function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

function showProductList(array) {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    const { id, image, description, name, soldCount, currency, cost } = product;

    htmlContentToAppend += `
            <div id=${id} class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${image}" alt="${description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${name} - ${currency} ${cost} </h4>
                            <small class="text-muted">${soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${description}</p>
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
        <div class="row">
            <div class="col-3">
                <img src="${imgSrc}" alt="${description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${name}</h4>
                    <small class="text-muted">${productCount} artículos</small>
                </div>
                <p class="mb-1">${description}</p>
            </div>
        </div>
    </div>
    `;
  });

  document.getElementById('cat-list-container').innerHTML = htmlContentToAppend;
}

export default function showList(array, { type }) {
  if (type === CATEGORY) {
    showCategoryList(array);
  } else if (type === PRODUCT) {
    showProductList(array);
  }
}
