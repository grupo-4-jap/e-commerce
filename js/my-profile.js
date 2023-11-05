import { getUserData, isLogged } from './utils/loggingUser.js';

const inputs = Array.from(document.querySelectorAll('input'));
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', (e) => {
  const userData = getUserData();

  if (userData && userData.email) {
    const emailInput = inputs.find((input) => input.name === 'email');
    emailInput.setAttribute('disabled', '');
    emailInput.value = userData.email;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedUserData = {};

    inputs.forEach((input) => {
      const property = input.name;
      updatedUserData[`${property}`] = input.value;
    });

    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  });
});
