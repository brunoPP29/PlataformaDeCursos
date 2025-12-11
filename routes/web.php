<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\InstructorCoursesController;
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

Route::get('/manageCourses', [InstructorCoursesController::class, 'index'])
    ->name('manageCourses');

Route::get('/manageCourses/{id}', [InstructorCoursesController::class, 'manageSingleCourse'])
    ->name('manageSingleCourse');

Route::get('/manageCourses/{id}/{action}', [InstructorCoursesController::class, 'handleActionInstructor'])
    ->name('handleActionInstructor');

Route::get('/createCourse', [InstructorCoursesController::class, 'create'])
    ->name('createCourse');



    ///registers
Route::post('/registerCourse', [InstructorCoursesController::class, 'register'])
    ->name('registerCourse');

Route::post('/registerModule', [InstructorCoursesController::class, 'registerModule'])
    ->name('registerModule');


require __DIR__.'/auth.php';
