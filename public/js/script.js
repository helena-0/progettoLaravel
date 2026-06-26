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


// ------------------------------------------------------------------------------------------



function inizializzaHome() {
    const contenitoreHome = document.querySelector("#sezione-libri-dinamici");
    if (contenitoreHome) {
        fetch(API_LIBRI_URL).then(onResponse).then(onJsonCaricaCatalogo);
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
    fetch(API_LEGGI_CARRELLO).then(onResponse).then(function(json) {
        for (let i = 0; i < json.length; i++) {
            const idLibroSalvato = json[i].libro_id;
            const bottone = document.querySelector(".pulsante-freccia.destra[data-id-libro='" + idLibroSalvato + "']");
            if (bottone) {
                bottone.classList.add("bottone-rosso");
            }
        }
        });
}


inizializzaHome();



// ----------------------------------------------------------------------------------------------




function onJsonRanking(json) {
    const container = document.querySelector("#lista-ranking-film");
    container.innerHTML = "";

    const movies = json.results;

    if (!movies || movies.length === 0) {
        container.textContent = "Nessun film in classifica al momento.";
        return;
    }

    let maxFilm = movies.length;
    if (maxFilm > 5) maxFilm = 5;

    for (let i = 0; i < maxFilm; i++) {
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
    
    fetch(API_FILM_URL).then(onResponse).then(onJsonRanking);
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

    const url = API_FILM_URL+ "?q=" + testoCercato;
    fetch(url).then(onResponse).then(onJsonRicerca);
}

const formRicerca = document.querySelector("#form-ricerca-film");
formRicerca.addEventListener("submit", cercaFilmTramiteForm);

