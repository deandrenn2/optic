import { useState, useEffect } from "react";
import { getPagerProduct } from "./ProductsServices";
import { ProductSearchResponse, ProductsResponseModel } from "./ProductModel";
import {  faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchProduct = ({ setProducts }: { setProducts: React.Dispatch<React.SetStateAction<ProductsResponseModel[]>> }) => {
    const [search, setSearch] = useState<string>("");
    const [localProducts, setLocalProducts] = useState<ProductsResponseModel[]>([]);
    const [searched, setSearched] = useState<boolean>(false); 
    const [pageIndex] = useState<number>(1); 
    const [orderByName ] = useState<boolean>(false); 
    const loadProducts = async () => {
        try {
            const result: ProductSearchResponse = await getPagerProduct(pageIndex, 10, orderByName, search); 
            const products = Array.isArray(result.data) ? result.data : [];
            if (products.length > 0) {
                setLocalProducts(products);
            } else {
                setLocalProducts([]);
            }
        } catch (error) {
            console.error("Error al cargar productos al abrir el modal", error);
        }
    };

    useEffect(() => {
        loadProducts(); 
    }, [pageIndex, orderByName, search]);

    const handleSearch = async () => {
        setSearched(true); 
        if (search.trim() === "") {
            setLocalProducts([]); 
            return;
        }
    };
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (e.target.value.trim() === "") {
            setSearched(false); 
            loadProducts(); 
        }
    };

    const addProduct = (product: ProductsResponseModel) => {
        setProducts((prev) => {
            const existngProduct = prev.find(p => p.id === product.id);
            if (existngProduct){
                return prev.map(p =>
                    p.id === product.id ? {...p, quantity: p.quantity + 1} :p 
                );
                }
            return [...prev,{...product,quantity: 1}];
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
                    className="shadow appearance-none border rounded-tl-lg rounded-bl-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 font-bold rounded-tr-lg rounded-br-lg"
                >
                    Buscar
                </button>
            </div>
            <div className="bg-white rounded-lg shadow w-full text-center">
                {localProducts.length > 0 ? (
                    localProducts.map((product) => (
                        <div key={product.id} className="rounded-lg border border-gray-400 p-4 mb-2 hover:border-blue-700 transition-colors duration-300 flex justify-between items-center">
                            <p className="font-bold text-gray-500">#{String(product.codeNumber).padStart(5, '0')}</p>
                            <p>{product.name}</p>
                            <p className=" font-bold text-purple-500 ">{product.quantity}</p>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={()=> addProduct(product)}
                                >   <FontAwesomeIcon icon={faCirclePlus}/>
                            </button>
                        </div>
                    ))
                ) : (
                    searched && <p className="text-gray-500 text-center">No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};
