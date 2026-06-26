function onResponse(response){
    if(response.ok){
        return response.json();
    } 
    else{
        return null;
    }
}


//--------------------------------------------------------------------------------------------------------


function visualizzaPreferiti(){
    event.preventDefault();
    const pulsante=document.querySelector("#pannello-preferiti");
    if(pulsante.classList.contains("hidden"))
        pulsante.classList.remove("hidden");
    else
        pulsante.classList.add("hidden");
}

const pulsantePreferiti=document.querySelector("#preferiti");
pulsantePreferiti.addEventListener("click",visualizzaPreferiti);



function BottoneRosso(event){
    const bottone = event.currentTarget;
    const datiDaSpedire = new FormData(); 
 
    if(bottone.classList.contains("bottone-rosso")){
        bottone.classList.remove("bottone-rosso");
    } 
    else{
        bottone.classList.add("bottone-rosso");
    }

    if(bottone.dataset.idLibro){
        datiDaSpedire.append("id_libro", bottone.dataset.idLibro);
    } 
    else if(bottone.dataset.titolo){
        datiDaSpedire.append("titolo", bottone.dataset.titolo);
        datiDaSpedire.append("autore", bottone.dataset.autore || "Autore sconosciuto");
        datiDaSpedire.append("copertina", bottone.dataset.copertina);
        datiDaSpedire.append("prezzo", bottone.dataset.prezzo);
        datiDaSpedire.append("prezzo_sconto", bottone.dataset.prezzoSconto || "");
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;
    const opzioni = { method: "post", headers: {'X-CSRF-TOKEN': token}, body: datiDaSpedire };

    fetch(API_AGGIUNGI_PREFERITO, opzioni).then(onResponse).then(function(json) {
        if (!json) return;
        caricaPreferitiDalDB();
    });
}




function caricaPreferitiDalDB(){
    const flexPreferiti = document.querySelector("#sezionej");
    if(!flexPreferiti) 
        return;

    fetch(API_LEGGI_PREFERITI).then(onResponse).then(function(json) {
        flexPreferiti.innerHTML = ""; 

        for(let i = 0; i < json.length; i++){
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




function coloraCuoriNellaPagina(preferitiJson){
    const tuttiIBottoni = document.querySelectorAll(".pulsante-freccia");
    
    for(let i = 0; i < tuttiIBottoni.length; i++){
        const elemento = tuttiIBottoni[i];
        if(!elemento.classList.contains("destra") && !elemento.classList.contains("destra-ricerca")){
            
            elemento.classList.remove("bottone-rosso");
            
            const titoloCuore = elemento.dataset.titolo;
            const copertinaCuore = elemento.dataset.copertina; 
            
            for(let j = 0; j < preferitiJson.length; j++){
                if (preferitiJson[j].titolo === titoloCuore && preferitiJson[j].copertina === copertinaCuore){
                    elemento.classList.add("bottone-rosso");
                }
            }
        }
    }
}

//-------------------------------------------------------------------------------------------------------------------

function onJsonCarrello(json){
    if(!json) return;
    if(json.success === true){
        if(document.querySelector("#carrello")){
                caricaCarrelloAsincrono();
        }
    }
}


function aggiungiAlCarrello(event){
    const bottone = event.currentTarget;
    const dati_carrello = new FormData();

    if(bottone.classList.contains("bottone-rosso")){
        bottone.classList.remove("bottone-rosso");
    } 
    else{
        bottone.classList.add("bottone-rosso");
    }    

    if(bottone.dataset.idLibro){
        dati_carrello.append("id_libro", bottone.dataset.idLibro);
    } 
    else if(bottone.dataset.titolo){
        dati_carrello.append("titolo", bottone.dataset.titolo); 
        dati_carrello.append("autore", bottone.dataset.autore);
        dati_carrello.append("copertina", bottone.dataset.copertina);
        dati_carrello.append("prezzo", bottone.dataset.prezzo);
        dati_carrello.append("prezzo_sconto", bottone.dataset.prezzoSconto);
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;

    const opzioni = { method: "post", headers: {'X-CSRF-TOKEN': token}, body: dati_carrello };
    fetch(API_AGGIUNGI_CARRELLO, opzioni).then(onResponse).then(onJsonCarrello);
}



//-------------------------------------------------------------------------------------------------------------------


function onJson(json){
    const containerRisultati = document.querySelector("#risultati-ricerca");
    containerRisultati.classList.remove("hidden");

    const library = document.querySelector("#sezione-ricerca");
    library.innerHTML = "";
    
    const utenteLoggato = (document.querySelector("#loggin") === null);

    let num_results = json.num_found;
    if(num_results === 0){
        const divErrore = document.createElement("div");
        divErrore.textContent = "Nessun libro trovato su Open Library.";
        
        library.appendChild(divErrore);
        return;
    }

    if(num_results > 6) num_results = 6;

    for(let i = 0; i < num_results; i++){
        const doc = json.docs[i]
        const title = doc.title;
        
        let autore = "Autore sconosciuto";
        if(doc.author_name && doc.author_name.length > 0){
            autore = doc.author_name[0];
        }

        let cover_url = "immagini/copertina_mancante.jpg"; 
        if(doc.cover_i){
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

        if(utenteLoggato){
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

    if(utenteLoggato){
        fetch(API_LEGGI_CARRELLO).then(onResponse).then(function(carrelloJson) {
                const bottoniRicerca = document.querySelectorAll("#sezione-ricerca .destra-ricerca");
                for(let b = 0; b < bottoniRicerca.length; b++){
                    const btn = bottoniRicerca[b];
                    const titoloBtn = btn.dataset.titolo;
                    for(let c = 0; c < carrelloJson.length; c++){
                        if(carrelloJson[c].titolo === titoloBtn){
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

    const rest_url = API_OPENLIBRARY_URL + "?q="+ author_value;
    fetch(rest_url).then(onResponse).then(onJson);
}

const formRicercaLibri = document.querySelector("#ricerca");
if(formRicercaLibri){
    formRicercaLibri.addEventListener("submit", search);
}

caricaPreferitiDalDB();