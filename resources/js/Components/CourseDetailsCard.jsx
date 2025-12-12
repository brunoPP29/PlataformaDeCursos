// resources/js/Components/CourseDetailsCard.jsx

import React from 'react';
import { Head } from '@inertiajs/react';

// Função de utilidade para traduzir o status 0/1
const getStatusDetails = (statusValue) => {
    const isPublished = statusValue === 1;
    
    return { 
        text: isPublished ? 'Publicado' : 'Rascunho', 
        colorClass: isPublished ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300',
        isPublished: isPublished,
        
        // Detalhes do botão de ação
        actionButtonText: isPublished ? 'Desativar' : 'Publicar',
        actionButtonClass: isPublished ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'
    };
};

export default function CourseDetailsCard({ course }) {
    
    const statusDetails = getStatusDetails(course.status);
    const imageUrl = course.cover_url || '/images/default-course-banner.jpg'; 

    const formattedPrice = new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(course.price);


    return (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 max-w-8xl mx-auto">
            
            {/* 1. SEÇÃO DO BANNER (Imagem de Capa) */}
            <div className="h-60 w-full bg-gray-200 overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={`Capa do curso ${course.title}`} 
                    className="w-full h-full object-cover" 
                />
            </div>

            <div className="p-8">
                
                {/* 2. CABEÇALHO PRINCIPAL */}
                <div className="flex justify-between items-start border-b pb-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 leading-snug">
                            {course.title}
                        </h1>
                        <p className="text-lg text-gray-600 mt-1">
                            Categoria: <span className="font-semibold">{course.category}</span>
                        </p>
                    </div>
                    
                    {/* Tag de Status Destacada */}
                    <span className={`
                        px-4 py-1 text-sm font-bold rounded-full border flex-shrink-0 mt-1
                        ${statusDetails.colorClass}
                    `}>
                        {statusDetails.text.toUpperCase()}
                    </span>
                </div>

                {/* 3. DETALHES e DESCRIÇÃO (Layout em Colunas) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Coluna de Detalhes (1/3) */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 border-b pb-2">Detalhes</h3>
                        
                        <p>
                            **ID:** <span className="font-semibold text-gray-700">{course.id}</span>
                        </p>
                        <p>
                            **Instrutor ID:** <span className="font-semibold text-gray-700">{course.instructor_id}</span>
                        </p>
                        <p>
                            **Preço:** <span className="font-extrabold text-green-700">{formattedPrice}</span>
                        </p>
                        <p>
                            **Criado em:** <span className="font-semibold text-gray-700">
                                {new Date(course.created_at).toLocaleDateString('pt-BR')}
                            </span>
                        </p>
                    </div>

                    {/* Coluna de Descrição (2/3) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Descrição</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {course.description}
                        </p>
                    </div>
                </div>

                {/* 4. BOTÕES DE AÇÃO (Rodapé) */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end space-x-4">
                    
                    {/* Botão de Publicar / Desativar (Dinâmico) */}
                    <a 
                        
                        className={`
                            px-6 py-3 text-lg font-bold text-white rounded-lg transition shadow-md
                            ${statusDetails.actionButtonClass}
                        `}
                    >
                        {statusDetails.actionButtonText}
                    </a>

                    <a
                    className="px-6 py-3 text-lg font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                    href={`/manageCourses/${course.id}/moduleAdd`}
                    >
                    Criar Modulo
                    </a>

                    <a
                    href={`/manageModules/${course.id}`}
                    className="px-6 py-3 text-lg font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                        Gerenciar Modulos
                    </a>

                    {/* Botão de Edição */}
                    <button className="px-6 py-3 text-lg font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                        Editar Curso
                    </button>



                    {/* Botão de Excluir */}
                    <a
                    href={`/manageCourses/${course.id}/courseDelete`}
                    className="px-6 py-3 text-lg font-bold border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition">
                        Excluir
                    </a>
                </div>
            </div>
        </div>
    );
}