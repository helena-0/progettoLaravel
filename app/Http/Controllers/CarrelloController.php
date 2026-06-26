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

        if (!$libroId && $request->has('titolo')) {
            $libro = Libro::where('titolo', $request->titolo)
                ->where('autore', $request->autore)
                ->first();

            if (!$libro) {
                $libro = new Libro();
                $libro->titolo = $request->titolo;
                $libro->autore = $request->autore;
                $libro->copertina = $request->copertina;
                $libro->prezzo = $request->prezzo;
                $libro->prezzo_sconto = $request->prezzo_sconto;
                $libro->save(); // Slide 81
            }
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