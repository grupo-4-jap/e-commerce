const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const isLog = isLogged();
  console.log(`El usuario esta logeado? ${isLog}`);
  const locationPage = window.location.pathname
  console.log(locationPage)
  return
  
  if (!isLog && locationPage !== '/login.html') {
    location.href = '/login.html'
  } else if (isLog && locationPage === '/login.html') {
    alert('El usuario ya esta logeado, yendo a index...');
    location.href = '/index.html';
  }
});


function isLogged() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData !== null && userData !== undefined
}


// logea al usuario
function login(userData) {
  if (isLogged()) {
    console.log('El usuario ya esta logeado');
    return false;
  }

  if (userData === null) {
    console.log('user Data es nulo');
    return false;
  }

  if (!("email" in userData) || !("password" in userData)) {
    console.log('No existe el valor de email y contraseña en los datos del usuario');
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
    return null
  }
  return JSON.parse(localStorage.getItem('userData'));
}
