export function showAlert(message, alertType) {
  const toAppend = `
  <div class="alert alert-${alertType} alert-dismissible fade show" role="alert" id="my-alert">
    ${message}
  </div>`;

  document.querySelector('main').innerHTML += toAppend;
}
