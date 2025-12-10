import { Link, usePage } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';

export default function ManageCoursesInstructor({courses}) {
    

    return (
        <div className="p-6">
            
            
            <h1>Bem-vindo ao Management Cursos do Instrutor!</h1>
            
                <Link
                href={route('createCourse')} // Use a função route() se estiver disponível (recomendado)
                method="get"
                as="button" // Renderiza como um botão HTML
                type="button"
                >
                Cria novo curso

                </Link> 

                <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
                    📚 Seus Cursos ({courses.length})
                </h1>

                {courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Itera sobre a lista de cursos 
                          e renderiza um CourseCard para CADA curso.
                        */}
                        {courses.map((course) => (
                            // Passando o objeto 'course' completo como uma prop para o componente filho
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-10 bg-gray-50 border rounded-lg">
                        <p className="text-xl text-gray-500">
                            😔 Você ainda não tem cursos cadastrados.
                        </p>
                    </div>
                )}
            
        </div>
    );
}