import { showAlert } from './utils/showAlert.js';
import { getCartProducts } from './utils/getCartProducts.js';
import { CART_URL } from './constants/API.js';

const shippingRadioButtons = document.querySelectorAll(
  '.shipping-radio-button'
);
const creditCardBtn = document.getElementById('credit-card-btn');
const creditCardInputs = document.querySelectorAll('.credit-card-input');
const bankTransferBtn = document.getElementById('bank-transfer-btn');
const bankTransferInput = document.querySelector('.bank-transfer-input');
const typeOfPayment = document.getElementById('payment-method');
const form = document.querySelector('form');

let cart = Array();

async function checkAuth() {
  const { accessToken } = JSON.parse(localStorage.getItem('userData'));

  const res = await fetch('http://localhost:3000/cart', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.ok;
}

async function deleteProduct(product) {
  const { accessToken } = JSON.parse(localStorage.getItem('userData'));
  const DOMProduct = document.getElementById(`${product.id}`);
  DOMProduct.remove();

  const split = DOMProduct.id.split('-');
  const id = split[0];

  const cart = await getCartProducts();
  const itemToDelete = cart.find((item) => item.id === Number(id));
  const index = cart.indexOf(itemToDelete);

  const res = await fetch(`${CART_URL}/${index}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'DELETE',
  });
}

// Update items quantity in cart stored in LocalStorage
async function updateItemQuantity(DOMItem, newValue) {
  const { accessToken } = JSON.parse(localStorage.getItem('userData'));
  const { id } = DOMItem;
  const idNumber = id.split('-')[0];
  const itemToModify = cart.find((item) => item.id === Number(idNumber));
  const index = cart.indexOf(itemToModify);

  const operation = newValue > itemToModify.count ? 'add' : 'subtract';

  fetch(`${CART_URL}/${index}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'PUT',
    body: JSON.stringify([operation]),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      return res.json();
    })
    .catch((error) => console.error(error));

  const newCart = await getCartProducts();
  cart = newCart;
}

function getBuyResume() {
  const [subtotalDOM, shippingCostDOM, totalDOM] = document
    .querySelector('#subtotal')
    .querySelectorAll('.subtotal-child');

  const [{ value }] = Array.from(shippingRadioButtons).filter(
    (button) => button.checked
  );

  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.count * item.cost;
  });

  subtotalDOM.innerHTML = `USD ${totalPrice}`;
  shippingCostDOM.innerHTML = `USD ${(totalPrice * Number(value)).toFixed(0)}`;
  totalDOM.innerHTML = `USD ${(totalPrice * (Number(value) + 1)).toFixed(0)}`;
}

// There are two versions of the cart, one for mobile device and another for
// Tablet and desktop device, the function changes the value of the 'sibling' input
function updateSiblingInput(DOMElement, value) {
  const split = DOMElement.id.split('-');
  const id = split[0];
  const resolution = split[split.length - 1] !== 'md' ? 'md' : 's';

  document.getElementById(`${id}-${resolution}`).querySelector('input').value =
    value;
}

function isRadioChecked(array) {
  return array.some((element) => element.checked === true);
}

function getInputsToValidate() {
  // DOM Elements
  const formInputs = Array.from(form.querySelectorAll('input')).filter(
    (input) => input.type !== 'radio'
  );
  const modal = document.querySelector('.modal-body');
  const modalInputs = Array.from(modal.querySelectorAll('input')).filter(
    (input) => input.type !== 'radio' && input.disabled === false
  );

  // Array
  return formInputs.concat(modalInputs);
}

function getValidation() {
  const inputs = getInputsToValidate();
  const modalInputs = inputs.filter(
    (input) =>
      input.className.includes('credit-card-input') ||
      input.className.includes('bank-transfer')
  );

  // Check every input is validated
  inputs.forEach((input) => {
    input.setAttribute('required', '');
    input.checkValidity();
  });

  // Checks validation for modal
  modalInputs.forEach((input) => {
    input.checkValidity()
      ? typeOfPayment.parentElement.classList.remove('invalid')
      : typeOfPayment.parentElement.classList.add('invalid');
  });

  const isValid = inputs.every((item) => item.checkValidity());
  const isCartEmpty = cart.length === 0;

  return isValid && !isCartEmpty;
}

