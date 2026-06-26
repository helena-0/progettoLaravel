<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrello extends Model{
    protected $table = 'carrello';
    public $timestamps = false;

    // Relazione: questa riga del carrello appartiene a uno specifico libro
    public function libro(){
        return $this->belongsTo(Libro::class, 'libro_id');
    }

    public function user(){
    return $this->belongsTo(User::class, 'user_id');
}
}