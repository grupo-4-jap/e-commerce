import { PRODUCTS_URL } from './constants/API.js';
import {
  ORDER_ASC_BY_NUM,
  ORDER_DESC_BY_NUM,
  ORDER_BY_PROD_SOLD,
} from './constants/CONSTANTS.js';

import getJSONData from './utils/getJSONData.js';
import sortAndShowCategories from './utils/sortProducts.js';
import filterByPrice from './utils/filterByPrice.js';
import showList from './utils/showList.js';
import filterByNameAndDescription from './utils/filterByName.js';

const DOMProducts = document.querySelectorAll('.list-group-item');
const btnSortAsc = document.getElementById('sortAsc');
const btnSortDesc = document.getElementById('sortDesc');
const btnSortByCount = document.getElementById('sortByCount');
const btnRangeFilterCount = document.getElementById('rangeFilterCount');
const btnClearRangeFilter = document.getElementById('clearRangeFilter');
const searchBar = document.getElementById('search-input');

let data = {};
let productList = [];

// Expected JSON Data

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

// Functions

function getCatId() {
  const catid = localStorage.getItem('catID');
  return catid !== null ? catid : 101;
}

function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

function clearFilters() {
  showList(productList);
}

// Events

document.addEventListener('DOMContentLoaded', async () => {
  // Changes the page's sub-title
  const catName = document.getElementById('catName');
  catName.innerHTML = '';

  // Get data
  const catID = getCatId();
  data = await getJSONData({ URL: PRODUCTS_URL, options: catID });
  productList = await data.body.products;

  // Render list and sub-title
  catName.innerHTML = data.body.catName;
  showList(productList);

  // This creates an event for each product card
  Array.from(DOMProducts).forEach(function (product) {
    product.addEventListener('click', function () {
      const { id } = product;
      setProductID(id);
    });
  });
});

btnSortAsc.addEventListener('click', function () {
  sortAndShowCategories(ORDER_ASC_BY_NUM, productList);
});

btnSortDesc.addEventListener('click', function () {
  sortAndShowCategories(ORDER_DESC_BY_NUM, productList);
});

btnSortByCount.addEventListener('click', function () {
  sortAndShowCategories(ORDER_BY_PROD_SOLD, productList);
});

btnRangeFilterCount.addEventListener('click', async function () {
  const min = Number(document.getElementById('rangeFilterCountMin').value);
  const max = Number(document.getElementById('rangeFilterCountMax').value);
  showList(filterByPrice(productList, min, max));
});

btnClearRangeFilter.addEventListener('click', function (e) {
  e.stopPropagation();
  clearFilters();
});

searchBar.addEventListener('input', function (e) {
  const value = e.target.value;

  const filteredProducts = filterByNameAndDescription(value, productList);
  showList(filteredProducts);
});
