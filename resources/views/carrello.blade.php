@extends('layouts.account_layout')

@section('page_styles')
    <link rel="stylesheet" href="{{ url('css/carrello.css') }}">
@endsection

@section('page_scripts')
    <script src="{{ url('js/carrello.js') }}" defer></script>
@endsection

@section('account_content')
    <section id="carrello">
        <h2>Il mio carrello</h2>           
    </section>
@endsection