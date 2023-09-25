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
    ].innerHTML = `<div class="nav-link dropdown" id="loggeado">
    <button class="btn dropdown-toggle" style="color: rgba(255,255,255,.55);" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      Hola ${email}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a id="cart" class="dropdown-item" href="#">Mi carrito</a></li>
      <li><a id="profile" class="dropdown-item" href="#">Mi perfil</a></li>
      <li><a id="finish" class="dropdown-item" href="#">Cerrar sesión</a></li>
    </ul>
  </div>`;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('cart').addEventListener('click', function () {
    window.location.href = 'cart.html';
  });
  document.getElementById('profile').addEventListener('click', function () {
    window.location.href = 'my-profile.html';
  });
  document.getElementById('finish').addEventListener('click', function () {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
  });
});
