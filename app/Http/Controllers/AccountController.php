<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AccountController extends Controller{

    public function account(){
        if (!Session::has('user_id')){
            return redirect('login');
        }

        return view('account', ['auth' => true]);
    }

    public function datiUtente(){
        if (!Session::has('user_id')){
            return response()->json([]);
        }
        
        $user = User::find(Session::get('user_id'));
        return $user;
    }

    public function eliminaAccount(){
        if (!Session::has('user_id')){
            return ['success' => false];
        }

        $user = User::find(Session::get('user_id'));

        if ($user){
            $user->delete(); 
            Session::flush(); 
            if (isset($_COOKIE['user_id'])) {
                setcookie("user_id", "", time() - 3600, "/");
            }
            return ['success' => true];
        }

        return ['success' => false];
    }

    public function logout(){
        Session::flush();
        return redirect('home');
    }
}