const formStatus = {};

function CheckNome(event){
    const input=event.currentTarget;
    formStatus.nome = input.value.length > 0;
    if(formStatus.nome){
        input.parentNode.classList.remove("errore");
    }
    else{
        input.parentNode.classList.add("errore");
    }
}

function CheckCognome(event){
    const input=event.currentTarget;
    formStatus.cognome = input.value.length > 0;
    if(formStatus.cognome){
        input.parentNode.classList.remove("errore");
    }
    else{
        input.parentNode.classList.add("errore");
    }
}

function jsonCheckEmail(json) {
    formStatus.email = !json.exists;
    if (formStatus.email) {
        document.querySelector("#div-email").classList.remove("errore");
    } else {
        document.querySelector("#div-email span").textContent = "Email già utilizzata";
        document.querySelector("#div-email").classList.add("errore");
    }
}

function fetchResponse(response) {
    if (!response.ok) return null;
    return response.json();
}

function checkEmail(event) {
    const emailInput = document.querySelector("#email");
    if(emailInput.value.length === 0) {
        document.querySelector("#div-email span").textContent = "Email non valida";
        document.querySelector("#div-email").classList.add("errore");
        formStatus.email = false;
    } else {
        fetch(CHECK_EMAIL_URL + "?q=" + encodeURIComponent(emailInput.value)).then(fetchResponse).then(jsonCheckEmail);
    }
}

function checkPassword(event) {
    const passwordInput = document.querySelector("#password");
    formStatus.password = passwordInput.value.length >= 8;
    if (formStatus.password) {
        document.querySelector("#div-password").classList.remove("errore");
    } else {
        document.querySelector("#div-password").classList.add("errore");
    }
}

function checkConfirmPassword(event) {
    const confirmPasswordInput = document.querySelector("#conferma_password");
    formStatus.confirmPassword = confirmPasswordInput.value === document.querySelector("#password").value;
    if (formStatus.confirmPassword) {
        document.querySelector("#div-conferma_password").classList.remove("errore");
    } else {
        document.querySelector("#div-conferma_password").classList.add("errore");
    }
}

function checkSignup(event) {
    if (!formStatus.nome || !formStatus.cognome || !formStatus.email || !formStatus.password || !formStatus.confirmPassword) {
        event.preventDefault();
    }
}

document.querySelector("#nome").addEventListener("blur", CheckNome);
document.querySelector("#cognome").addEventListener("blur", CheckCognome);
document.querySelector("#email").addEventListener("blur", checkEmail);
document.querySelector("#password").addEventListener("blur", checkPassword);
document.querySelector("#conferma_password").addEventListener("blur", checkConfirmPassword);
document.querySelector("#registrazione").addEventListener("submit", checkSignup);