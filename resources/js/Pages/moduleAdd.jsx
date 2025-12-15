import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout'; 
import { Head, useForm } from '@inertiajs/react';

export default function CreateModule({indexAnterior, course}) {
    
    // ALTERAÇÃO AQUI: statusOptions agora usa objetos para mapear label e valor numérico
    const statusOptions = [
        { label: 'Draft', value: 0 },
        { label: 'Published', value: 1 },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        course_id: course.id,
        title: '',
        order_index: indexAnterior + 1,
        // Define o valor inicial como o valor do primeiro item (0)
        status: statusOptions[0].value, 
    });
    
    const submit = (e) => {
        e.preventDefault();

        post(route('registerModule'), { 
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Criar Novo Módulo" />

            <form onSubmit={submit}>
            {/*forms hidden para passar*/ }
                <input type="hidden" name='order_index' value={data.order_index} />
                <input type="hidden" name='course_id' value={data.course_id} />
                {/* TÍTULO (title) */}
                <div>
                
                    <InputLabel htmlFor="title" value="Título do Módulo" />
                    <TextInput
                        id="title"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        isFocused={true}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                {/* ORDEM (order_index) */}


                {/* STATUS (status) */}
                <div className="mt-4">
                    <InputLabel htmlFor="status" value="Status" />
                    <select
                        id="status"
                        name="status"
                        value={data.status}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        // O valor é convertido para inteiro no onChange, pois o HTML retorna string
                        onChange={(e) => setData('status', parseInt(e.target.value))} 
                        required
                    >
                        {/* ALTERAÇÃO AQUI: Mapeia o array de objetos */}
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                {/* BOTÃO DE SUBMISSÃO */}
                <div className="mt-6 flex items-center justify-end">
                    <PrimaryButton type="submit" className="ms-4" disabled={processing}>
                        {processing ? 'Criando...' : 'Criar Módulo'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}