<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrello;
use App\Models\Libro;
use App\Models\User;
use Illuminate\Support\Facades\Session;

class CarrelloController extends Controller{
    // Restituisce la lista dei libri nel carrello (Sostituisce api_leggi_carrello.php)
    public function leggi(){
        if(!Session::has('user_id')){
            return response()->json([]);
        }

        $userId = Session::get('user_id');
        $carrelloItems = Carrello::where('user_id', $userId)->get();
        
        $risultato = [];
        foreach($carrelloItems as $item){
            // Uso la relazione "belongsTo" per prendere i dati del libro
            $libro = $item->libro; 
            
            $risultato[] = [
                'libro_id' => $libro->id,
                'titolo' => $libro->titolo,
                'autore' => $libro->autore,
                'copertina' => $libro->copertina,
                'prezzo' => $libro->prezzo,
                'prezzo_sconto' => $libro->prezzo_sconto
            ];
        }

        return response()->json($risultato);
    }

    // Aggiunge o rimuove dal carrello (Sostituisce api_aggiungi_carrello.php)
    public function aggiungiRimuovi(Request $request){
        if(!Session::has('user_id')){
            return response()->json(['success' => false, 'error' => 'Non loggato']);
        }

        $userId = Session::get('user_id');
        $libroId = $request->id_libro;

        // Se è un libro cercato da API esterna, lo creiamo nel DB
        if(!$libroId && $request->has('titolo')){
            $libro = Libro::firstOrCreate(
                ['titolo' => $request->titolo, 'autore' => $request->autore],
                ['copertina' => $request->copertina, 'prezzo' => $request->prezzo,'prezzo_sconto' => $request->prezzo_sconto]
            );
            $libroId = $libro->id;
        }

        $esiste = Carrello::where('user_id', $userId)
            ->where('libro_id', $libroId)
            ->first();

       if($esiste){
            $esiste->delete();
            return response()->json(['success' => true, 'messaggio' => 'Rimosso dal carrello']);
        }
        else{
            $nuovo = new Carrello();
            $nuovo->user_id = $userId;
            $nuovo->libro_id = $libroId;
            $nuovo->save();
            
            return response()->json(['success' => true, 'messaggio' => 'Aggiunto al carrello']);
        }
    }
}