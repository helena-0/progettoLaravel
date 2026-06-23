<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB; // Per fare le join e interagire con tabelle senza modello

class PreferitiController extends Controller{
    // Restituisce la lista dei preferiti (Sostituisce api_leggi_preferiti.php)
    public function leggi(){
        if(!Session::has('user_id')){
            return response()->json([]);
        }

        $userId = Session::get('user_id');

        // Facciamo la stessa identica JOIN del tuo vecchio PHP
        $preferiti = DB::table('preferiti')
            ->join('libri', 'preferiti.libro_id', '=', 'libri.id')
            ->where('preferiti.user_id', $userId)
            ->select('preferiti.libro_id', 'libri.titolo', 'libri.autore', 'libri.copertina', 'libri.prezzo', 'libri.prezzo_sconto')
            ->get();

        return response()->json($preferiti);
    }

    // Aggiunge o rimuove un preferito (Sostituisce api_aggiungi_preferito.php)
    public function aggiungiRimuovi(Request $request){
        if(!Session::has('user_id')){
            return response()->json(['success' => false, 'error' => 'Non loggato']);
        }

        $userId = Session::get('user_id');
        $libroId = $request->id_libro;

        // Se non ci passano l'ID, significa che è un libro nuovo (es. da OpenLibrary)
        if(!$libroId && $request->has('titolo')){
            // firstOrCreate: cerca il libro, se non esiste lo crea in automatico!
            $libro = Libro::firstOrCreate(
                ['titolo' => $request->titolo, 'autore' => $request->autore],
                [
                    'copertina' => $request->copertina,
                    'prezzo' => $request->prezzo,
                    'prezzo_sconto' => $request->prezzo_sconto
                ]
            );
            $libroId = $libro->id;
        }

        if(!$libroId){
            return response()->json(['success' => false, 'error' => 'Dati mancanti']);
        }

        // Controllo se il libro è già nei preferiti
        $esiste = DB::table('preferiti')
            ->where('user_id', $userId)
            ->where('libro_id', $libroId)
            ->first();

        // Se esiste, lo cancello (Toggle Off)
        if($esiste){
            DB::table('preferiti')
                ->where('user_id', $userId)
                ->where('libro_id', $libroId)
                ->delete();
            return response()->json(['success' => true, 'messaggio' => 'Rimosso dai preferiti']);
        } 
        // Altrimenti, lo inserisco (Toggle On)
        else{
            DB::table('preferiti')->insert([
                'user_id' => $userId,
                'libro_id' => $libroId
            ]);
            return response()->json(['success' => true, 'messaggio' => 'Aggiunto ai preferiti']);
        }
    }
}