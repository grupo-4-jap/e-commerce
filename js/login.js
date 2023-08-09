// const loginForm = document.getElementById("login-form");
const loginForm = document.querySelector(".login");
const userInput = document.getElementById("floatingInput");
const userPassword = document.getElementById("floatingPassword");
const loginStatus = document.getElementById("login-status");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío del formulario

    const username = userInput.value;
    const password = userPassword.value;

    if (username != "" && password != "") {
        location.href = "/index.html";
    } else {
        alert("Debe ingresar su usuario y contraseña");
    }

    // Simulación de verificación de credenciales (reemplazar con lógica real)
    // if (username === "usuario" && password === "contraseña") {
    //     loginStatus.textContent = "Inicio de sesión exitoso";
    //     loginStatus.style.color = "green";
    // } else {
    //     loginStatus.textContent = "Credenciales incorrectas";
    //     loginStatus.style.color = "red";
    // }
});
