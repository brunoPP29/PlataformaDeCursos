// resources/js/Components/CourseCard.jsx

import React from 'react';

const getStatusDetails = (statusValue) => {
    switch (statusValue) {
        case 1:
            return { text: 'PUBLICADO', color: 'text-green-600', isPublished: true };
        case 0:
        default:
            return { text: 'RASCUNHO', color: 'text-yellow-600', isPublished: false };
    }
};

export default function CourseCard({ course }) {
    
    const statusDetails = getStatusDetails(course.status);

    return (
        <div key={course.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
            
            <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                    **Status:** <span className={`font-medium ${statusDetails.color}`}>
                        {statusDetails.text} 
                    </span>
                </p>
                <p>
                    **Criado em:** <span className="text-gray-500">
                        {new Date(course.created_at).toLocaleDateString('pt-BR')}
                    </span>
                </p>
            </div>

            <div className="mt-4 flex space-x-3">
                <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Ver Detalhes
                </button>
                <button className="text-sm px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-50 transition">
                    Excluir
                </button>
            </div>
        </div>
    );
}