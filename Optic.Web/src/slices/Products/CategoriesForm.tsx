import { Bar } from "../../shared/components/Progress/Bar";
import { CategoriesModel } from "./ProductModel";
import { useCategories } from "./useProducts"

export const CategoriesForm = () => {

    const { createCategory, categories, queryCategories, updateCategory } = useCategories();
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

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, category: CategoriesModel) => {
        const { value } = event.target;
        await updateCategory.mutateAsync({
            id: category.id,
            name: value,
        });
    }

    return (
        <>
            <form className="flex rounded-lg overflow-hidden" onSubmit={handleSubmit}>

                <input
                    required
                    autoComplete="off"
                    name="name"
                    placeholder="Categoria"
                    className="shadow appearance-none border rounded-tl-lg rounded-bl-lg  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" disabled={createCategory.isPending}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 font-bold">
                    {createCategory.isPending ? "Creando..." : "Crear"}
                </button>
            </form>
            {
                queryCategories.isLoading && <Bar Title="Cargando..." />
            }
            <div>
                <h3 className="text-xl font-bold pb-2 mt-2 text-gray-600 text-center">Categorias</h3>
                <div className="flex flex-col">
                    {categories?.map((category) => (
                        <div key={category.id} >
                            <input type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                name="id"
                                defaultValue={category.name}
                                onBlur={(event) => handleChange(event, category)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}