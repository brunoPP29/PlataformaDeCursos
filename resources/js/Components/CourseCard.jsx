// resources/js/Components/CourseCard.jsx (Layout de Card com Banner)

import React from 'react';

// Função de utilidade para traduzir o status 0/1
const getStatusDetails = (statusValue) => {
    switch (statusValue) {
        case 1:
            return { text: 'Publicado', colorClass: 'bg-green-100 text-green-800' };
        case 0:
        default:
            return { text: 'Rascunho', colorClass: 'bg-yellow-100 text-yellow-800' };
    }
};

export default function CourseCard({ course }) {
    
    const statusDetails = getStatusDetails(course.status);
    const imageUrl = course.cover_url || '/default-course-banner.jpg'; // URL de fallback

    return (
        <div 
            key={course.id} 
            className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100 transition duration-300 hover:shadow-2xl"
        >
            {/* 1. SEÇÃO DO BANNER (Imagem de Capa) */}
            <div className="h-40 bg-gray-200 overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={`Capa do curso ${course.title}`} 
                    className="w-full h-full object-cover" 
                />
            </div>

            <div className="p-6">
                
                {/* 2. TÍTULO e STATUS */}
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                        {course.title}
                    </h2>
                    
                    {/* Tag de Status */}
                    <span className={`
                        px-3 py-1 text-xs font-bold rounded-full border border-current flex-shrink-0 
                        ${statusDetails.colorClass}
                    `}>
                        {statusDetails.text.toUpperCase()}
                    </span>
                </div>

                {/* 3. DETALHES */}
                <div className="text-sm text-gray-600 space-y-2 border-t pt-4 mt-4 border-gray-100">
                    <p>
                        **ID:** <span className="font-semibold">{course.id}</span>
                    </p>
                    <p>
                        **Criado em:** <span className="font-semibold">
                            {new Date(course.created_at).toLocaleDateString('pt-BR')}
                        </span>
                    </p>
                </div>

                {/* 4. BOTÕES DE AÇÃO */}
                <div className="mt-6 flex justify-end space-x-3 border-t pt-4 border-gray-100">
                    <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Gerenciar
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}