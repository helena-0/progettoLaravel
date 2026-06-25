<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class User extends Model{
    protected $table = 'utenti';
    public $timestamps = false;
    protected $fillable = [
        'nome',
        'cognome',
        'email',
        'password',
    ];
    
    // Un utente ha molti elementi nel carrello
    public function carrelli(){
        return $this->hasMany(Carrello::class, 'user_id');
    }

    // Un utente ha molti elementi nei preferiti
    public function preferiti(){
        return $this->hasMany(Preferito::class, 'user_id');
    }
}