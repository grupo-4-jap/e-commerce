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

function isLogged() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData !== null && userData !== undefined;
}

// Logging user
function login(userData) {
  if (isLogged()) {
    // console.log('El usuario ya esta logeado');
    return false;
  }

  if (userData === null) {
    // console.log('user Data es nulo');
    return false;
  }

  if (!('email' in userData) || !('password' in userData)) {
    // console.log(
    // 'No existe el valor de email y contraseña en los datos del usuario'
    // );
    return false;
  }

  localStorage.setItem('userData', JSON.stringify(userData));
  return true;
}

function logout() {
  if (!isLogged()) {
    return false;
  }

  localStorage.removeItem('userData');
  return true;
}

function getUserData() {
  if (!isLogged()) {
    return null;
  }
  return JSON.parse(localStorage.getItem('userData'));
}

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
  const { email } = getUserData();
  navLinks[
    navLinks.length - 1
  ].innerHTML = `<span class="nav-link" id="loggeado">${email}</span>`;
};
