export function showAlert(message, alertType) {
  const toAppend = `
  <div class="alert alert-${alertType}" role="alert">
    ${message}
  </div>`;

  document.querySelector('body').innerHTML += toAppend;
}
