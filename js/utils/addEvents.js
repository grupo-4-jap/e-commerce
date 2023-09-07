import { CATEGORY, PRODUCT } from '../constants/CONSTANTS.js';

function setCatID(id) {
  localStorage.setItem('catID', id);
  window.location = 'products.html';
}

function setProductID(id) {
  localStorage.setItem('productID', id);
  window.location = 'product-info.html';
}

export default function addEvents(domElement, dataType) {
  const elements = Array.from(document.getElementsByClassName(domElement));
  console.log(elements);
  elements.forEach(function (e) {
    e.addEventListener('click', function () {
      const { id } = e;
      if (dataType === CATEGORY) {
        setCatID(id);
      } else if (dataType === PRODUCT) {
        setProductID(id);
      }
    });
  });
}
