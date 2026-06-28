function caricaCarrelloAsincrono() {
    const contenitore = document.querySelector("#carrello");
 
    if (contenitore) {
        fetch(API_LEGGI_CARRELLO).then(onResponse).then(onJsonLeggiCarrello);
    }
}


function onJsonLeggiCarrello(json) {
    const carrello = document.querySelector("#carrello");

    carrello.innerHTML = ""; 
    const titoloCarrello = document.createElement("h2");
    titoloCarrello.textContent = "Il mio carrello";
    carrello.appendChild(titoloCarrello);

    if (json.length === 0) {
       mostraMessaggioVuoto()
    }

    for (let i = 0; i < json.length; i++) {
        const libro = json[i];
        creaSchedaLibro(libro);               
    }
}

function mostraMessaggioVuoto() {
    const carrello = document.querySelector("#carrello");
    const testoVuoto = document.createElement("div");
    testoVuoto.textContent = "Il tuo carrello è vuoto. Aggiungi qualche libro!";
    carrello.appendChild(testoVuoto);
}



function creaSchedaLibro(libro) {
    const carrello = document.querySelector("#carrello");

    const article = document.createElement("article");
    article.classList.add("articolo_libro");

    const contenitore = document.createElement("div");
    contenitore.classList.add("contenitore_immagine");

    const immagine = document.createElement("img")
    immagine.src = libro.copertina; 

    const contenitore_descrizione = document.createElement("div");
    contenitore_descrizione.classList.add("contenitore_descrizione");

    const descrizione = document.createElement("div");
    descrizione.classList.add("descrizione"); 

    const titolo_libro = document.createElement("div");
    titolo_libro.classList.add("titolo");
    titolo_libro.textContent = libro.titolo;
    
    const autore_libro = document.createElement("div");
    autore_libro.classList.add("autore");
    autore_libro.textContent=libro.autore;
    

    const div_prezzo = document.createElement("div");
    div_prezzo.classList.add("divPrezzo");

    const prezzo_libro = document.createElement("div");
    prezzo_libro.classList.add("prezzo");
    prezzo_libro.textContent = libro.prezzo+" €"; 

    const prezzosconto_libro = document.createElement("div");
    prezzosconto_libro.classList.add("sconto");
    prezzosconto_libro.textContent = libro.prezzo_sconto+" €";

    const disponibile = document.createElement("div");
    disponibile.classList.add("disponibilita");
    disponibile.textContent = "Disponibilità immediata";

    const bottone_elimina=document.createElement("button");
    bottone_elimina.textContent="Rimuovi";
    bottone_elimina.classList.add("bottoneElimina");
    bottone_elimina.dataset.idLibro = libro.libro_id;
    bottone_elimina.addEventListener("click", rimuoviDalCarrello);

    carrello.appendChild(article);

    article.appendChild(contenitore);
    article.appendChild(contenitore_descrizione);

    contenitore_descrizione.appendChild(descrizione);
    contenitore_descrizione.appendChild(bottone_elimina);
    contenitore.appendChild(immagine);

    descrizione.appendChild(titolo_libro);
    descrizione.appendChild(autore_libro);
    descrizione.appendChild(div_prezzo);
    descrizione.appendChild(disponibile);

    div_prezzo.appendChild(prezzo_libro);
    div_prezzo.appendChild(prezzosconto_libro);
}


function rimuoviDalCarrello(event) {
    const bottone = event.currentTarget;
    const idLibro = bottone.dataset.idLibro; 
    
    const dati_carrello = new FormData();
    dati_carrello.append("id_libro", idLibro);


    const token = document.querySelector('meta[name="csrf-token"]').content;
    const opzioni = { method: "post", headers: {'X-CSRF-TOKEN': token}, body: dati_carrello };

    fetch(API_AGGIUNGI_CARRELLO, opzioni).then(onResponse).then(function(json) {
        if(json.success) {
            const divContenitoreDescrizione = bottone.parentNode;
            const articolo = divContenitoreDescrizione.parentNode;
                
            setTimeout(function() {
                articolo.remove();
                aggiornaStatoCarrello();
            }, 500);
        }
    });
}


function aggiornaStatoCarrello() {
    const carrello = document.querySelector("#carrello");
    const numeroLibri = carrello.querySelectorAll(".articolo_libro").length;

    if (numeroLibri === 0) {
        mostraMessaggioVuoto()
    }
}




caricaCarrelloAsincrono();