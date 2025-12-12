<?php
namespace App\Services;
use App\Models\Modules;
use Illuminate\Support\Facades\Auth;

class InstructorModulesService{

    public function checkAuth(){
        if (Auth::check()) {
            return true;
        }else{
            return false;
        }
    }

    public function getModules($idCourse){
        return Modules::where('course_id', $idCourse)
                ->get()
                ->toArray();
    }


}