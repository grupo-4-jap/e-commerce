import { showAlert } from './utils/showAlert.js';
import getJSONData from './utils/getJSONData.js';
import { getCartProducts } from './utils/getCartProducts.js';

const shippingRadioButtons = document.querySelectorAll(
  '.shipping-radio-button'
);
const creditCardBtn = document.getElementById('credit-card-btn');
const creditCardInputs = document.querySelectorAll('.credit-card-input');
const bankTransferBtn = document.getElementById('bank-transfer-btn');
const bankTransferInput = document.querySelector('.bank-transfer-input');
const typeOfPayment = document.getElementById('payment-method');

let cart = Array();

const userData = localStorage.getItem('userData');

async function checkAuth() {
  const { accessToken } = JSON.parse(localStorage.getItem('userData'));

  return fetch('http://localhost:3000/cart', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
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

// Update items quantity in cart stored in LocalStorage
function updateItemQuantity(DOMItem, newQuantity) {
  const { id } = DOMItem;
  const idNumber = id.split('-')[0];

  cart.forEach((cartItem) => {
    if (cartItem.id == idNumber) cartItem.count = Number(newQuantity);
  });

  localStorage.setItem('cart', JSON.stringify(cart));
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

function getBuyResume() {
  const DOMsubtotal = document.querySelector('#subtotal');
  const DOMshippingCost = document.querySelector('#costo-envio');
  const DOMtotal = document.querySelector('#total');

  let selectedValue = 0;
  shippingRadioButtons.forEach((button) => {
    if (button.checked) {
      selectedValue = Number(button.value);
    }
  });

  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.count * item.cost;
  });

  DOMsubtotal.innerHTML = `USD ${totalPrice}`;
  DOMshippingCost.innerHTML = `USD ${(totalPrice * selectedValue).toFixed(0)}`;
  DOMtotal.innerHTML = `USD ${(totalPrice * (selectedValue + 1)).toFixed(0)}`;
}

function isRadioChecked(array) {
  return array.some((element) => element.checked === true);
}

// This function checks the validation form and executes the logic in order
// to finish the transaction
function checkValidation() {
  const street = document.getElementById('shipping-street').value;
  const number = document.getElementById('shipping-number').value;
  const corner = document.getElementById('shipping-corner').value;

  // Address inputs check
  if (street === '') {
    document.getElementById('street-feedback').classList.remove('d-none');
    document.getElementById('shipping-street').classList.add('is-invalid');
  } else {
    document.getElementById('street-feedback').classList.add('d-none');
    document.getElementById('shipping-street').classList.remove('is-invalid');
  }

  if (number === '') {
    document.getElementById('number-feedback').classList.remove('d-none');
    document.getElementById('shipping-number').classList.add('is-invalid');
  } else {
    document.getElementById('number-feedback').classList.add('d-none');
    document.getElementById('shipping-number').classList.remove('is-invalid');
  }

  if (corner === '') {
    document.getElementById('corner-feedback').classList.remove('d-none');
    document.getElementById('shipping-corner').classList.add('is-invalid');
  } else {
    document.getElementById('corner-feedback').classList.add('d-none');
    document.getElementById('shipping-corner').classList.remove('is-invalid');
  }

  const quantityInputs = document.querySelectorAll(
    '.article input[type="number"]'
  );

  let quantitiesValid = true;

  quantityInputs.forEach((input) => {
    const quantity = parseInt(input.value, 10);

    if (isNaN(quantity) || quantity <= 0) {
      quantitiesValid = false;
    }
  });

  if (!quantitiesValid) {
    document.querySelector('#purchase-alert').innerHTML +=
      '<div class="alert alert-danger alert-dismissible fade show" role="alert">Ingresa una cantidad válida y mayor a 0 para todos los productos<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    // return;
  }

  const paymentMethod = Array.from(
    document.querySelectorAll('.payment-option')
  );

  const paymentFeedback = document.getElementById('payment-feedback');

  if (!isRadioChecked(paymentMethod)) {
    paymentFeedback.innerText = 'Debes seleccionar una forma de pago';
    paymentFeedback.classList.add('visible');
  } else {
    paymentFeedback.classList.remove('visible');
  }

  if (paymentMethod[0].checked) {
    const creditCardNumber =
      document.getElementById('credit-card-number').value;
    const ccvNumber = document.getElementById('ccv-number').value;
    const expirationMonth = document.querySelector('input[name="month"]').value;
    const expirationYear = document.querySelector('input[name="year"]').value;

    if (
      !creditCardNumber ||
      !ccvNumber ||
      !expirationMonth ||
      !expirationYear
    ) {
      document.querySelector('#purchase-alert').innerHTML +=
        '<div class="alert alert-danger alert-dismissible fade show" role="alert">Completa todos los campos de la tarjeta de crédito<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
      return;
    }
  } else if (paymentMethod[1].checked) {
    const accountNumber = document.getElementById('account-number').value;

    if (!accountNumber) {
      document.querySelector('#purchase-alert').innerHTML +=
        '<div class="alert alert-danger alert-dismissible fade show" role="alert">Ingresa el número de transferencia bancaria<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
      return;
    }
  }

  if (cart.length === 0) {
    document.querySelector('#purchase-alert').innerHTML +=
      '<div class="alert alert-danger alert-dismissible fade show" role="alert">El carrito no puede estar vacío<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    return;
  }

  if (
    quantitiesValid &&
    street !== '' &&
    number !== '' &&
    corner !== '' &&
    isRadioChecked(paymentMethod) &&
    cart.length !== 0
  ) {
    document.querySelector('#purchase-alert').innerHTML +=
      '<div class="alert alert-success alert-dismissible fade show" role="alert"> ¡Gracias por tu compra! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  }
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

document.addEventListener('DOMContentLoaded', async function () {
  const isAuthorized = await checkAuth();
  if (!isAuthorized) {
    showAlert('Debes estar autorizado para ver el carrito', 'danger');
  } else {
    cart = await getCartProducts();

    const tbody = document.querySelector('tbody');
    getBuyResume();

    // Renders the cart elements
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

    // This select the rows in cart in order to apply the "input" event
    document.querySelectorAll('.article').forEach((item) => {
      // On change input value
      const input = item.querySelector('input');
      input.addEventListener('input', (e) => {
        const quantity = e.target.value;
        const productPrice = item.querySelector('.cost').innerText;
        const [currency, cost] = productPrice.split(' ');
        const finalPrice = cost * quantity;

        updateSiblingInput(item, quantity);

        item.querySelector('.total').innerText = `${currency} ${finalPrice}`;
        updateItemQuantity(item, quantity);
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

    const btnEndPurchase = document.getElementById('btn-end-purchase');

    document.querySelectorAll('.invalid-feedback').forEach((feedback) => {
      feedback.classList.add('d-none');
    });

    document.querySelectorAll('.form-control').forEach((input) => {
      input.classList.remove('is-invalid');
    });

    btnEndPurchase.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      checkValidation();
    });
  }
});