function resetCart(inputs, localCart) {
  // Remove from localStorage
  localStorage.removeItem('cart');

  // Empty the localArray
  localCart.length = 0;

  // Empty inputs value and delete required attribute
  inputs.forEach((input) => {
    input.value = '';
    input.removeAttribute('required');
  });
}

// Renders the cart elements
function showCart(array) {
  const tbody = document.querySelector('tbody');

  // MD or greater devices
  cart.forEach((product) => {
    const { id, name, cost, count, currency, images } = product;
    const row = document.createElement('tr');
    row.className = 'article';
    row.id = `${id}-md`;

    row.innerHTML = `
          <td class="d-flex align-items-center gap-3">
            <img src="${images[0]}" alt="Imagen del producto" width="150">
            <p class="m-0">${name}</p>
          </td>
          <td class="cost">${currency} ${cost}</td>
          <td><input class="text-center" type="number" value="${count}" min="1" style="width:5em" /></td>
          <td class="total">${currency} ${cost * count}</td>
          <td class="cursor-active"><img class="border rounded border-danger p-2" src="./icons/trash3.svg" width="40" height="40" /></td>
          `;

    tbody.appendChild(row);
  });

  // Mobile devices
  cart.forEach((product) => {
    const { id, name, cost, count, currency, images } = product;
    const listGroup = document.querySelector('#list-group');
    listGroup.innerHTML += `
          <li class="list-group-item d-flex justify-content-center article" id="${id}-s">
            <div class="card border-0">
              <img src="${images[0]}" alt="..." />
              <div class="mt-2">
                <h5 class="card-title">${name}</h5>
                <div class="row">
                  <div class="row col-9">
                    <div class="col">
                      <p>
                        <span class="fw-bold">Costo: </span>
                        <p class="cost">${currency} ${cost}</p>
                      </p>
                      <p>
                        <span class="fw-bold">Subtotal: </span>
                        <p class="total">${currency} ${cost * count}</p>
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
}

document.addEventListener('DOMContentLoaded', async function () {
  const isAuthorized = await checkAuth();

  if (!isAuthorized) {
    showAlert('Debes estar autorizado para ver el carrito', 'danger');
  } else {
    cart = await getCartProducts();

    getBuyResume();

    showCart(cart);

    // This select the rows in cart in order to apply the "input" event
    document.querySelectorAll('.article').forEach((item) => {
      // On change input value
      const input = item.querySelector('input');
      input.addEventListener('input', async (e) => {
        const quantity = e.target.value;
        const productPrice = item.querySelector('.cost').innerText;
        const [currency, cost] = productPrice.split(' ');
        const finalPrice = cost * quantity;

        updateSiblingInput(item, quantity);

        item.querySelector('.total').innerText = `${currency} ${finalPrice}`;
        await updateItemQuantity(item, quantity);
        getBuyResume();
      });

      // On click delete element
      const trashIcon = item.querySelectorAll('img')[1];
      trashIcon.addEventListener('click', function () {
        deleteProduct(item);
        getBuyResume();
      });
    });

    shippingRadioButtons.forEach((button) => {
      button.addEventListener('click', function () {
        getBuyResume();
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (getValidation()) {
        cart.length = 0;
        getBuyResume();
        showCart(cart);
      }
    });

    document.querySelectorAll('.invalid-feedback').forEach((feedback) => {
      feedback.classList.add('d-none');
    });

    document.querySelectorAll('.form-control').forEach((input) => {
      input.classList.remove('is-invalid');
    });

    // btnEndPurchase.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();

    //   checkValidation();
    // });
  }

  creditCardBtn.addEventListener('click', function () {
    if (creditCardBtn.checked) {
      bankTransferInput.setAttribute('disabled', '');
    }
    creditCardInputs.forEach((input) => {
      input.removeAttribute('disabled', '');
    });
    typeOfPayment.innerHTML = 'Tarjeta de crédito';
  });

  bankTransferBtn.addEventListener('click', function () {
    if (bankTransferBtn.checked) {
      creditCardInputs.forEach((input) => {
        input.setAttribute('disabled', '');
      });
      bankTransferInput.removeAttribute('disabled', '');
    }
    typeOfPayment.innerHTML = 'Transferencia bancaria';
  });
});
