import getJSONData from './utils/getJSONData.js';
import { CART_INFO_URL } from './constants/API.js';

function getProducts() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart != null ? cart : [];
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getJSONData({ URL: CART_INFO_URL, options: '25801' });
  const articles = data.body.articles;

  const cart = getProducts();
  const shoppingCart = articles.concat(cart);

  const tbody = document.querySelector('tbody');
  shoppingCart.forEach((product) => {
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
    console.log(item);
    input.addEventListener('input', (e) => {
      const quantity = e.target.value;
      const productPrice = item.querySelector('.cost').innerText;
      const [currency, cost] = productPrice.split(' ');

      item.querySelector('.total').innerText = `${currency} ${cost * quantity}`;
    });
  });
});
