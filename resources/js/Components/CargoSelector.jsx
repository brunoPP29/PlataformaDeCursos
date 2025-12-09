// SimpleCargoSelector.jsx (Alternativa)

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; 

const SimpleCargoSelector = ({
    id,
    name,
    value,
    className = '',
    autoComplete,
    onChange,
    required,
    // Valores de cargo esperados
    options = ['instrutor', 'cliente'],
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    
    // Texto que aparece no botão
    const displayValue = String(value || '').trim();
    const displayText = displayValue
        ? (displayValue.charAt(0).toUpperCase() + displayValue.slice(1))
        : 'Selecione o Cargo';

    // Função de clique do item
    const handleItemClick = (optionValue) => {
        // 🚨 DEBUG: Veja se este log aparece no console!

        // Simula o evento de mudança (obrigatório para o useForm do Inertia)
        onChange({ target: { value: optionValue, name: name } });
        setOpen(false);
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            
            {/* 1. Botão/Trigger - O que o usuário vê e clica para abrir */}
            <div
                onClick={() => setOpen(!open)}
                className={`flex justify-between items-center w-full px-3 py-2 text-left text-sm leading-5 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer bg-white ${
                    open ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
                }`}
            >
                <span className={!displayValue ? 'text-gray-500' : 'text-gray-700'}>
                    {displayText}
                </span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>

            {/* 2. Lista de Opções (Conteúdo) */}
            {open && (
                <div
                    // Z-index altíssimo para garantir prioridade de clique
                    className="absolute z-[9999] mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleItemClick(option)}
                            className={`block w-full px-4 py-2 text-start text-sm leading-5 transition duration-150 ease-in-out cursor-pointer 
                                ${option === value 
                                    ? 'text-white bg-indigo-600 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
                                }
                            `}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </div>
                    ))}
                </div>
            )}
            
            {/* 3. Campo de Formulário Real (Oculto) - Essencial para submissão */}
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange} // Mantém o onChange do Inertia para fins de acessibilidade/envio
                autoComplete={autoComplete}
                required={required}
                className="absolute w-full h-full top-0 left-0 opacity-0 pointer-events-none" // pointer-events-none impede cliques
                tabIndex="-1" // Remove do foco
                aria-hidden="true"
            >
                <option value="" disabled>Selecione o Cargo</option>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SimpleCargoSelector;