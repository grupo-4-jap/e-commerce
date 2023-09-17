import { getUserData, isLogged } from './utils/loggingUser.js';

const navLinks = document.querySelectorAll('.nav-item');

let showSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'block';
};

let hideSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  const isLog = isLogged();
  // console.log(`El usuario esta logeado? ${isLog}`);

  if (!isLog && !checkPage('login.html')) {
    location.href = 'login.html';
  } else if (isLog && checkPage('login.html')) {
    location.href = 'index.html';
  }
  createUserNav();
});

function getCurrentPage() {
  const pathname = window.location.pathname;
  const split = pathname.split('/');
  return split[split.length - 1];
}

function checkPage(target) {
  return getCurrentPage() === target;
}

// Creates the UI User Nav
const createUserNav = () => {
  if (getUserData() != null) {
    const { email } = getUserData();
    navLinks[
      navLinks.length - 1
    ].innerHTML = `<span class="nav-link" id="loggeado">${email}</span>`;
  }
};
