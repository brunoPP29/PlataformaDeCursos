<?php
namespace App\Http\Controllers;
use App\Services\InstructorModulesService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstructorModulesController extends Controller
{
    //conexão para usar os services
    protected $service;
    public function __construct(InstructorModulesService $service)
    {
        $this->service = $service;
    }
    //fim da conexão

    public function index(Request $req){
        if ($this->service->checkAuth()) {
            $modules = $this->service->getModules($req->id);
            return Inertia::render('ManageModulesInstructor', [
                'modules' => $modules,
                'courseId' => $req->id,
            ]);
        }else{
            return redirect('/login');
        }
    }

}
