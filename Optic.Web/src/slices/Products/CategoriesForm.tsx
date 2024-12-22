import { Bar } from "../../shared/components/Progress/Bar";
import { useCategories } from "./useProducts"

export const CategoriesForm = () => {

    const { createCategory, categories, queryCategories } = useCategories();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target;
        if (form instanceof HTMLFormElement) {
            const formData = new FormData(form);
            const categorie = Object.fromEntries(formData.entries())
            const nameCategory = categorie.name as string;
            const res = await createCategory.mutateAsync({
                name: nameCategory,
            });

            if (res.isSuccess)
                form.reset();
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }

    return (
        <>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre
                    </label>
                    <input
                        required
                        name="name"
                        placeholder="Categoria"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mt-1">

                    <button type="submit" disabled={createCategory.isPending} className="bg-blue-500 hover:bg-blue-700 mr-1 text-white px-4 py-2 rounded font-bold">
                        {createCategory.isPending ? "Creando..." : "Crear Categoria"}
                    </button>
                </div>
            </form>
            {
                queryCategories.isLoading && <Bar Title="Cargando..." />
            }
            <div>
                <h3 className="text-xl font-bold pb-2">Categorias</h3>
                <div className="flex flex-col">
                    {categories?.map((category) => (
                        <div key={category.id} >
                            <input type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                name="id"
                                value={category.name}
                                onChange={handleChange} />
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}