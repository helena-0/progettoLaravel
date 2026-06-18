@extends('layouts.account_layout')

@section('page_styles')
    <link rel="stylesheet" href="{{ url('css/account.css') }}">
@endsection

@section('page_scripts')
    <script src="{{ url('js/account.js') }}" defer></script>
@endsection

@section('account_content')
    <section id="dati_dx">
        <h2>I miei dati</h2>
        <div>
            <article>
                <h4>Email</h4>
                <p>{{ $user->email }}</p>
            </article>
            <article>
                <h4>Nome e Cognome</h4>
                <p>{{ $user->nome }} {{ $user->cognome }}</p>
            </article>
        </div>
    </section>
    <section id="account">
        <h3>Collega i tuoi account social</h3>
        <article>
            <div class="icone">
                <img src="{{ url('immagini/cerchio-google-grigio.png') }}">
                <span>Google</span>
            </div>
            <div class="icone">
                <img src="{{ url('immagini/cerchio-paypall-grigio.png') }}">
                <span>PayPall</span>
            </div>
            <div class="icone">
                <img src="{{ url('immagini/cerchio-apple-grigio.png') }}">
                <span>Apple</span>
            </div>

        </article>
    </section>
    <section id="consensi">
        <h3>Consensi e privacy</h3>
        <div class="check">
            <img src="{{ url('immagini/check-grigia.png') }}">
            <div>
                Autorizzo i Contitolari ad inviare direttamente comunicazioni commerciali su prodotti e servizi dei 
                Contitolari, società del Gruppo Feltrinelli e partner commerciali, a mezzo di sistemi automatizzati via e-mail, 
                sms o simili e a mezzo del servizio postale, così come descritto all’art. 3 lett. e) dell’informativa privacy.
            </div>
        </div>
        <div id="check2">
            <div class="check">
                <img src="{{ url('immagini/check-grigia.png') }}">
                <div>
                    Comunicazione via Mail
                </div>
            </div>
            <div class="check">
                <img src="{{ url('immagini/check-grigia.png') }}"> 
                    <div>
                        Comunicazione via SMS
                    </div>
            </div>
            <div class="check">
                <img src="{{ url('immagini/check-grigia.png') }}">
                <div>
                    Comunicazione via WhatsApp
                </div>
            </div>
            <div class="check">
                <img src="{{ url('immagini/check-grigia.png') }}">
                <div>
                    Altre tipologie di comunicazioni (es. telefono, posta, ecc.)
                </div>
            </div>
        </div>
    </section>
    <section id="elimina">
        <div>
            <span>Vuoi cancellare il tuo account?</span>
            <button id="bottone_elimina">Procedi</button>
        </div>
    </section>
@endsection