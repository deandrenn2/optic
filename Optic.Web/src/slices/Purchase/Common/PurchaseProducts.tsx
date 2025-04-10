import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar, faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useValidateProduct } from "../../Products/useProducts";
import { ProductsResponseModel } from "../../Products/ProductModel";
import { MoneyFormatter } from "../../../shared/components/Numbers/MoneyFormatter";
import { SearchProduct } from "../../Products/SearchProduct";
import OffCanvas from "../../../shared/components/OffCanvas/Index";
import { Direction } from "../../../shared/components/OffCanvas/Models";
export const PurchaseProducts = ({ products, setProducts, setVisiblePaymment, purVisiblePaymment = true, }:
    { products: ProductsResponseModel[], setProducts: React.Dispatch<React.SetStateAction<ProductsResponseModel[]>>; setVisiblePaymment?: React.Dispatch<React.SetStateAction<boolean>>; purVisiblePaymment?: boolean; }) => {
    const [codeProduct, setCodeProduct] = useState<string>("");
    const { mutationValidateProduct } = useValidateProduct();
    const [visiblePro, setVisiblePro] = useState(false);
    const handleAggregateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await mutationValidateProduct.mutateAsync(codeProduct);
        if (response.isSuccess) {
            if (response.data) {
                const existProduct = products.find(x => x.id === response?.data?.id);
                if (existProduct) {
                    setProducts([...products.filter(x => x.id !== existProduct.id), { ...response.data, quantity: existProduct.quantity + 1 }]);
                } else {
                    setProducts([...products, { ...response.data, quantity: 1 }]);
                }
            }
            setCodeProduct("");
        }
    }

    const handleClose = () => {
        setVisiblePro(false);
    }

    const handleClickPayments = () => {
        if (setVisiblePaymment)
            setVisiblePaymment(true);
    }

    const handleClick = () => {
        setVisiblePro(true);
    }

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { value } = e.target;
        setProducts(products.map((x) => (x.id === id ? { ...x, quantity: parseInt(value) } : x)));
    }

    const handleChangeSalePrice = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { value } = e.target;
        setProducts(products.map((x) => (x.id === id ? { ...x, salePrice: parseFloat(value) } : x)));
    }
    const handleChangeUnitPrice = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { value } = e.target;
        setProducts(products.map((x) => (x.id === id ? { ...x, unitPrice: parseFloat(value) } : x)));
    }
    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter((x) => x.id !== id));
    }

    const totalProducts = products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0);

    return (
        <div className="bg-gray-100 py-1 px-2 rounded-lg border border-gray-300">

            <div className="flex w-full gap-4 justify-between">
                <h2 className="font-bold text-center text-gray-500 text-lg mb-2 px-2">Facturació</h2>

                <div className="flex justify-end justify-items-end">
                    <OffCanvas titlePrincipal='Productos' visible={visiblePro} xClose={handleClose} position={Direction.Right}>
                        <SearchProduct setProducts={setProducts} />
                    </OffCanvas>
                    <div>
                        <button className="bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 py1 px-3 mb-2" onClick={handleClick}>
                            <FontAwesomeIcon icon={faSearch} className="mr-1" /> Producto
                        </button>
                    </div>

                    {purVisiblePaymment &&
                        <div className=" " onClick={handleClickPayments}>
                            <button className="bg-teal-500 text-white mr-2 py1 px-3 rounded hover:bg-teal-600 mb-2" ><FontAwesomeIcon icon={faDollar} className="mr-1" />Abono</button>
                        </div>
                    }
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
                <div className="grid grid-cols-[3fr_3fr_3fr_3fr_1fr] gap-2">
                    <span className="font-bold">Producto</span>
                    <label className="text-gray-600 text-sm">Precio de Venta.</label>
                    <label className="text-gray-600 text-sm">Cantidad</label>
                    <label className="text-gray-600 text-sm">Precio costo</label>
                </div>
                {
                    products.map((x) => (
                        <div key={x.id} className="grid grid-cols-[3fr_3fr_3fr_3fr_3fr] gap-2 justify-center align-middle ">
                            <span className="font-bold">{x.name}</span>
                            <input type="text" className="border border-gray-300 rounded p-1 ml-1"
                                value={x.salePrice}
                                onChange={(e) => handleChangeSalePrice(e, x.id)} />
                            <div className="flex justify-center">
                                <input type="number" value={x.quantity}
                                    onChange={(e) => handleChangeQuantity(e, x.id)}
                                    min={0} max={999}
                                    className="w-14 border border-gray-300 rounded p-1 ml-2" />
                            </div>

                            <input type="number" value={x.unitPrice}
                                onChange={(e) => handleChangeUnitPrice(e, x.id)}
                                min={0} max={999}
                                className="w-32 border border-gray-300 rounded p-1 ml-1" />

                            <p className="text-right"><MoneyFormatter amount={x.salePrice * x.quantity} />    <button className="w-8 bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteProduct(x.id)} ><FontAwesomeIcon icon={faMinus} /></button></p>


                        </div>
                    ))
                }
                <div className="flex justify-end justify-items-end">
                    <p><span className="font-semibold">Total Productos:</span> <MoneyFormatter amount={totalProducts} /></p>
                </div>
            </div>

            <div>
                <form onSubmit={handleAggregateProduct} onClick={(e) => e.preventDefault()}>
                    <input
                        required
                        name="name"
                        type="number"
                        onChange={(e) => setCodeProduct(e.target.value)}
                        value={codeProduct}
                        placeholder="Agregar producto por código"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </form>
            </div>
        </div>
    );

};  