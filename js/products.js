import {
  sortAndShowCategories,
  ORDER_ASC_BY_NUM,
  ORDER_DESC_BY_NUM,
  ORDER_BY_PROD_SOLD,
} from './utils/sortProducts.js';

import filterByPrice from './utils/filterByPrice.js';
import showList from './utils/showList.js';
import filterByNameAndDescription from './utils/filterByName.js';

const URL_CATALOG = 'https://japceibal.github.io/emercado-api/cats_products/';
let data = {};
let productList = [];

/**
 * {
 *  "catID": Number,
 * "catName": String,
 * "products": Array [{
 *      "id": 50921,
        "name": "Chevrolet Onix Joy",
        "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
        "cost": 13500,
        "currency": "USD",
        "soldCount": 14,
        "image": "img/prod50921_1.jpg"
 *  },
    ...
]
 * }
 */

function getCatId() {
  const catid = localStorage.getItem('catID');
  return catid !== null ? catid : 101;
}

function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

async function getCatalogData() {
  const result = {};

  try {
    const response = await fetch(URL_CATALOG + getCatId() + '.json');

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

function clearFilters() {
  showList(productList);
}

// Events

document.addEventListener('DOMContentLoaded', async () => {
  const catName = document.getElementById('catName');
  catName.innerHTML = '';
  data = await getCatalogData();
  productList = await data.body.products;
  catName.innerHTML = data.body.catName;
  showList(productList);
  console.log(productList);

  const nodeProducts = document.querySelectorAll('.list-group-item');

  // This creates an event for each product card
  Array.from(nodeProducts).forEach(function (product) {
    product.addEventListener('click', function () {
      const { id } = product;
      setProductID(id);
    });
  });
});

document.getElementById('sortAsc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_ASC_BY_NUM, productList);
});

document.getElementById('sortDesc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_DESC_BY_NUM, productList);
});

document.getElementById('sortByCount').addEventListener('click', function () {
  sortAndShowCategories(ORDER_BY_PROD_SOLD, productList);
});

document
  .getElementById('rangeFilterCount')
  .addEventListener('click', async function () {
    const min = Number(document.getElementById('rangeFilterCountMin').value);
    const max = Number(document.getElementById('rangeFilterCountMax').value);
    showList(filterByPrice(productList, min, max));
  });

document
  .getElementById('clearRangeFilter')
  .addEventListener('click', function (e) {
    e.stopPropagation();
    clearFilters();
  });

document.getElementById('search-input').addEventListener('input', function (e) {
  const value = e.target.value;

  const filteredProducts = filterByNameAndDescription(value, productList);
  showList(filteredProducts);
});
