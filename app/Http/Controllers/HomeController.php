<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller{
    
    public function index(){
        $auth = Session::has('user_id'); 
        return view('home', ['auth' => $auth]);
    }

}