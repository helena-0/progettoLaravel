<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Preferito extends Model{
    protected $table = 'preferiti';
    public $timestamps = false;

    public function libro(){
        return $this->belongsTo(Libro::class, 'libro_id');
    }
}