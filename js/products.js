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
});
