import { useEffect, useState } from "react";
import { ProductPagerModel, ProductsResponseModel } from "./ProductModel";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductsPager } from "./useProducts";
import { Bar } from "../../shared/components/Progress/Bar";
import PagerComponent from "../../shared/components/Grid/PagerComponent";

export const SearchProduct = ({ setProducts }: { setProducts: React.Dispatch<React.SetStateAction<ProductsResponseModel[]>> }) => {
    const [search, setSearch] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState(5);
    const [orderByName] = useState<boolean>(false);
    const { products, queryProducts, pager, count } = useProductsPager(pageIndex, pageSize, orderByName, debouncedSearch);

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
        if (e.target.value.trim() === "") {
            setSearched(false);
        }
    };

    // Debounce de 500ms
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setSearched(search.trim() !== "");
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    const addProduct = (product: ProductsResponseModel | ProductPagerModel) => {

        const productAdd: ProductsResponseModel = {
            categories: [],
            codeNumber: product.codeNumber,
            id: product.id,
            idBrand: 0,
            idSupplier: 0,
            name: product.name,
            updateDate: product.updateDate,
            quantity: 1,
            salePrice: product.salePrice,
            unitPrice: product.unitPrice,
        };

        setProducts((prev) => {
            const existngProduct = prev.find(p => p.id === product.id);
            if (existngProduct) {
                return prev.map(p =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...productAdd, quantity: 1 }];
        });
    };



    return (
        <div className="flex flex-col w-full">
            <div className="flex rounded-lg w-full mb-3">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={search}
                    onChange={handleChangeSearch}
                    className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
            </div>
            <div className="bg-white rounded-lg shadow w-full text-center">
                {queryProducts.isLoading ? <Bar Title="Cargando productos..." /> : null}

                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="rounded-lg border border-gray-400 p-4 mb-2 hover:border-blue-700 transition-colors duration-300 flex justify-between items-center">
                            <p className="font-bold text-gray-500">#{String(product.codeNumber).padStart(5, '0')}</p>
                            <p>{product.name}</p>
                            <p className=" font-bold text-purple-500 ">{product.quantity}</p>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => addProduct(product)}
                            >   <FontAwesomeIcon icon={faCirclePlus} />
                            </button>
                        </div>
                    ))
                ) : (
                    searched && <p className="text-gray-500 text-2xl p-8 text-center">No se encontraron productos.</p>
                )}

                <PagerComponent pageCurrent={pageIndex} totalPages={pager?.pageCount ?? 0} pageSize={pageSize} xChange={(value) => setPageIndex(value)} xChangePageSize={(value) => setPageSize(value)} itemsCount={count} />
            </div>
        </div>
    );
};
