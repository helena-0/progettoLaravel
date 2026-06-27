<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro;
use App\Models\Preferito;
use Illuminate\Support\Facades\Session;

class PreferitiController extends Controller{
    public function leggi(){
        if(!Session::has('user_id')){
            return response()->json([]);
        }

        $userId = Session::get('user_id');
        $preferitiItems = Preferito::where('user_id', $userId)->get();
        
        $risultato = [];
        foreach($preferitiItems as $item){
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
                $libro->save(); 
            }
            $libroId = $libro->id;
        }

        if(!$libroId){
            return response()->json(['success' => false, 'error' => 'Dati mancanti']);
        }

        $esiste = Preferito::where('user_id', $userId)->where('libro_id', $libroId)->first();

        if($esiste){
            $esiste->delete();
            return response()->json(['success' => true, 'messaggio' => 'Rimosso dai preferiti']);
        } else {
            $nuovo = new Preferito();
            $nuovo->user_id = $userId;
            $nuovo->libro_id = $libroId;
            $nuovo->save();
            
            return response()->json(['success' => true, 'messaggio' => 'Aggiunto ai preferiti']);
        }
    }
}