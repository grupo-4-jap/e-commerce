import { login } from './utils/loggingUser.js';
import { showAlert } from './utils/showAlert.js';

const loginForm = document.querySelector('form');
const userInput = document.getElementById('floatingInput');
const userPassword = document.getElementById('floatingPassword');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = userInput.value;
  const password = userPassword.value;

  if (username != '' && password != '') {
    await login({
      username: username,
      password: password,
    });
    location.href = 'index.html';
  } else {
    showAlert('Debe ingresar su usuario y contraseña', 'danger');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').style.backgroundColor = '#f8f9fa';
});
