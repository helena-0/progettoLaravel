function onResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

function onJsonLeggiCarrello(json) {
    const carrello = document.querySelector("#carrello");

    carrello.innerHTML = ""; 
    const titoloCarrello = document.createElement("h2");
    titoloCarrello.textContent = "Il mio carrello";
    carrello.appendChild(titoloCarrello);

    if (json.length === 0) {
        aggiornaStatoCarrello();
        return;
    }

    for (let i = 0; i < json.length; i++) {
        const libro = json[i];
        creaSchedaLibro(libro);               
    }
}

function rimuoviDalCarrello(event) {
    const bottone = event.currentTarget;
    const idLibro = bottone.dataset.idLibro; 
    
    const dati_carrello = new FormData();
    dati_carrello.append("id_libro", idLibro);

    fetch("api_aggiungi_carrello.php", { method: "post", body: dati_carrello })
        .then(onResponse).then(function(json) {
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
    prezzo_libro.textContent = libro.prezzo; 

    const prezzosconto_libro = document.createElement("div");
    prezzosconto_libro.classList.add("sconto");
    prezzosconto_libro.textContent = libro.prezzo_sconto;

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


function caricaCarrelloAsincrono() {
    const contenitore = document.querySelector("#carrello");
 
    if (contenitore) {
        fetch("api_leggi_carrello.php").then(onResponse).then(onJsonLeggiCarrello);
    }
}

caricaCarrelloAsincrono();

function aggiornaStatoCarrello() {
    const carrello = document.querySelector("#carrello");
    const numeroLibri = carrello.querySelectorAll(".articolo_libro").length;

    if (numeroLibri === 0) {
        carrello.innerHTML = ""; 

        const titoloCarrello = document.createElement("h2");
        titoloCarrello.textContent = "Il mio carrello";
        
        const testoVuoto = document.createElement("div");
        testoVuoto.textContent = "Il tuo carrello è vuoto. Aggiungi qualche libro!";

        carrello.appendChild(titoloCarrello);
        carrello.appendChild(testoVuoto);
    }
}


//----------------------------------------------------------------------------------------------



function BottoneRosso(event) {
    const bottone = event.currentTarget;
    const datiDaSpedire = new FormData(); 
 
    if (bottone.classList.contains("bottone-rosso")) {
        bottone.classList.remove("bottone-rosso");
    } else {
        bottone.classList.add("bottone-rosso");
    }

    if (bottone.dataset.idLibro) {
        datiDaSpedire.append("id_libro", bottone.dataset.idLibro);
    } else if (bottone.dataset.titolo) {
        datiDaSpedire.append("titolo", bottone.dataset.titolo);
        datiDaSpedire.append("autore", bottone.dataset.autore || "Autore sconosciuto");
        datiDaSpedire.append("copertina", bottone.dataset.copertina);
        datiDaSpedire.append("prezzo", bottone.dataset.prezzo);
        datiDaSpedire.append("prezzo_sconto", bottone.dataset.prezzoSconto || "");
    }

    const opzioni = { method: "post", body: datiDaSpedire };

    fetch("api_aggiungi_preferito.php", opzioni).then(onResponse).then(function(json) {
        if (!json) return;
        caricaPreferitiDalDB();
    });
}

function caricaPreferitiDalDB() {
    const flexPreferiti = document.querySelector("#sezionej");
    if (!flexPreferiti) return;

    fetch("api_leggi_preferiti.php").then(onResponse).then(function(json) {
        if (!json) return;
        flexPreferiti.innerHTML = ""; 

        for (let i = 0; i < json.length; i++) {
            const libro = json[i];
            const elemPreferito = document.createElement("article");
            elemPreferito.classList.add("libroj");

            const contenitoreImm = document.createElement("div");
            contenitoreImm.classList.add("contenitore-immaginej");
            const copertinaLibro = document.createElement("img");
            copertinaLibro.src = libro.copertina;
            contenitoreImm.appendChild(copertinaLibro);
            elemPreferito.appendChild(contenitoreImm);

            const descrizione = document.createElement("div");
            descrizione.classList.add("libro-descrizionej");
            const titolo = document.createElement("div");
            titolo.classList.add("titoloj");
            titolo.textContent = libro.titolo;
            const prezzo = document.createElement("div");
            prezzo.classList.add("sottotitoloj");
            prezzo.textContent = libro.prezzo;

            const btnRimuovi = document.createElement("a");
            btnRimuovi.textContent = "Rimuovi";
            btnRimuovi.classList.add("bottoneRimuovi");
            btnRimuovi.dataset.idLibro = libro.libro_id; 
            btnRimuovi.addEventListener("click", BottoneRosso); 

            descrizione.appendChild(titolo);
            descrizione.appendChild(prezzo);
            descrizione.appendChild(btnRimuovi);
            elemPreferito.appendChild(descrizione);
            flexPreferiti.appendChild(elemPreferito);
        }
        coloraCuoriNellaPagina(json);
    });
}

function coloraCuoriNellaPagina(preferitiJson) {
    const tuttiIBottoni = document.querySelectorAll(".pulsante-freccia");
    
    for (let i = 0; i < tuttiIBottoni.length; i++) {
        const elemento = tuttiIBottoni[i];
        if (!elemento.classList.contains("destra") && !elemento.classList.contains("destra-ricerca")) {
            
            elemento.classList.remove("bottone-rosso");
            
            const titoloCuore = elemento.dataset.titolo;
            const copertinaCuore = elemento.dataset.copertina; 
            
            for (let j = 0; j < preferitiJson.length; j++) {
                if (preferitiJson[j].titolo === titoloCuore && preferitiJson[j].copertina === copertinaCuore) {
                    elemento.classList.add("bottone-rosso");
                }
            }
        }
    }
}

function visualizzaPreferiti(event) {
    event.preventDefault();
    const pulsante = document.querySelector("#pannello-preferiti");
    if (pulsante.classList.contains("hidden"))
        pulsante.classList.remove("hidden");
    else
        pulsante.classList.add("hidden");
}

function onJsonCarrello(json) {
    if (!json) return;
    if (json.success === true) {
        caricaCarrelloAsincrono();
    }
}

function aggiungiAlCarrello(event) {
    const bottone = event.currentTarget;
    const dati_carrello = new FormData();

    if (bottone.classList.contains("bottone-rosso")) {
        bottone.classList.remove("bottone-rosso");
    } else {
        bottone.classList.add("bottone-rosso");
    }    

    if (bottone.dataset.idLibro) {
        dati_carrello.append("id_libro", bottone.dataset.idLibro);
    } else if (bottone.dataset.titolo) {
        dati_carrello.append("titolo", bottone.dataset.titolo); 
        dati_carrello.append("autore", bottone.dataset.autore);
        dati_carrello.append("copertina", bottone.dataset.copertina);
        dati_carrello.append("prezzo", bottone.dataset.prezzo);
        dati_carrello.append("prezzo_sconto", bottone.dataset.prezzoSconto);
    }

    const opzioni = { method: "post", body: dati_carrello };
    fetch("api_aggiungi_carrello.php", opzioni).then(onResponse).then(onJsonCarrello);
}

function onJson(json) {
    if (!json) return;
    const containerRisultati = document.querySelector("#risultati-ricerca");
    containerRisultati.classList.remove("hidden");

    const library = document.querySelector("#sezione-ricerca");
    library.innerHTML = "";

    let num_results = json.num_found;
    if (num_results === 0) {
        const divErrore = document.createElement("div");
        divErrore.textContent = "Nessun libro trovato su Open Library.";
        library.appendChild(divErrore);
        return;
    }

    if (num_results > 6) num_results = 6;

    for (let i = 0; i < num_results; i++) {
        const doc = json.docs[i];
        const title = doc.title;
        let autore = "Autore sconosciuto";
        if (doc.author_name && doc.author_name.length > 0) autore = doc.author_name[0];

        let cover_url = "immagini/copertina_mancante.jpg"; 
        if (doc.cover_i) cover_url = "https://covers.openlibrary.org/b/id/" + doc.cover_i + "-M.jpg";

        const prezzoFittizio = "15,00€";
        const prezzoScontoFittizio = "16,50€";
        
        const book = document.createElement("div");
        book.classList.add("libro-ricerca");
        const img = document.createElement("img");
        img.src = cover_url;
        
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-ricerca");
        const caption = document.createElement("div");
        caption.classList.add("descrizione-ricerca");

        const strongTitolo = document.createElement("strong");
        strongTitolo.textContent = title;
        const br = document.createElement("br");
        const spanAutore = document.createElement("span");
        spanAutore.textContent = "di " + autore;

        caption.appendChild(strongTitolo);
        caption.appendChild(br);
        caption.appendChild(spanAutore);
        infoDiv.appendChild(caption);

        const divBottoni = document.createElement("div");
        divBottoni.classList.add("bottoni-ricerca");

        const btnPreferiti = document.createElement("div");
        btnPreferiti.classList.add("pulsante-freccia"); 
        btnPreferiti.dataset.titolo = title;
        btnPreferiti.dataset.autore = autore;
        btnPreferiti.dataset.copertina = cover_url;
        btnPreferiti.dataset.prezzo = prezzoFittizio;
        btnPreferiti.dataset.prezzoSconto = prezzoScontoFittizio;
        const imgCuore = document.createElement("img");
        imgCuore.src = "immagini/favorite.png";
        btnPreferiti.appendChild(imgCuore);
        btnPreferiti.addEventListener("click", BottoneRosso);

        const btnCarrello = document.createElement("div");
        btnCarrello.classList.add("pulsante-freccia", "destra-ricerca"); 
        btnCarrello.dataset.titolo = title;
        btnCarrello.dataset.autore = autore;
        btnCarrello.dataset.copertina = cover_url;
        btnCarrello.dataset.prezzo = prezzoFittizio;
        btnCarrello.dataset.prezzoSconto = prezzoScontoFittizio;
        const imgCarrello = document.createElement("img");
        imgCarrello.src = "immagini/cart.png";
        btnCarrello.appendChild(imgCarrello);
        btnCarrello.addEventListener("click", aggiungiAlCarrello);

        divBottoni.appendChild(btnPreferiti);
        divBottoni.appendChild(btnCarrello);
        infoDiv.appendChild(divBottoni);
        
        book.appendChild(img);
        book.appendChild(infoDiv);
        library.appendChild(book);
    }

    fetch("api_leggi_carrello.php").then(onResponse).then(function(carrelloJson) {
        if (!carrelloJson) return;
        const bottoniRicerca = document.querySelectorAll("#sezione-ricerca .destra-ricerca");
        for (let b = 0; b < bottoniRicerca.length; b++) {
            const btn = bottoniRicerca[b];
            const titoloBtn = btn.dataset.titolo;
            for (let c = 0; c < carrelloJson.length; c++) {
                if (carrelloJson[c].titolo === titoloBtn) {
                    btn.classList.add("bottone-rosso");
                }
            }
        }
    });
    caricaPreferitiDalDB();
}

function search(event) {
    event.preventDefault();
    const author_input = document.querySelector("#ricerca .input-ricerca");
    const author_value = encodeURIComponent(author_input.value);

    if (!author_value) {
        const containerRisultati = document.querySelector("#risultati-ricerca");
        containerRisultati.classList.add("hidden"); 
        const library = document.querySelector("#sezione-ricerca");
        library.innerHTML = ""; 
        return; 
    }

    const rest_url = "api_openlibrary.php?q=" + author_value;
    fetch(rest_url).then(onResponse).then(onJson);
}

const pulsantePreferiti = document.querySelector("#preferiti");
if(pulsantePreferiti) pulsantePreferiti.addEventListener("click", visualizzaPreferiti);

const formRicercaLibri = document.querySelector("#ricerca");
if (formRicercaLibri) formRicercaLibri.addEventListener("submit", search);

caricaPreferitiDalDB();