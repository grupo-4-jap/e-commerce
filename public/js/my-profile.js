import { getUserData } from './utils/loggingUser.js';

const inputs = Array.from(document.querySelectorAll('input')).filter(
  (input) => input.name !== 'image-loader'
);
const form = document.querySelector('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('my-profile-email');
const nameFeedback = document.getElementById('name-feedback');
const lastNameFeedback = document.getElementById('last-name-feedback');
const emailFeedback = document.getElementById('email-feedback');
const profilePictureInput = document.getElementById('profile-picture');
const previewImage = document.getElementById('preview-image');

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

  if (userData && userData.username) {
    const emailInput = inputs.find((input) => input.name === 'email');
    emailInput.value = userData.username;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    checkUserValidation();

    if (isValidated()) {
      const updatedUserData = new Object();

      inputs.forEach((input) => {
        const property = input.name;
        updatedUserData[`${property}`] = input.value;
      });

      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
  });

  profilePictureInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        previewImage.src = event.target.result;
        previewImage.style.display = 'block';
      };

      reader.addEventListener('load', () => {
        localStorage.setItem('img', reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  const profileImage = localStorage.getItem('img') ?? false;

  profileImage
    ? (previewImage.src = profileImage)
    : (previewImage.src = './icons/profile.svg');
});
