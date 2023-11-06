import { getUserData } from './utils/loggingUser.js';

const inputs = Array.from(document.querySelectorAll('input'));
const form = document.querySelector('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('my-profile-email');
const nameFeedback = document.getElementById('name-feedback');
const lastNameFeedback = document.getElementById('last-name-feedback');
const emailFeedback = document.getElementById('email-feedback');

function checkUserValidation() {
  if (firstName.value === '') {
    firstName.classList.add('is-invalid');
    nameFeedback.classList.remove('d-none');
  } else {
    firstName.classList.remove('is-invalid');
    nameFeedback.classList.add('d-none');
  }

  if (lastName.value === '') {
    lastName.classList.add('is-invalid');
    lastNameFeedback.classList.remove('d-none');
  } else {
    lastName.classList.remove('is-invalid');
    lastNameFeedback.classList.add('d-none');
  }

  if (email.value === '') {
    email.classList.add('is-invalid');
    emailFeedback.classList.remove('d-none');
  } else {
    email.classList.remove('is-invalid');
    emailFeedback.classList.add('d-none');
  }
}

function isValidated() {
  return inputs
    .filter(
      (input) =>
        input.id === 'first-name' ||
        input.id === 'lastname' ||
        input.id === 'my-profile-email'
    )
    .every((input) => input.value !== '');
}

document.addEventListener('DOMContentLoaded', (e) => {
  const userData = getUserData();

  if (userData && userData.email) {
    const emailInput = inputs.find((input) => input.name === 'email');
    emailInput.value = userData.email;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    checkUserValidation();

    if (isValidated()) {
      const updatedUserData = {};

      inputs.forEach((input) => {
        const property = input.name;
        updatedUserData[`${property}`] = input.value;
      });

      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
  });
});
