<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class RegisterController extends Controller
{
    public function index()
    {
        if (Session::has('user_id')) {
            return redirect('home');
        }

        return view('auth.registrazione'); 
    }
}