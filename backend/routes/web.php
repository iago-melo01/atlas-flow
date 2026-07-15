<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('login/', [LoginController::class, 'login']);
Route::post('register/', [RegisterController::class, 'store']);

Route::post('logout/', [LogoutController::class, 'logout'])->middleware('auth');
