@extends('layouts.auth_layout')

@section('title', 'Registrati - Feltrinelli')

@section('styles')
    <link rel="stylesheet" href="{{ url('css/registrazione.css') }}">
@endsection

@section('auth_content')
    <h1>Crea un account</h1>
    
    <form id="registrazione" name="registrazione" method="post" action="{{ url('register') }}">
        @csrf 
        
        <div id="div-nome" class="@error('nome') errore @enderror">
            <label for="nome">Nome</label>
            <input type='text' name='nome' id="nome" value="{{ old('nome') }}">
            <span>@error('nome') {{ $message }} @enderror</span>
        </div>

        <div id="div-cognome" class="@error('cognome') errore @enderror">
            <label for="cognome">Cognome</label>
            <input type='text' name='cognome' id="cognome" value="{{ old('cognome') }}">
            <span>@error('cognome') {{ $message }} @enderror</span>
        </div>

        <div id="div-email" class="@error('email') errore @enderror">
            <label for="email">E-mail</label>
            <input type='text' name='email' id="email" value="{{ old('email') }}">
            <span>@error('email') {{ $message }} @enderror</span>
        </div>
        
        <div id="div-password" class="@error('password') errore @enderror">
            <label for="password">Password</label>
            <input type='password' name='password' id="password">
            <span>@error('password') {{ $message }} @enderror</span>
        </div>
        
        <div id="div-conferma_password" class="@error('password_confirmation') errore @enderror">
            <label for="conferma_password">Conferma Password</label>
            <input type='password' name='password_confirmation' id="conferma_password">
            <span>@error('password_confirmation') {{ $message }} @enderror</span>
        </div>

        <div id="div-ricorda" class="@error('allow') errore @enderror">
            <label for="reg_ricordami">Ricordami</label>
            <input type='checkbox' name='allow' id="reg_ricordami" value="1" @if(old('allow')) checked @endif>
            
            <span>@error('allow') {{ $message }} @enderror</span>
        </div>

        <div id="bottone-reg">
            <input type='submit' value="Registrati" id="submit">
        </div>
    </form>
@endsection