<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Session;

class RegisterController extends Controller{
    
    public function index(){
        return view('auth.registrazione');
    }

    public function register(Request $request){
        $errori = [];
        
        if(!isset($request->nome) || strlen($request->nome) == 0){ 
            $errori['nome'] = 'Devi inserire il tuo nome';
        }
        
        if(!isset($request->cognome) || strlen($request->cognome) == 0){ 
            $errori['cognome'] = 'Devi inserire il tuo cognome';
        }
        
        if(!isset($request->email) || !filter_var($request->email, FILTER_VALIDATE_EMAIL)){
            $errori['email'] = 'Email non valida';
        } 
        else{
            $user = User::where('email', $request->email)->first();
            if($user !== null){
                $errori['email'] = 'Email già utilizzata';
            }
        }
        
        if(!isset($request->password) || strlen($request->password) < 8){
            $errori['password'] = 'Inserisci almeno 8 caratteri';
        }
        
        if(!isset($request->password_confirmation) || $request->password !== $request->password_confirmation){
            $errori['password_confirmation'] = 'Le password non coincidono';
        }
        
        if(count($errori) > 0){
            return redirect('register')
                ->withInput()
                ->withErrors($errori);
        }
        
        $user = new User();
        $user->nome = $request->nome;
        $user->cognome = $request->cognome;
        $user->email = strtolower($request->email);
        $user->password = password_hash($request->password, PASSWORD_BCRYPT);
        $user->save();

        Session(['user_id' => $user->id]);
        
        return redirect('home');
    }

    public function checkEmail(Request $request){
        if(!$request->has('q')){
            return response()->json(['exists' => false]);
        }

        $email = $request->query('q');
        $exists = User::where('email', $email)->exists();

        return response()->json(array("exists" => $exists));
    }
}