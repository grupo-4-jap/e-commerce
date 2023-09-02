const ORDER_ASC_BY_NUM = '09';
const ORDER_DESC_BY_NUM = '90';
const ORDER_BY_PROD_SOLD = 'Vendidos';
let currentProductsArray = [];
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

function sortAndShowCategories(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortCategories(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

function showCategoriesList() {
  let htmlContentToAppend = '';
  for (let i = 0; i < currentProductsArray.length; i++) {
    let category = currentProductsArray[i];

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

function updateProductsArray(data) {
  currentProductsArray = data.body.products;
}

export {
  sortAndShowCategories,
  updateProductsArray,
  ORDER_ASC_BY_NUM,
  ORDER_DESC_BY_NUM,
  ORDER_BY_PROD_SOLD,
};
