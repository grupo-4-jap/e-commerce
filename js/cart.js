import getJSONData from './utils/getJSONData.js';
import { CART_INFO_URL } from './constants/API.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getJSONData({ URL: CART_INFO_URL, options: '25801' });
  console.log(data);
  const articles = data.body.articles;

  const tbody = document.querySelector('tbody');
  articles.forEach((product) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.unitCost}</td>
    <td>${product.count}</td>
    <td>${product.currency}</td>
    <td><img src="${product.image}" alt="Imagen del product" width="50"></td>
    <td>${product.unitCost * product.count}</td>
    `;

    tbody.appendChild(row);
  });
});
