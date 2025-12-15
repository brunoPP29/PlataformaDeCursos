import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout'; 
import { Head, useForm } from '@inertiajs/react';

// Recebe o objeto 'course' completo do Laravel
export default function EditCourse({ course }) {
    
    const statusOptions = ['draft', 'published'];

    const { data, setData, patch, processing, errors } = useForm({
        // Inicializa o formulário com os dados atuais do curso
        id:course.id,
        title: course.title,
        description: course.description || '', // Pode ser opcional no banco
        price: course.price,
        status: course.status,
        cover_url: course.cover_url,
    });

    const submit = (e) => {
        e.preventDefault();

        // Envia a requisição de atualização usando o método PATCH
        // course.id é necessário para a rota de update
        patch(route('editCourse'));
    };

    return (
        <GuestLayout>
            <Head title={`Editar Curso: ${course.title}`} />

            <form onSubmit={submit}>
                <input type='hidden' value={course.id} name='id'/>
            
                {/* TÍTULO (title) */}
                <div className="mb-4">
                    <InputLabel htmlFor="title" value="Título do Curso" />
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

                {/* DESCRIÇÃO (description) */}
                <div className="mb-4">
                    <InputLabel htmlFor="description" value="Descrição" />
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={data.description}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                {/* PREÇO (price) */}
                <div className="mb-4">
                    <InputLabel htmlFor="price" value="Preço (R$)" />
                    <TextInput
                        id="price"
                        type="number"
                        step="0.01"
                        name="price"
                        value={data.price}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('price', e.target.value)}
                        required
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>
                <div className="imagemAtual">
                    <InputLabel htmlFor="imagem atual" value="Imagem Atual" />

                    <img
                    src={course.cover_url}
                    alt="" />
                </div>

                <div className="mb-4">
                <InputLabel htmlFor="cover_url" value="Imagem de Capa" />
                
                <input
                    id="cover_url"
                    type="file"
                    name="cover_url"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    onChange={(e) => setData('cover_url', e.target.files[0])}
                />
                
                <InputError message={errors.cover_url} className="mt-2" />

                </div>

                {/* BOTÃO DE SUBMISSÃO */}
                <div className="mt-6 flex items-center justify-end">
                    <PrimaryButton type="submit" className="ms-4" disabled={processing}>
                        {processing ? 'Salvando...' : 'Salvar Alterações'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}