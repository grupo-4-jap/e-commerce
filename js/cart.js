import getJSONData from './utils/getJSONData.js';
import { CART_INFO_URL } from './constants/API.js';

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

document.addEventListener('DOMContentLoaded', async () => {
  cart = await getCartProducts().then((data) => data);
  const tbody = document.querySelector('tbody');

  cart.forEach((product) => {
    const { id, name, unitCost, count, currency, image } = product;
    const row = document.createElement('tr');
    row.className = 'article';
    row.id = id;

    row.innerHTML = `
      <td class="d-flex align-items-center gap-3">
        <img src="${image}" alt="Imagen del producto" width="150">
        <p>${name}</p>
      </td>
      <td class="cost">${currency} ${unitCost}</td>
      <td><input class="text-center" type="number" value="${count}" min="1" style="width:5em"></td>
      <td class="total">${currency} ${unitCost * count}</td>
      <td class="cursor-active"><img class="border rounded border-danger p-2" src="./icons/trash3.svg" width="40" height="40" /></td>
      `;

    tbody.appendChild(row);
  });

  document.querySelectorAll('.article').forEach((item) => {
    // On change input event
    const input = item.querySelector('input');
    input.addEventListener('input', (e) => {
      const quantity = e.target.value;
      const productPrice = item.querySelector('.cost').innerText;
      const [currency, cost] = productPrice.split(' ');

      item.querySelector('.total').innerText = `${currency} ${cost * quantity}`;
    });

    // On click element event
    const trashIcon = item.querySelectorAll('img')[1];
    trashIcon.addEventListener('click', function () {
      deleteProduct(item);
    });
  });
});
