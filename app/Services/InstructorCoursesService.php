<?php
namespace App\Services;
use App\Models\Courses;
use Illuminate\Support\Facades\Auth;

class InstructorCoursesService{

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

    public function uploadImage($req){
        if ($req->hasFile('cover_image')) {
            // Salva a imagem na pasta 'public/covers' e retorna o caminho (ex: covers/nome-aleatorio.jpg)
            $path = $req->file('cover_image')->store('covers', 'public');
            
            // Salva o caminho público no banco de dados
            $itemData['cover_url'] = $path; 

            return $itemData['cover_url'];
        }
    }
}