<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function index(){
        return view('auth.login');
    }

    public function checkLogin(Request $request){
        $errori = [];
        
        if (!isset($request->email) || !filter_var($request->email, FILTER_VALIDATE_EMAIL)){
            $errori['email'] = 'Inserisci l\'e-mail';
        }
        
        if (!isset($request->password) || strlen($request->password) < 8){
            $errori['password'] = 'Inserisci la password';
        }
        
        if (count($errori) > 0){
            return redirect('login')
                ->withInput()
                ->withErrors($errori);
        }
        
        $user = User::where('email', $request->email)->first();
        if (!$user || !password_verify($request->password, $user->password)){
            return redirect('login')
                ->withInput()
                ->withErrors(['login' => 'Email e/o password errati.']);
        }
    
        Session(['user_id' => $user->id]);

        return redirect('home');
    }

    public function logout(){
        Session::flush();
        return redirect('home');
    }
}