import getJSONData from './utils/getJSONData.js';
import { CART_INFO_URL } from './constants/API.js';

const radioButtons = document.querySelectorAll('input[type = "radio"]');

let cart = new Array();

function isProductInCart(cartProducts, productID) {
  if (cartProducts.length === 0) true;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id !== productID) false;
  }

  return true;
}

// If the cart is null this will be filled with the defaultCartProduct that is
// get from the JSON, but if the cart already have it this won't be filled,
// then the cart will be concatenated with the localStorage cart
// which is created with the user activity
async function getCartProducts() {
  let localCart = JSON.parse(localStorage.getItem('cart'));
  const defaultCartProduct = await getJSONData({
    URL: CART_INFO_URL,
    options: '25801',
  }).then((data) => data.body.articles);

  if (localCart !== null) {
    return isProductInCart(localCart, 50924)
      ? localCart
      : localCart.concat(defaultCartProduct);
  } else {
    localCart = defaultCartProduct;
  }

  localStorage.setItem('cart', JSON.stringify(localCart));

  return localCart;
}

function deleteProduct(product) {
  const DOMProduct = document.getElementById(`${product.id}`);
  DOMProduct.remove();

  const itemToDelete = cart.find((item) => item.id === Number(product.id));
  const index = cart.indexOf(itemToDelete);
  const newCart = cart;
  newCart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(newCart));
}

function updateItemQuantity(DOMItem, newQuantity) {
  const { id } = DOMItem;
  const idNumber = id.split('-')[0];

  cart.forEach((cartItem) => {
    if (cartItem.id == idNumber) cartItem.count = Number(newQuantity);
  });

  localStorage.setItem('cart', JSON.stringify(cart));
}

function getBuyResume() {
  const DOMsubtotal = document.querySelector('#subtotal');
  const DOMshippingCost = document.querySelector('#costo-envio');
  const DOMtotal = document.querySelector('#total');

  let selectedValue = 0;
  radioButtons.forEach((button) => {
    if (button.checked) {
      selectedValue = Number(button.value);
    }
  });

  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.count * item.unitCost;
  });

  DOMsubtotal.innerHTML = `USD ${totalPrice}`;
  DOMshippingCost.innerHTML = `USD ${(totalPrice * selectedValue).toFixed(0)}`;
  DOMtotal.innerHTML = `USD ${(totalPrice * (selectedValue + 1)).toFixed(0)}`;
}

document.addEventListener('DOMContentLoaded', async function () {
  cart = await getCartProducts().then((data) => data);
  const tbody = document.querySelector('tbody');
  getBuyResume();
  // MD or greater devices
  cart.forEach((product) => {
    const { id, name, unitCost, count, currency, image } = product;
    const row = document.createElement('tr');
    row.className = 'article';
    row.id = `${id}-md`;

    row.innerHTML = `
      <td class="d-flex align-items-center gap-3">
        <img src="${image}" alt="Imagen del producto" width="150">
        <p class="m-0">${name}</p>
      </td>
      <td class="cost">${currency} ${unitCost}</td>
      <td><input class="text-center" type="number" value="${count}" min="1" style="width:5em"></td>
      <td class="total">${currency} ${unitCost * count}</td>
      <td class="cursor-active"><img class="border rounded border-danger p-2" src="./icons/trash3.svg" width="40" height="40" /></td>
      `;

    tbody.appendChild(row);
  });

  // Phone devices
  cart.forEach((product) => {
    const { id, name, unitCost, count, currency, image } = product;
    const listGroup = document.querySelector('#list-group');
    listGroup.innerHTML += `
      <li class="list-group-item d-flex justify-content-center article" id="${id}-s">
        <div class="card border-0">
          <img src="${image}" alt="..." />
          <div class="mt-2">
            <h5 class="card-title">${name}</h5>
            <div class="row">
              <div class="row col-9">
                <div class="col">
                  <p>
                    <span class="fw-bold">Costo: </span>
                    <p class="cost">${currency} ${unitCost}</p>
                  </p>
                  <p>
                    <span class="fw-bold">Subtotal: </span>
                    <p class="total">${currency} ${unitCost * count}</p>
                  </p>
                </div>
                <div class="col-3 d-flex align-self-center">
                  <input class="text-center" type="number" style="width: 3rem" value="${count}" min="1" />
                </div>
              </div>
              <div class="col d-flex justify-content-center align-self-center ms-3 m-sm-0">
                <div>
                  <img class="border rounded border-danger p-2" src="./icons/trash3.svg" width="40" height="40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    `;
  });

  // This selects the DOM elements and applies events on them
  document.querySelectorAll('.article').forEach((item) => {
    // On change input value
    const input = item.querySelector('input');
    input.addEventListener('input', (e) => {
      const quantity = e.target.value;
      const productPrice = item.querySelector('.cost').innerText;
      const [currency, cost] = productPrice.split(' ');
      const finalPrice = cost * quantity;

      item.querySelector('.total').innerText = `${currency} ${finalPrice}`;
      updateItemQuantity(item, quantity);
      getBuyResume();
    });

    // On click delete element
    const trashIcon = item.querySelectorAll('img')[1];
    trashIcon.addEventListener('click', function () {
      deleteProduct(item);
    });
  });

  radioButtons.forEach((button) => {
    button.addEventListener('click', function () {
      getBuyResume();
    });
  });
});
