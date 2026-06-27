function onJsonEliminaAccount(json) {
    if (json.success === true) {
        const boxElimina = document.querySelector("#boxElimina");
        
        boxElimina.innerHTML = ''; 

        const messaggio = document.createElement('span');
        messaggio.textContent = "Account eliminato con successo!";
        messaggio.classList.add("scrittaElimina");

        
        const divLink = document.createElement('div');
        divLink.classList.add("contenitore-link")

        const linkHome = document.createElement('a');
        linkHome.href = BASE_URL + "/home";
        linkHome.textContent = "Torna alla Home";
        
        linkHome.classList.add("bottoneRitorno");

        divLink.appendChild(linkHome);
        boxElimina.appendChild(messaggio);
        boxElimina.appendChild(divLink);

    } else {
        alert("Errore: " + json.error);
    }
}

function onResponseEliminaAccount(response) {
    return response.json();
}

function eliminaAccount(event) {
    fetch(API_ELIMINA_ACCOUNT_URL).then(onResponseEliminaAccount).then(onJsonEliminaAccount);
}

const btnEliminaAccount = document.querySelector("#bottone_conferma");
if (btnEliminaAccount) {
    btnEliminaAccount.addEventListener("click", eliminaAccount);
}



function onJsonDatiUtente(json){
    if (!json.error){
        document.querySelector("#account_email").textContent = json.email;
        document.querySelector("#account_dati").textContent = json.nome + " " + json.cognome;
    }
}

function caricaDatiUtente() {
    fetch(API_UTENTE_URL).then(function(response) {return response.json();}).then(onJsonDatiUtente);
}

caricaDatiUtente();




function modale(){
    const vistaModale=document.querySelector("#modal-view");
    document.body.classList.add("no-scroll");
    vistaModale.classList.remove("hidden");
}

const accesso=document.querySelector("#bottone_elimina");
if(accesso){
    accesso.addEventListener("click", modale);
}

function chiudereModale(event){

    event.preventDefault();

    document.body.classList.remove("no-scroll");
    const vistaModale=document.querySelector("#modal-view");
    vistaModale.classList.add("hidden");
}

const annulla=document.querySelector("#boxElimina a");
annulla.addEventListener("click",chiudereModale);

