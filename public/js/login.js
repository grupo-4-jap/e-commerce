import { login } from './utils/loggingUser.js';

const loginForm = document.querySelector('.login');
const userInput = document.getElementById('floatingInput');
const userPassword = document.getElementById('floatingPassword');

loginForm.addEventListener('submit', (e) => {
  e.stopPropagation();
  e.preventDefault();

  const username = userInput.value;
  const password = userPassword.value;

  if (username != '' && password != '') {
    login({
      email: username,
      password: password,
    });
    location.href = 'index.html';
  } else {
    alert('Debe ingresar su usuario y contraseña');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('body').style.backgroundColor = '#f8f9fa';
});
