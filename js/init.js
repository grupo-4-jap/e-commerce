import { getUserData, isLogged } from './utils/loggingUser.js';

const userDropdown = document.getElementById('loggeado');
const themeTogglerBtn = document.getElementById('theme-toggler');
const icon = themeTogglerBtn.children[0];
const page = document.querySelector('html');
const backgroundImage = document.querySelector('.jumbotron');
const album = document.getElementById('album');
const categoryBtn = document.querySelector('#btn-category');
const catAndProdButtons = document.querySelectorAll('.btn-light');

let showSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'block';
};

let hideSpinner = function () {
  document.getElementById('spinner-wrapper').style.display = 'none';
};

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
    userDropdown.innerHTML = `
    <button class="btn dropdown-toggle" style="color: rgba(255,255,255,.55);" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      Hola ${email}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a id="cart" class="dropdown-item" href="#">Mi carrito</a></li>
      <li><a id="profile" class="dropdown-item" href="#">Mi perfil</a></li>
      <li><a id="finish" class="dropdown-item" href="#">Cerrar sesión</a></li>
    </ul>
  `;
  }
};

function toggleTheme(event) {
  let currentTheme = localStorage.getItem('theme');

  if (event != undefined && event.type === 'click') {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  }

  const themeObject =
    currentTheme === 'dark'
      ? {
          theme: 'dark',
          iconSrc: './icons/sun-fill.svg',
          imageSrc: './img/cover_back_dark.png',
          bgColor: 'bg-dark',
          borderColor: 'border-secondary',
        }
      : {
          theme: 'light',
          iconSrc: './icons/moon-stars-fill.svg',
          imageSrc: './img/cover_back.png',
          bgColor: 'bg-light',
          borderColor: '',
        };

  let { theme, iconSrc, imageSrc, bgColor, borderColor } = themeObject;

  if (checkPage('index.html') || checkPage('')) {
    backgroundImage.style.backgroundImage = `url(${imageSrc})`;
    album.className = `album py-5 ${bgColor}`;
    categoryBtn.className = `btn ${bgColor} btn-lg btn-block`;
  }

  if (checkPage('categories.html') || checkPage('products.html')) {
    catAndProdButtons.forEach((button) => {
      button.className = `btn ${bgColor} ${borderColor}`;
    });
  }

  icon.src = iconSrc;
  page.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
}

function checkTheme() {
  toggleTheme();
}

function changeTheme(e) {
  toggleTheme(e);
}

document.addEventListener('DOMContentLoaded', () => {
  const isLog = isLogged();
  // console.log(`El usuario esta logeado? ${isLog}`);

  if (!isLog && !checkPage('login.html')) {
    location.href = 'login.html';
  } else if (isLog && checkPage('login.html')) {
    location.href = 'index.html';
  }

  createUserNav();
  checkTheme();
});

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

themeTogglerBtn.addEventListener('click', function (e) {
  changeTheme(e);
});
