// Logging user
async function login(userData) {
  // if (isLogged()) return false;

  if (userData === null) return false;

  if (!('username' in userData)) return false;

  const { accessToken } = await fetch('http://localhost:3000/login', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify(userData),
  }).then((res) => res.json());

  delete userData.password;
  userData.accessToken = accessToken;

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
