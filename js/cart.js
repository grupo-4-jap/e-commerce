import getJSONData from './utils/getJSONData.js';
import { CART_INFO_URL } from './constants/API.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getJSONData({ URL: CART_INFO_URL, options: '25801' });
  const articles = data.body.articles;

  const tbody = document.querySelector('tbody');
  articles.forEach((product) => {
    const row = document.createElement('tr');
    row.className = 'article';

    row.innerHTML = `
    <td>${product.name}</td>
    <td class="cost">${product.unitCost}</td>
    <td><input type="number" value="${product.count}" style="width:5em"></td>
    <td>${product.currency}</td>
    <td><img src="${product.image}" alt="Imagen del product" width="50"></td>
    <td class="total">${product.unitCost * product.count}</td>
    `;

    tbody.appendChild(row);
  });

  document.querySelectorAll('.article').forEach((item) => {
    const input = item.querySelector('input');
    input.addEventListener('input', (e) => {
      const quantity = e.target.value;
      const cost = item.querySelector('.cost').innerText;
      item.querySelector('.total').innerText = cost * quantity;
    });
  });
});
