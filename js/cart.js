import getJSONData from './utils/getJSONData.js';
import { CART_INFO_URL } from './constants/API.js';

function isProductInCart(cartProducts, productID) {
  if (cartProducts.length === 0) true;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id !== productID) false;
  }

  return true;
}

async function getCartProducts() {
  let localCart = JSON.parse(localStorage.getItem('cart'));
  const defaultCartProduct = await getJSONData({
    URL: CART_INFO_URL,
    options: '25801',
  }).then((data) => data.body.articles);

  if (localCart !== null) {
    console.log(isProductInCart(localCart, 50924));
    return isProductInCart(localCart, 50924)
      ? localCart
      : localCart.concat(defaultCartProduct);
  } else {
    localCart = defaultCartProduct;
  }

  localStorage.setItem('cart', JSON.stringify(localCart));

  return localCart;
}

document.addEventListener('DOMContentLoaded', async () => {
  const cart = await getCartProducts();
  const tbody = document.querySelector('tbody');

  cart.forEach((product) => {
    const { name, unitCost, count, currency, image } = product;
    const row = document.createElement('tr');
    row.className = 'article';

    row.innerHTML = `
      <td class="d-flex align-items-center gap-3">
        <img src="${image}" alt="Imagen del producto" width="150">
        <p>${name}</p>
      </td>
      <td class="cost">${currency} ${unitCost}</td>
      <td><input class="text-center" type="number" value="${count}" min="1" style="width:5em"></td>
      <td class="total">${currency} ${unitCost * count}</td>
      `;

    tbody.appendChild(row);
  });

  document.querySelectorAll('.article').forEach((item) => {
    const input = item.querySelector('input');
    input.addEventListener('input', (e) => {
      const quantity = e.target.value;
      const productPrice = item.querySelector('.cost').innerText;
      const [currency, cost] = productPrice.split(' ');

      item.querySelector('.total').innerText = `${currency} ${cost * quantity}`;
    });
  });
});
