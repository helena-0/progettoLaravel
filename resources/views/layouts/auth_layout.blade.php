<!DOCTYPE html>
<html lang="it">
<head>
    <title>@yield('title', 'Autenticazione - Feltrinelli')</title> 
    
    <link rel="stylesheet" href="{{ url('css/auth_layout.css') }}" />
    @yield('styles')
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
</head>
<body>
    <section id="body_sx"></section>
    <section id="body_dx">
        <div id="indietro">
            <img src="{{ url('immagini/freccia_rossa.png') }}">
            <a href="{{ url('home') }}">Torna al sito</a>
        </div> 
        
        <div id="reg">        
            @yield('auth_content')
        </div>
    </section>
</body>
</html>