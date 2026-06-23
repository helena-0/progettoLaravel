<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class CarrelloController extends Controller{
    // Restituisce la lista dei libri nel carrello (Sostituisce api_leggi_carrello.php)
    public function leggi(){
        if(!Session::has('user_id')){
            return response()->json([]);
        }

        $userId = Session::get('user_id');

        $carrello = DB::table('carrello')
            ->join('libri', 'carrello.libro_id', '=', 'libri.id')
            ->where('carrello.user_id', $userId)
            ->select('carrello.libro_id', 'libri.titolo', 'libri.autore', 'libri.copertina', 'libri.prezzo', 'libri.prezzo_sconto')
            ->get();

        return response()->json($carrello);
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

        $esiste = DB::table('carrello')
            ->where('user_id', $userId)
            ->where('libro_id', $libroId)
            ->first();

        if($esiste){
            DB::table('carrello')->where('user_id', $userId)->where('libro_id', $libroId)->delete();
            return response()->json(['success' => true, 'messaggio' => 'Rimosso dal carrello']);
        }
        else{
            DB::table('carrello')->insert(['user_id' => $userId, 'libro_id' => $libroId]);
            return response()->json(['success' => true, 'messaggio' => 'Aggiunto al carrello']);
        }
    }
}