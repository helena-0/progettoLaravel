@extends('layouts.app')

@section('styles')
    <link rel="stylesheet" href="{{ url('css/account_layout.css') }}">
    @yield('page_styles')
@endsection

@section('scripts')
    @yield('page_scripts')
@endsection

@section('content')
<div id="corpo">
    <section id="dati">
        <div>I miei dati</div>
        <a href="#">Le mie carte di credito</a>
        <a href="#">Indirizzi</a>
        <a href="#">Ordini</a>
        <a href="{{ url('carrello') }}">Liste dei desideri</a> <a href="#">I miei eventi</a>
        <a href="#">CartaEffe</a>
        <a href="#">I miei Ebook e Audiolibri</a>
        <a href="#">Le mie recensioni</a>
        <a href="{{ url('logout') }}">Logout</a> </section>

        <div id="corpo_dx">
            @yield('account_content') 
        </div> 
</div>
@endsection