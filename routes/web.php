<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;

 

// Login routes

Route::view('/login', 'auth.login')

    ->middleware('guest')

    ->name('login');

 

Route::post('/login', Login::class)

    ->middleware('guest');

 

// Logout route

Route::post('/logout', Logout::class)

    ->middleware('auth')

    ->name('logout');

Route::get('', [UsersController::class, 'index'])
    ->name('dashboard');

require __DIR__.'/auth.php';
