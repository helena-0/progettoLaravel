<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model{
    protected $table = 'libri';
    
    public $timestamps = false;
    protected $fillable = ['copertina', 'titolo', 'autore', 'prezzo', 'prezzo_sconto'];
}