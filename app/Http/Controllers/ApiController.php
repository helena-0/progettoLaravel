<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http; 

class ApiController extends Controller{
    
    public function film(Request $request){
        
        $apiKey = "cb216e086c72157de88a76d71631e973";

        if($request->has('q')){
            $response = Http::get("https://api.themoviedb.org/3/search/movie", [
                'api_key' => $apiKey,
                'language' => 'it-IT',
                'query' => $request->query('q')
            ]);
        } 
        else{
            $response = Http::get("https://api.themoviedb.org/3/movie/now_playing", [
                'api_key' => $apiKey,
                'language' => 'it-IT',
                'region' => 'IT'
            ]);
        }

        if ($response->successful()) {
            return $response->json();
        }

        return response()->json(['results' => []]);
    }

    public function openlibrary(Request $request){

        if($request->has('isbn')){
            $response = Http::get("https://openlibrary.org/api/books", [
                'bibkeys' => 'ISBN:' . $request->query('isbn'),
                'format' => 'json',
                'jscmd' => 'data'
            ]);
        } 
        elseif($request->has('q')){
            $response = Http::get("https://openlibrary.org/search.json", [
                'q' => $request->query('q')
            ]);
        } 
        else{
            return response()->json(['error' => 'Nessun parametro specificato'], 400);
        }

        if ($response->successful()) {
            return $response->json();
        }

        return response()->json(['num_found' => 0, 'docs' => []]);
    }
}