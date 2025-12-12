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
            'cover_url'     => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'], // Regras para a imagem
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

public function handleAction($action, $idCourse){
    if ($action === 'edit') {
        //RETORNAR EDIT
        ///lidar com edit
    }elseif ($action === 'moduleAdd') {
        return $action;

    }elseif ($action === 'lessonAdd'){
        return $action;

    }elseif($action === 'courseDelete'){

        $course = Courses::findOrFail($idCourse);
            $course->delete();
    
        return redirect('manageCourses');


    }elseif($action === 'status'){
        $status = Courses::where('id', $idCourse)
                ->select('status')
                ->first();
        $statusInteger = $status->status;
        $statusInteger = !$statusInteger;
        Courses::where('id', $idCourse)
                ->update(['status' => $statusInteger]);
        return redirect('manageCourses');
    }else{
        return false;
    }
}

public function getIndex($idCourse){
    return Modules::where('course_id', $idCourse)
                    ->max('order_index');
}

public function validateModule($req)
{
    $allowedStatuses = [0,1];

    $validatedData = $req->validate([
        'title'     => ['required', 'string', 'max:255'],
        'course_id' => ['required', 'integer'],
        'order_index' => ['required', 'integer'],
        'status'    => ['required', 'integer', Rule::in($allowedStatuses)],
    ]);

    $moduleData = [
        'title'     => $validatedData['title'],
        'course_id' => $validatedData['course_id'],
        'status'    => $validatedData['status'],
        'order_index' =>$validatedData['order_index'],
    ];
    return $moduleData;
}




}