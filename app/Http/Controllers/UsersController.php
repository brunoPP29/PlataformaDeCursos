<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       if (Auth::check()) {
          $userInfos = Auth::user();
          if ($userInfos->cargo === 'instrutor') {
               return Inertia::render('DashboardInstructor');

          }
               return Inertia::render('DashboardClient');
       }else{
            return redirect('/login');
       }
    }


}
