import {
  sortAndShowCategories,
  ORDER_ASC_BY_NUM,
  ORDER_DESC_BY_NUM,
  ORDER_BY_PROD_SOLD,
} from './utils/sortProducts.js';

import filterProducts from './utils/filterProducts.js';
import showProductList from './utils/showProductList.js';
import filterByName from './utils/filterByName.js';

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
  showProductList(productList);
}

// Events

document.addEventListener('DOMContentLoaded', async () => {
  const catName = document.getElementById('catName');
  catName.innerHTML = '';
  data = await getCatalogData();
  productList = await data.body.products;
  catName.innerHTML = data.body.catName;
  showProductList(productList);
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
    showProductList(filterProducts(productList, min, max));
  });

document
  .getElementById('clearRangeFilter')
  .addEventListener('click', function (e) {
    e.stopPropagation();
    clearFilters();
  });

document.getElementById('search-input').addEventListener('input', function (e) {
  const value = e.target.value;

  const filteredProducts = filterByName(value, productList);
  showProductList(filteredProducts);
});
