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

function isLogged() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData !== null && userData !== undefined;
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

export { getUserData, isLogged, login };
