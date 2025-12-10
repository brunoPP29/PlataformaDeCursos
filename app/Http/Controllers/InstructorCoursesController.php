<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Services\InstructorCoursesService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Courses;

class InstructorCoursesController extends Controller
{
    //conexão para usar os services
    protected $service;
    public function __construct(InstructorCoursesService $service)
    {
        $this->service = $service;
    }
    //fim da conexão


    public function index(){
        if (Auth::check()) {
            $infos = Auth::user();
            $courses = $this->service->getCourses($infos);
            //tem que passar os parametros para visualizar os cursos de fato depois
            return Inertia::render('ManageCoursesInstructor', [
                'courses' => $courses,
            ]);
        }else{
            return redirect('/login');
        }
    }

    public function create(){
        if (Auth::check()) {
            return Inertia::render('CreateCoursesInstructor');
        }else{
            return redirect('/login');
        }
    }

    public function register(Request $req){
        //validação
        $validate = $this->service->validateCourse($req);
        //uploadImage

        Courses::create($validate);

        return redirect('/');



        
    }
}
