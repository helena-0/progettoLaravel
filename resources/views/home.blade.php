@extends('layouts.app')

@section('scripts')
    <script>
        const SEARCH_URL = "{{ url('api/search') }}";
        const CARRELLO_URL = "{{ url('api/carrello') }}";
    </script>
    <script src="{{ url('js/script.js') }}" defer></script>
@endsection

@section('content')

<div id="banner">
    <img src="{{ url('immagini/banner1.jpg') }}">
    <div class="pulsante-freccia sinistra">
        <
    </div>

    <div class="pulsante-freccia destra">
        >
    </div>
</div>

<section id="blocco-classifica">
    <h2>La Classifica del giorno</h2>
    <div id="classifica-categorie">
        <div id="categoria-rossa">LIBRI</div>
        <div class="bordo">FILM</div>
        <div class="bordo">MUSICA</div>
        <div class="bordo">GIOCHI</div>
    </div>
        <div class="sezione">
            <article id="primo-posto">
                <div id="numero-uno">1°</div>
                <div id="primo-posto-sfondo">
                    <div class="contenitore-immagine">
                        <img src="{{ url('immagini/libro1.jpg') }}">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">1</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo">Io sono Adele</div>
                            <div class="sottotitolo">di <span>Csaba dalla Zorza</span></div>
                        </div>
                        <img src="{{ url('immagini/cinque-stelle-grigio2.png') }}" id="stelle3">
                        <img src="{{ url('immagini/cinque-stelle.png') }}" class="stelle2">
                        <div class="sottotitolo">Marsilio, 2026</div>
                    </div>
                </div>
            </article>
            <div>
                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="{{ url('immagini/libro2.jpg') }}">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">2</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Saggio sulla lucidità</span></div>
                            <div class="sottotitolo">di <span>José Saramago</span></div>
                        </div>
                        <div class="stelle">
                            <img src="{{ url('immagini/cinque-stelle.png') }}">
                            <span>(2)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="{{ url('immagini/libro3.jpg') }}">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">3</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>La morte di Ivan Il'ic</span></div>
                            <div class="sottotitolo">di <span>Lev Tolstoj</span></div>
                        </div>
                        <div class="stelle">
                            <img src="{{ url('immagini/cinque-stelle.png') }}">
                            <span>(4)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="{{ url('immagini/libro4.jpg') }}">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">4</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Il giocatore</span></div>
                            <div class="sottotitolo">di <span>Fedor Dostoevskij</span></div>
                        </div>
                        <div class="stelle">
                            <img src="{{ url('immagini/cinque-stelle.png') }}">
                            <span>(3)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>

                <article class="libro">
                    <div class="contenitore-immagine">
                        <img src="{{ url('immagini/libro5.jpg') }}">
                        <div class="overlay"></div>
                    </div>
                    <div class="numero-classifica">5</div>
                    <div class="libro-descrizione">
                        <div>
                            <div class="titolo"><span>Le origini del male</span></div>
                            <div class="sottotitolo">di <span>You-jeong Jeong</span></div>
                        </div>
                        <div class="stelle">
                            <img src="{{ url('immagini/cinque-stelle.png') }}">
                            <span>(3)</span>
                        </div>
                        <div class="sottotitolo">Feltrinelli, 2026</div>
                    </div>
                </article>
            </div>
        </div>
        <div class="categorie">
            <div><span>I libri più letti</span></div>
            <div class="bordo"><span>I film più visti</span></div>
            <div class="bordo"><span>I CD più ascoltati</span></div>
            <div class="bordo"><span>I CD più ascoltati</span></div>
        </div>
    </section>

    <section id="blocco-novita">
        <h2>Novità da non perdere</h2>       
        
        <div class="sezione" id="sezione-libri-dinamici">
            </div>  
        
        <div class="categorie">
            <div><span>Novità con consegna gratis</span></div>
            <div class="bordo"><span>In prenotazione</span></div>
            <div class="bordo"><span>Vai al mondo dei libri</span></div>
        </div>      
    </section>

    <section id="layout-film">  
        <div id="riga-film">
            <h2>Film più visti al cinema</h2>
            <div id="lista-ranking-film" class="sezione"></div>
        </div>
        <div id="riga-ricerca">
            <div id="ricerca-film">
                <form id="form-ricerca-film">
                    <div class="barra-ricerca">
                        <input type="text" placeholder="Cerca trama film..." class="input-ricerca">
                    </div>
                    <button type="submit">Cerca</button>
                </form>
                <div id="risultato-ricerca"></div>
            </div>
        </div>
    </section>
@endsection