const URL_CATALOG = 'https://japceibal.github.io/emercado-api/cats_products/';

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

function showProducts(products) {
  const container = document.getElementById('containerProducts');
  container.innerHTML = '';

  for (const p of products) {
    const { name, description, cost, currency, soldCount, image } = p;

    container.innerHTML += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${name} - ${currency} ${cost} </h4> 
                        <p>${description}</p> 
                        </div>
                        <small class="text-muted">${soldCount} Vendidos</small> 
                    </div>

                </div>
            </div>
        </div>`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const catName = document.getElementById('catName');
  catName.innerHTML = '';
  const data = await getCatalogData();
  console.log(data);
  catName.innerHTML = data.body.catName;
  showProducts(data.body.products);

  updateProductsArray(data);
});

function updateProductsArray(data) {
  currentCategoriesArray = data.body.products;
}

// *************************
// *************************
//  SORT PRODUCTS FUNCTION
// *************************
// *************************

const ORDER_ASC_BY_NUM = '09';
const ORDER_DESC_BY_NUM = '90';
const ORDER_BY_PROD_SOLD = 'Vendidos';
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

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

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

function showCategoriesList() {
  let htmlContentToAppend = '';
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    const { id, image, description, name, soldCount, currency, cost } =
      category;
    if (
      (minCount == undefined ||
        (minCount != undefined &&
          parseInt(category.productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.productCount) <= maxCount))
    ) {
      htmlContentToAppend += `
            <div onclick="setCatID(${id})" class="list-group-item list-group-item-action cursor-active">
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
    }

    document.getElementById('containerProducts').innerHTML =
      htmlContentToAppend;
  }
}

document.getElementById('sortAsc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_ASC_BY_NUM);
});

document.getElementById('sortDesc').addEventListener('click', function () {
  sortAndShowCategories(ORDER_DESC_BY_NUM);
});

document.getElementById('sortByCount').addEventListener('click', function () {
  sortAndShowCategories(ORDER_BY_PROD_SOLD);
});
