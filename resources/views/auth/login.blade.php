@extends('layouts.auth_layout')

@section('title', 'Accedi - Feltrinelli')

@section('styles')
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
@endsection

@section('scripts')
    <script src="{{ url('js/login.js') }}" defer></script>
@endsection

@section('auth_content')
    <h1>Accedi</h1>
    
    @error('login')
        <div class="errore-login">
            {{ $message }}
        </div>
    @enderror

    <form id="accesso" name="login" method="post" action="{{ url('login') }}">
        @csrf 
        
        <div id="div-email" class="@error('email') errore @enderror">
            <label for="email">E-mail</label>
            <input type='text' name='email' id="email" value="{{ old('email', $email_salvata) }}">
            <span>@error('email') {{ $message }} @enderror</span>
        </div>
        
        <div id="div-password" class="@error('password') errore @enderror">
            <label for="password">Password</label>
            <input type='password' name='password' id="password">
            <span>@error('password') {{ $message }} @enderror</span>
        </div>

        <div id="bottone-reg">
            <input type='submit' value="Entra" id="submit">
        </div>
        
        <div id="registrazione">
            Non hai un account? <a href="{{ url('register') }}">Registrati</a>
        </div>
    </form>
@endsection