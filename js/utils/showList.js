function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

function showList(array, onClickFunc) {
  let htmlContentToAppend = '';
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    const { id, image, description, name, soldCount, currency, cost } = product;

    htmlContentToAppend += `
            <div id=${id} class="list-group-item list-group-item-action cursor-active">
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

    document.getElementById('containerProducts').innerHTML =
      htmlContentToAppend;
  }
}

export default showList;
