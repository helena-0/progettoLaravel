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
        return response()->json($user);
    }

    public function eliminaAccount(){
        if (!Session::has('user_id')){
            return response()->json(['success' => false]);
        }

        $user = User::find(Session::get('user_id'));

        if ($user){
            $user->delete(); 
            Session::flush(); 
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }

    public function logout(){
        Session::flush();
        return redirect('home');
    }
}