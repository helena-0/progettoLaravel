<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class User extends Model{
    protected $table = 'utenti';
    public $timestamps = false;
    
    public function carrelli(){
        return $this->hasMany(Carrello::class, 'user_id');
    }

    public function preferiti(){
        return $this->hasMany(Preferito::class, 'user_id');
    }
}