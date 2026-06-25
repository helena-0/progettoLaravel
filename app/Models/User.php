<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable{
    protected $table = 'utenti';
    public $timestamps = false;
    protected $fillable = [
        'nome',
        'cognome',
        'email',
        'password',
    ];
}