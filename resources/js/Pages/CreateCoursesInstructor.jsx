import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout'; 
import { Head, useForm } from '@inertiajs/react';

export default function CreateItem({ instructorId, categories }) {
    const availableCategories = categories || ['Tecnologia', 'Design', 'Negócios', 'Saúde'];
    
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: availableCategories[0],
        price: '',
        cover_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('registerCourse'));
    };

    return (
        <GuestLayout>
            <Head title="Criar Novo Item" />

            <form onSubmit={submit}>
                
                <div>
                    <InputLabel htmlFor="title" value="Título do Item" />
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

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Descrição" />
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows="4"
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="category" value="Categoria" />
                    <select
                        id="category"
                        name="category"
                        value={data.category}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setData('category', e.target.value)}
                        required
                    >
                        {availableCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="price" value="Preço (R$)" />
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className="mt-1 block w-full"
                        min="0"
                        step="0.01"
                        onChange={(e) => setData('price', e.target.value)}
                        required
                    />
                    <InputError message={errors.price} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="cover_url" value="Imagem de Capa" />
                    <input
                        id="cover_url"
                        type="file"
                        name="cover_url"
                        className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={(e) => setData('cover_url', e.target.files[0])}
                    />
                    <InputError message={errors.cover_url} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <PrimaryButton type="submit" className="ms-4" disabled={processing}>
                        {processing ? 'Criando...' : 'Criar Item'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}