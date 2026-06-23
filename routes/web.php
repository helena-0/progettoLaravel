<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PreferitiController;
use App\Http\Controllers\CarrelloController;

Route::get('/', [HomeController::class, 'index']);
Route::get('home', [HomeController::class, 'index']);
Route::get('account', [HomeController::class, 'account']);
Route::get('carrello', [HomeController::class, 'carrello']);
Route::get('api/elimina_account', [HomeController::class, 'eliminaAccount']);

Route::get('login', [LoginController::class, 'index']);
Route::post('login', [LoginController::class, 'checkLogin']);
Route::get('logout', [LoginController::class, 'logout']); 

Route::get('register', [RegisterController::class, 'index']);
Route::post('register', [RegisterController::class, 'register']);
Route::get('check_email', [RegisterController::class, 'checkEmail']);

Route::get('api/libri', [LibroController::class, 'getNovita']);
Route::get('api/film', [ApiController::class, 'film']);
Route::get('api/openlibrary', [ApiController::class, 'openlibrary']);

Route::get('api/preferiti/leggi', [PreferitiController::class, 'leggi']);
Route::post('api/preferiti/aggiungi', [PreferitiController::class, 'aggiungiRimuovi']);

Route::get('api/carrello/leggi', [CarrelloController::class, 'leggi']);
Route::post('api/carrello/aggiungi', [CarrelloController::class, 'aggiungiRimuovi']);