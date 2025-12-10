// Importe o Link do Inertia
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div>
            <h1>Bem-vindo ao Dashboard do Instrutor!
            </h1>
            
            {/* Use o componente Link com method="post" */}
            <Link 
                href={route('logout')} // Use a função route() se estiver disponível (recomendado)
                method="post" 
                as="button" // Renderiza como um botão HTML
                type="button" 
            >
                Sair
            </Link>
            <Link 
                href={route('manageCourses')} // Use a função route() se estiver disponível (recomendado)
                method="get" 
                as="button" // Renderiza como um botão HTML
                type="button" 
            >
                Manage Courses
            </Link>
        </div>
    );
}