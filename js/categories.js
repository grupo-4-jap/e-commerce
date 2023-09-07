import {
  ORDER_ASC,
  ORDER_DESC,
  ORDER_BY_PROD_COUNT,
  CATEGORY,
} from './constants/CONSTANTS.js';
import { CATEGORIES_URL } from './constants/API.js';

import getJSONData from './utils/getJSONData.js';
import sortAndShowCategories from './utils/sortProducts.js';
import showList from './utils/showList.js';

let data = {};
let categoryList = [];
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function setCatID(id) {
  localStorage.setItem('catID', id);
  window.location = 'products.html';
}

document.addEventListener('DOMContentLoaded', async function (e) {
  // Get JSON Data
  data = await getJSONData({ URL: CATEGORIES_URL });
  categoryList = data.body;

  // Render the categories
  showList(categoryList, { type: CATEGORY });

  // Add events to the categories cards
  const categories = Array.from(
    document.getElementsByClassName('list-group-item')
  );
  categories.forEach(function (category) {
    category.addEventListener('click', function (e) {
      const { id } = category;
      setCatID(id);
    });
  });
});

document.getElementById('sortAsc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_ASC, categoryList, CATEGORY);
});

document.getElementById('sortDesc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_DESC, categoryList, CATEGORY);
});

document.getElementById('sortByCount').addEventListener('click', function () {
  sortAndShowCategories(ORDER_BY_PROD_COUNT, categoryList, CATEGORY);
});

// document
//   .getElementById('clearRangeFilter')
//   .addEventListener('click', function () {
//     document.getElementById('rangeFilterCountMin').value = '';
//     document.getElementById('rangeFilterCountMax').value = '';

//     minCount = undefined;
//     maxCount = undefined;

//     showCategoryList();
//   });

// document
//   .getElementById('rangeFilterCount')
//   .addEventListener('click', function () {
//     //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
//     //de productos por categoría.
//     minCount = document.getElementById('rangeFilterCountMin').value;
//     maxCount = document.getElementById('rangeFilterCountMax').value;

//     if (minCount != undefined && minCount != '' && parseInt(minCount) >= 0) {
//       minCount = parseInt(minCount);
//     } else {
//       minCount = undefined;
//     }

//     if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
//       maxCount = parseInt(maxCount);
//     } else {
//       maxCount = undefined;
//     }

//     showCategoryList();
//   });
