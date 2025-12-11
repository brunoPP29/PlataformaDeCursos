import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout'; 
import { Head, useForm } from '@inertiajs/react';

export default function CreateModule({ idCourse , indexAnterior}) {
    
    const statusOptions = ['draft', 'published'];

    const { data, setData, post, processing, errors, reset } = useForm({
        course_id: idCourse,
        title: '',
        index: indexAnterior+1,
        status: statusOptions[0],
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
                <input type="hidden" name='order_index' value={data.index}/>
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
                        onChange={(e) => setData('status', e.target.value)}
                        required
                    >
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
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