<?php
namespace App\Services;
use App\Models\Courses;
use App\Models\Modules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;

class InstructorCoursesService{

public function checkAuth(){
    if (Auth::check()) {
        return true;
    }else{
        return false;
    }
}

public function getCourses()
{
    return Courses::where('instructor_id', Auth::id())->get();
}

    public function validateCourse($req){
    $validatedData = $req->validate([
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string'],
            'category'      => ['required', 'string', 'max:255'],
            'price'         => ['required', 'numeric', 'min:0'],
            'cover_url'     => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'], // Regras para a imagem
        ]);

        // Inicializa o array de dados para o modelo
        $itemData = [
            'instructor_id' => Auth::id(),
            'title'         => $validatedData['title'],
            'description'   => $validatedData['description'],
            'category'      => $validatedData['category'],
            'price'         => $validatedData['price'],
            'cover_url'     => $validatedData['cover_url'],
            'status'        =>  0, // Defina um status inicial, se necessário
        ];

        return $itemData;

    }

public function uploadImage(UploadedFile $uploadedFile): string
{
    $temporaryPath = $uploadedFile->store('temp', 'local'); 
    $fileName = $uploadedFile->getClientOriginalName();
    $newPath = 'covers/' . $fileName;
    $fullTemporaryPath = 'temp/' . basename($temporaryPath);
    Storage::disk('public')->put(
        $newPath, 
        Storage::disk('local')->get($fullTemporaryPath)
    );
    Storage::disk('local')->delete($fullTemporaryPath);
    return Storage::url($newPath);
}


public function getCourse($id){
    return Courses::findOrFail($id);
}

public function handleAction($action){
    if ($action === 'edit') {
        //RETORNAR EDIT
        ///lidar com edit
    }elseif ($action === 'moduleAdd') {
        return $action;
    }elseif ($action === 'lessonAdd'){
        return $action;
    }else{
        return false;
    }
}

public function getIndex($idCourse){
    return Modules::where('course_id', $idCourse)
                    ->select('order_index')
                    ->get();
}

public function validateModule($req)
{
    $allowedStatuses = ['draft', 'published'];

    $validatedData = $req->validate([
        'title'     => ['required', 'string', 'max:255'],
        'course_id' => ['required', 'integer', 'exists:courses,id'],
        'status'    => ['required', 'string', Rule::in($allowedStatuses)],
    ]);

    $moduleData = [
        'title'     => $validatedData['title'],
        'course_id' => $validatedData['course_id'],
        'status'    => $validatedData['status'],
    ];
    return $moduleData;
}



}