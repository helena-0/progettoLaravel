<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller{
    public function index(){
        return view('home');
    }

    public function account(){
        if (!Session::has('user_id')){
            return redirect('login');
        }

        $user = User::find(Session::get('user_id'));
        return view('account', ['user' => $user]);
    }

    public function carrello(){
        if (!Session::has('user_id')){
            return redirect('login');
        }

        return view('carrello');
    }

    public function eliminaAccount(){
        if (!Session::has('user_id')){
            return response()->json(['success' => false, 'error' => 'Non autorizzato']);
        }

        $user = User::find(Session::get('user_id'));

        if ($user){
            $user->delete(); 
            Session::flush(); 
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'error' => 'Utente non trovato']);
    }
}