<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Services\InstructorCoursesService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Courses;
use App\Models\Modules;


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
        if ($this->service->checkAuth()) {
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
        if ($this->service->checkAuth()) {
            return Inertia::render('CreateCoursesInstructor');
        }else{
            return redirect('/login');
        }
    }

    public function register(Request $req){
        //validação
        if ($this->service->checkAuth()) {
                $validate = $this->service->validateCourse($req);
                //uploadImage
                $validate['cover_url'] = $this->service->uploadImage($validate['cover_url']);
                //criar
                Courses::create($validate);

                return redirect('/manageProducts');
        }else{
            return redirect('/login');
        }

    }

    public function manageSingleCourse(Request $req){
        if ($this->service->checkAuth()) {
            $course = $this->service->getCourse($req->id);
            
            return Inertia::render('SingleCourseInstructor', [
                'course' => $course
            ]);
        }else{
            return redirect('/login');
        }
    }

    public function handleActionInstructor(Request $req){
        if ($this->service->checkAuth()) {
            if ($this->service->getCourse($req->id)) {
                $idCourse = $req->id;
                $action = $req->action;
                $indexAnterior = $this->service->getIndex($idCourse);
            //validar as actions e definir a action
            if($this->service->handleAction($action)){
                return Inertia::render($action, [
                    'idCourse' => $idCourse,
                    'indexAnterior' => $indexAnterior
                ]);
            }else{
                return back();
            }
            }else{
                return back();
            }
        }else{
            return redirect('/login');
        }
    }

    public function registerModule(Request $req){
        if ($this->service->checkAuth()) {
                $validate = $this->service->validateModule($req);
                Modules::create($validate);
                            return redirect('/manageModules'.$req->course_id);
                
        }else{
            return redirect('/login');
        }
    }
}
