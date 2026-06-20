
const formStatus = {};

function checkEmail() {
    const emailInput = document.querySelector("#email");
    
    formStatus.email = emailInput.value.length > 0;
    
    if (formStatus.email) {
        document.querySelector("#div-email").classList.remove("errore");
    } else {
        document.querySelector("#div-email").classList.add("errore");
    }
}

function checkPassword() {
    const passwordInput = document.querySelector("#password");
    
    formStatus.password = passwordInput.value.length > 0;
    
    if (formStatus.password) {
        document.querySelector("#div-password").classList.remove("errore");
    } else {
        document.querySelector("#div-password").classList.add("errore");
    }
}

function checkLogin(event) {

    checkEmail();
    checkPassword();

    if (!formStatus.email || !formStatus.password) {
        event.preventDefault();
    }
}

document.querySelector("#email").addEventListener("blur", checkEmail);
document.querySelector("#password").addEventListener("blur", checkPassword);
document.querySelector("#accesso").addEventListener("submit", checkLogin);