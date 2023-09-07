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
import addEvents from './utils/addEvents.js';

const btnSortAsc = document.getElementById('sortAsc');
const btnSortDesc = document.getElementById('sortDesc');
const btnSortByCount = document.getElementById('sortByCount');

let data = {};
let categoryList = [];

document.addEventListener('DOMContentLoaded', async function (e) {
  // Get JSON Data
  data = await getJSONData({ URL: CATEGORIES_URL });
  categoryList = data.body;

  // Render the categories
  showList(categoryList, { type: CATEGORY });
  addEvents('list-group-item', CATEGORY);
});

btnSortAsc.addEventListener('click', function () {
  sortAndShowCategories(ORDER_ASC, categoryList, CATEGORY);
  addEvents('list-group-item', CATEGORY);
});

btnSortDesc.addEventListener('click', function () {
  sortAndShowCategories(ORDER_DESC, categoryList, CATEGORY);
  addEvents('list-group-item', CATEGORY);
});

btnSortByCount.addEventListener('click', function () {
  sortAndShowCategories(ORDER_BY_PROD_COUNT, categoryList, CATEGORY);
  addEvents('list-group-item', CATEGORY);
});
