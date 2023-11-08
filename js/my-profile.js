import { getUserData, isLogged } from './utils/loggingUser.js';

// const firstNameInput = document.getElementById('first-name');
// const secondNameInput = document.getElementById('second-name');
// const firstLastnameInput = document.getElementById('first-lastname');
// const secondLastnameInput = document.getElementById('second-lastname');
const emailInput = document.getElementById('my-profile-email');
// const phoneInput = document.getElementById('phone');
// const saveChangesButton = document.getElementById('save-changes-btn');

document.addEventListener('DOMContentLoaded', function () {
  const userData = getUserData();

  if (userData && userData.email) {
    emailInput.value = userData.email;
  }
});

// function saveChanges() {

//   const updatedUserData = {
//     email: emailInput.value,
//     firstName: firstNameInput.value,
//     secondName: secondNameInput.value,
//     firstLastname: firstLastnameInput.value,
//     secondLastname: secondLastnameInput.value,
//     phone: phoneInput.value,
//   };

//   localStorage.setItem('userData', JSON.stringify(updatedUserData));
// }

const profilePictureInput = document.getElementById('profile-picture');
const previewImage = document.getElementById('preview-image');

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

document.addEventListener('DOMContentLoaded', () => {
  const profileImage = localStorage.getItem('img') ?? false;

  profileImage
    ? (previewImage.src = profileImage)
    : (previewImage.src = './icons/profile.svg');
});
