function onResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

const FOTO_BANNER=[
    "immagini/banner1.jpg",
    "immagini/banner2.jpg",
    "immagini/banner3.jpg",
    "immagini/banner4.jpg"
];

let contatore=0

function OnClickDX(){

    contatore++;

    if(contatore===4){
        contatore=0;
    }

    const FotoSrc=FOTO_BANNER[contatore];

    const Immagine=document.querySelector("#banner img");
    Immagine.src=FotoSrc;

}

function OnClickSX(){

    contatore--;

    if(contatore===-1){
        contatore=3;
    }
    
    const FotoSrc=FOTO_BANNER[contatore];

    const Immagine=document.querySelector("#banner img");
    Immagine.src=FotoSrc;

}
const scorrisx_banner=document.querySelector("#banner .sinistra");
scorrisx_banner.addEventListener("click", OnClickSX);

const scorridx_banner=document.querySelector("#banner .destra");
scorridx_banner.addEventListener("click", OnClickDX);

//-------------------------------------------------------------------------------------

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

    const opzioni = { 
        method: "post", 
        body: datiDaSpedire 
    };

    fetch("api_aggiungi_preferito.php", opzioni).then(onResponse).then(function(json) {
        caricaPreferitiDalDB();
    });
}

function caricaPreferitiDalDB() {
    const flexPreferiti = document.querySelector("#sezionej");
    if (!flexPreferiti) return;

    fetch("api_leggi_preferiti.php").then(onResponse).then(function(json) {
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


// ------------------------------------------------------------------------------------------



function inizializzaHome() {
    const contenitoreHome = document.querySelector("#sezione-libri-dinamici");
    if (contenitoreHome) {
        fetch("api_libri.php").then(onResponse).then(onJsonCaricaCatalogo);
    }
}

function onJsonCaricaCatalogo(json) {
    const contenitoreHome = document.querySelector("#sezione-libri-dinamici");
    contenitoreHome.innerHTML = ""; 

    const utenteLoggato = (document.querySelector("#loggin") === null);

    let maxLibri = json.length;
    if (maxLibri > 5) maxLibri = 5;

    for (let i = 0; i < maxLibri; i++) {
        const libro = json[i];
        const article = document.createElement("article");
        article.classList.add("libro");
        
        if (i === 2) article.id = "tre";
        if (i === 3) article.id = "due";
        if (i === 4) article.id = "uno";

        const contenitoreImmagine = document.createElement("div");
        contenitoreImmagine.classList.add("contenitore-immagine");

        const immagine = document.createElement("img");
        immagine.classList.add("copertina");
        immagine.src = libro.copertina;
        contenitoreImmagine.appendChild(immagine);
        
        const divInternoBottoni = document.createElement("div");

        if (utenteLoggato) {
            const btnPreferiti = document.createElement("div");
            btnPreferiti.classList.add("pulsante-freccia", "sinistra");
            btnPreferiti.dataset.idLibro = libro.id; 
            btnPreferiti.dataset.copertina = libro.copertina;
            btnPreferiti.dataset.titolo = libro.titolo;
            btnPreferiti.dataset.prezzo = libro.prezzo;
            
            const imgCuore = document.createElement("img");
            imgCuore.src = "immagini/favorite.png";
            btnPreferiti.appendChild(imgCuore);
            btnPreferiti.addEventListener("click", BottoneRosso); 
            
            const btnCarrello = document.createElement("div");
            btnCarrello.classList.add("pulsante-freccia", "destra"); 
            btnCarrello.dataset.idLibro = libro.id; 
            
            const imgCarrello = document.createElement("img");
            imgCarrello.src = "immagini/cart.png";
            btnCarrello.appendChild(imgCarrello);
            btnCarrello.addEventListener("click", aggiungiAlCarrello); 

            divInternoBottoni.appendChild(btnPreferiti);
            divInternoBottoni.appendChild(btnCarrello);
        }
        contenitoreImmagine.appendChild(divInternoBottoni);

        const libroDescrizione = document.createElement("div");
        libroDescrizione.classList.add("libro-descrizione");

        const divTitoloAutore = document.createElement("div");
        
        const titolo = document.createElement("div");
        titolo.classList.add("titolo");
        const spanTitolo = document.createElement("span");
        spanTitolo.textContent = libro.titolo;
        titolo.appendChild(spanTitolo);

        const sottotitolo = document.createElement("div");
        sottotitolo.classList.add("sottotitolo");        
        const spanDi = document.createElement("span");
        spanDi.textContent = "di ";      
        const spanAutore = document.createElement("span");
        spanAutore.textContent = libro.autore;
        
        sottotitolo.appendChild(spanDi);
        sottotitolo.appendChild(spanAutore);

        divTitoloAutore.appendChild(titolo);
        divTitoloAutore.appendChild(sottotitolo);

        const divStelle = document.createElement("div");
        divStelle.classList.add("stelle");
        const imgStelle = document.createElement("img");
        imgStelle.src = "immagini/cinque-stelle-grigio.png";
        divStelle.appendChild(imgStelle);

        const divPrezzo = document.createElement("div");
        divPrezzo.classList.add("prezzo");
        
        const spanSconto = document.createElement("span");
        spanSconto.classList.add("sconto");
        spanSconto.textContent = libro.prezzo;

        const spanPrezzoPieno = document.createElement("span");
        spanPrezzoPieno.classList.add("prezzo-pieno");
        spanPrezzoPieno.textContent = libro.prezzo_sconto;

        divPrezzo.appendChild(spanSconto);
        divPrezzo.appendChild(spanPrezzoPieno);

        libroDescrizione.appendChild(divTitoloAutore);
        libroDescrizione.appendChild(divStelle);
        libroDescrizione.appendChild(divPrezzo);

        article.appendChild(contenitoreImmagine);
        article.appendChild(libroDescrizione);
        contenitoreHome.appendChild(article);
    }

    if (utenteLoggato) {
        ripristinaStatoCarrelloHome();
        caricaPreferitiDalDB();
    }
}
// ------------------------------------------------------------------------------------------

function ripristinaStatoCarrelloHome() {
    fetch("api_leggi_carrello.php").then(onResponse).then(function(json) {
        for (let i = 0; i < json.length; i++) {
            const idLibroSalvato = json[i].libro_id;
            const bottone = document.querySelector(".pulsante-freccia.destra[data-id-libro='" + idLibroSalvato + "']");
            if (bottone) {
                bottone.classList.add("bottone-rosso");
            }
        }
        });
}

function onJsonCarrello(json) {
    if (json.success === true) {
        console.log("Successo: " + json.messaggio);
    } else {
        console.log("Errore: " + json.error);
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

inizializzaHome();



// ----------------------------------------------------------------------------------------------



function visualizzaPreferiti(){
    event.preventDefault();
    const pulsante=document.querySelector("#pannello-preferiti");
    if(pulsante.classList.contains("hidden"))
        pulsante.classList.remove("hidden");
    else
        pulsante.classList.add("hidden");
}

const pulsantePreferiti=document.querySelector("#preferiti")
pulsantePreferiti.addEventListener("click",visualizzaPreferiti)


//--------------------------------------------------------------------------------------------------------


function onJson(json) {
    const containerRisultati = document.querySelector("#risultati-ricerca");
    containerRisultati.classList.remove("hidden");

    const library = document.querySelector("#sezione-ricerca");
    library.innerHTML = "";
    
    const utenteLoggato = (document.querySelector("#loggin") === null);

    let num_results = json.num_found;
    if (num_results === 0) {
        const divErrore = document.createElement("div");
        divErrore.textContent = "Nessun libro trovato su Open Library.";
        
        library.appendChild(divErrore);
        return;
    }

    if (num_results > 6) num_results = 6;

    for (let i = 0; i < num_results; i++) {
        const doc = json.docs[i]
        const title = doc.title;
        
        let autore = "Autore sconosciuto";
        if (doc.author_name && doc.author_name.length > 0) {
            autore = doc.author_name[0];
        }

        let cover_url = "immagini/copertina_mancante.jpg"; 
        if (doc.cover_i) {
            cover_url = "https://covers.openlibrary.org/b/id/" + doc.cover_i + "-M.jpg";
        }

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

        if (utenteLoggato) {
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
        }
        
        book.appendChild(img);
        book.appendChild(infoDiv);
        library.appendChild(book);
    }

    if (utenteLoggato) {
        fetch("api_leggi_carrello.php").then(onResponse).then(function(carrelloJson) {
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
}

function search(event) {
    event.preventDefault();
    const author_input = document.querySelector(".barra-ricerca input");
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

const formRicercaLibri = document.querySelector("#ricerca");
if (formRicercaLibri) {
    formRicercaLibri.addEventListener("submit", search);
}


function onJsonRanking(json) {
    const container = document.querySelector("#lista-ranking-film");
    container.innerHTML = "";

    const movies = json.results;
    for (let i = 0; i < 5; i++) {
        const movieData = movies[i];
        const movieArticle = document.createElement("article");
        movieArticle.classList.add("libro"); 

        const posterPath = "https://image.tmdb.org/t/p/w500" + movieData.poster_path;
        const imgCont = document.createElement("div");
        imgCont.classList.add("contenitore-immagine");
        
        const img = document.createElement("img");
        img.src = posterPath;
        imgCont.appendChild(img);

        const desc = document.createElement("div");
        desc.classList.add("libro-descrizione");
        
        const title = document.createElement("div");
        title.classList.add("titolo");
        title.textContent = movieData.title;
        
        const date = document.createElement("div");
        date.classList.add("sottotitolo");
        date.textContent = "Uscita: " + movieData.release_date;

        desc.appendChild(title);
        desc.appendChild(date);
        
        movieArticle.appendChild(imgCont);
        movieArticle.appendChild(desc);
        
        container.appendChild(movieArticle);
    }
}

function aggiornaClassificaFilm() {
    
    fetch("api_film.php").then(onResponse).then(onJsonRanking);
}
aggiornaClassificaFilm();


function onJsonRicerca(json) {
    console.log("Risultati ricerca:", json);
    
    const contenitoreRisultato = document.querySelector("#risultato-ricerca");
    contenitoreRisultato.innerHTML = "";

    if (json.results.length === 0) {
        contenitoreRisultato.textContent = "Nessun film trovato con questo titolo.";
        return;
    }

    const filmTrovato = json.results[0];
    const schedaFilm = document.createElement("div");
    schedaFilm.classList.add("scheda-film");

    const titolo = document.createElement("h4");
    titolo.classList.add("titolo-film");
    titolo.textContent = filmTrovato.title;

    const trama = document.createElement("p");
    trama.classList.add("trama-film");
    
    if (filmTrovato.overview !== "") {
        trama.textContent = filmTrovato.overview;
    } else {
        trama.textContent = "Trama non disponibile in italiano per questo film.";
    }

    schedaFilm.appendChild(titolo);
    schedaFilm.appendChild(trama);
    contenitoreRisultato.appendChild(schedaFilm);
}

function cercaFilmTramiteForm(event) {
    event.preventDefault();
    const inputRicerca = document.querySelector("#layout-film .input-ricerca");
    const testoCercato = encodeURIComponent(inputRicerca.value);

    if (!testoCercato){
        const contenitoreRisultato = document.querySelector("#risultato-ricerca");
        contenitoreRisultato.innerHTML = "";
        return;
    }

    const url = "api_film.php?q=" + testoCercato;
    fetch(url).then(onResponse).then(onJsonRicerca);
}

const formRicerca = document.querySelector("#form-ricerca-film");
formRicerca.addEventListener("submit", cercaFilmTramiteForm);
