import showList from './showList.js';
import {
  ORDER_ASC,
  ORDER_DESC,
  ORDER_BY_PROD_SOLD,
  ORDER_BY_PROD_COUNT,
} from '../constants/CONSTANTS.js';

let currentProductsArray = [];
let currentSortCriteria = undefined;

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC) {
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
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

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

export default function sortAndShowCategories(
  sortCriteria,
  productsArray,
  dataType
) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortCategories(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro las categorías ordenadas
  showList(currentProductsArray, { type: dataType });
}
