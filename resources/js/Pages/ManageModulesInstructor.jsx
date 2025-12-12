import React from 'react';
import { Link } from '@inertiajs/react';

export default function ModuleList({ modules, courseId }) {
    
    // Função para renderizar o status de forma amigável
    const getStatusText = (status) => {
        return status === 1 ? 'Publicado' : 'Rascunho';
    };

    // Função para renderizar o estilo do status
    const getStatusClass = (status) => {
        return status === 1 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Módulos do Curso</h2>

            {modules.length === 0 ? (
                <p className="text-gray-500">Nenhum módulo encontrado. Crie o primeiro!</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {modules.map((module) => (
                        <li key={module.id} className="py-4 flex justify-between items-center hover:bg-gray-50">
                            
                            {/* Informações do Módulo */}
                            <div className="flex items-center space-x-4">
                                {/* Índice de Ordem */}
                                <span className="text-lg font-bold text-indigo-600 w-8 text-center">
                                    {module.order_index}.
                                </span>
                                
                                <div>
                                    <p className="text-base font-medium text-gray-900">{module.title}</p>
                                    
                                    {/* Status */}
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(module.status)} mt-1`}>
                                        {getStatusText(module.status)}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Ações */}
                            <div className="space-x-2 flex items-center">
                                
                                {/* Botão de Edição */}
                                <Link
                                    href=""
                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                >
                                    Editar
                                </Link>

                                {/* Botão para Aulas/Conteúdo */}
                                <Link
                                    href=""
                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                >
                                    Aulas ({/* número de aulas */})
                                </Link>
                                
                                {/* Botão de Reordenar (Exemplo: Mover para Cima/Baixo) */}
                                {/* Você precisará de lógica e rotas específicas para reordenar */}
                                <button className="text-gray-400 hover:text-gray-600 text-sm">
                                    ⇅
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
            {/* Botão para Criar Novo Módulo (Opcional, mas útil) */}
            <div className="mt-6 border-t pt-4">
                <Link
                    href={`/manageCourses/${courseId}/moduleAdd`}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                    + Adicionar Novo Módulo
                </Link>
            </div>
        </div>
    );
}