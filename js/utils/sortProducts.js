import showProductList from './showList.js';
import {
  ORDER_ASC_BY_NUM,
  ORDER_DESC_BY_NUM,
  ORDER_BY_PROD_SOLD,
} from '../constants/CONSTANTS.js';

let currentProductsArray = [];
let currentSortCriteria = undefined;

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NUM) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NUM) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_SOLD) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

export default function sortAndShowCategories(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortCategories(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro las categorías ordenadas
  showProductList(currentProductsArray);
}
