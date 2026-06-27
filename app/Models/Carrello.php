<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrello extends Model{
    protected $table = 'carrello';
    public $timestamps = false;

    public function libro(){
        return $this->belongsTo(Libro::class, 'libro_id');
    }

    public function user(){
    return $this->belongsTo(User::class, 'user_id');
}
}