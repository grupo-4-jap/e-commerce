import { PRODUCTS_URL } from './constants/API.js';
import {
  ORDER_ASC,
  ORDER_DESC,
  ORDER_BY_PROD_SOLD,
  PRODUCT,
} from './constants/CONSTANTS.js';

import getJSONData from './utils/getJSONData.js';
import sortAndShowCategories from './utils/sortProducts.js';
import filterByPrice from './utils/filterByPrice.js';
import showList from './utils/showList.js';
import filterByNameAndDescription from './utils/filterByName.js';
import addEvents from './utils/addEvents.js';

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
  const catID = localStorage.getItem('catID');
  return catID !== null ? catID : 101;
}

function clearFilters() {
  sortAndShowCategories(ORDER_BY_PROD_SOLD, productList, PRODUCT);
}

// Events
document.addEventListener('DOMContentLoaded', async function () {
  // Changes the page's sub-title
  const catName = document.getElementById('catName');
  catName.innerHTML = '';

  // Get data
  const catID = getCatId();
  data = await getJSONData({ URL: PRODUCTS_URL, options: catID });
  productList = data.body.products;

  // Render list and sub-title
  productList.length === 0
    ? (document.querySelector('main').innerHTML = `
      <h1 class="d-flex justify-content-center align-items-center" style="height: 50vh">
        WOOOOPS!! PARECE QUE NO HAY PRODUCTOS
      </h1>`)
    : showList(productList, { type: PRODUCT });

  catName.innerHTML = data.body.catName;
  addEvents('list-group-item', PRODUCT);

  btnSortAsc.addEventListener('click', function () {
    sortAndShowCategories(ORDER_ASC, productList, PRODUCT);
    addEvents('list-group-item', PRODUCT);
  });

  btnSortDesc.addEventListener('click', function () {
    sortAndShowCategories(ORDER_DESC, productList, PRODUCT);
    addEvents('list-group-item', PRODUCT);
  });

  btnSortByCount.addEventListener('click', function () {
    sortAndShowCategories(ORDER_BY_PROD_SOLD, productList, PRODUCT);
    addEvents('list-group-item', PRODUCT);
  });

  btnRangeFilterCount.addEventListener('click', async function () {
    const min = Number(document.getElementById('rangeFilterCountMin').value);
    const max = Number(document.getElementById('rangeFilterCountMax').value);
    const filteredList = filterByPrice(productList, min, max);

    if (min < max) {
      showList(filteredList, { type: PRODUCT });
      addEvents('list-group-item', PRODUCT);
    }
  });

  btnClearRangeFilter.addEventListener('click', function (e) {
    e.stopPropagation();
    clearFilters();
  });

  searchBar.addEventListener('input', function (e) {
    const value = e.target.value;

    const filteredProducts = filterByNameAndDescription(value, productList);
    showList(filteredProducts, { type: PRODUCT });
  });
});
