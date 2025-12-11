import { Link, usePage } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';
import CourseDetailsCard from '@/Components/CourseDetailsCard';

export default function ManageCoursesInstructor({course}) {
    

    return (
        <div className="p-6">
            
            
            <h1>Curso individual gerenciamento</h1>
            

                <CourseDetailsCard course={course} />

            
        </div>
    );
}