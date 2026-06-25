<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro; 

class LibroController extends Controller{
    public function getNovita(){
        $libri = Libro::take(5)->get();
        return response()->json($libri);
    }
}