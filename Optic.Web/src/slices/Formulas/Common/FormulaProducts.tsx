import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MoneyFormatter } from "../../../shared/components/Numbers/MoneyFormatter";
import { ProductsResponseModel } from "../../Products/ProductModel";
import { faDollar, faMinus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useValidateProduct } from "../../Products/useProducts";
import OffCanvas from "../../../shared/components/OffCanvas/Index";
import { Direction } from "../../../shared/components/OffCanvas/Models";
import { SearchProduct } from "../../Products/SearchProduct";
export const FormulaProducts = ({ products, setProducts, setVisiblePaymment, isVisiblePaymment = false, disabled = false }:
    {
        products: ProductsResponseModel[];
        setProducts: React.Dispatch<React.SetStateAction<ProductsResponseModel[]>>;
        setVisiblePaymment?: React.Dispatch<React.SetStateAction<boolean>>;
        isVisiblePaymment?: boolean;
        disabled?: boolean;
    }) => {
    const [codeProduct, setCodeProduct] = useState<string>("");
    const { mutationValidateProduct } = useValidateProduct();
    const [visible, setVisible] = useState(false);


    const handleAggregateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await mutationValidateProduct.mutateAsync({ code: codeProduct, validateQuantity: true });
        if (response.isSuccess) {
            if (response.data) {
                const existProduct = products.find(x => x.id === response?.data?.id);
                if (existProduct) {
                    const productQuantity = existProduct?.originalQuantity ?? 0;
                    const newQuantity = productQuantity < existProduct.quantity + 1 ? productQuantity : existProduct.quantity + 1;
                    setProducts([...products.filter(x => x.id !== existProduct.id), { ...response.data, quantity: newQuantity, originalQuantity: productQuantity }]);
                } else {
                    setProducts([...products, { ...response.data, quantity: 1, originalQuantity: response.data.quantity }]);
                }
            }
            setCodeProduct("");
        }
    }

    const handleClose = () => {
        setVisible(false)
    }
    const handleClick = () => {
        setVisible(true);
    }

    const handleClickPayments = () => {
        if (setVisiblePaymment)
            setVisiblePaymment(true);
    }


    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { value } = e.target;
        const productQuantity = products.find(x => x.id === id)?.originalQuantity ?? 0;
        const newQuantity = productQuantity < parseInt(value) ? productQuantity : parseInt(value);
        setProducts(products.map((x) => (x.id === id ? { ...x, quantity: newQuantity } : x)));
    }

    const handleChangeSalePrice = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { value } = e.target;
        setProducts(products.map((x) => (x.id === id ? { ...x, salePrice: parseFloat(value) } : x)));
    }

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter((x) => x.id !== id));
    }

    const totalProducts = products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0);

    return (
        <div className="bg-gray-100 pt-2 p-4 rounded-lg border border-gray-300">
            <div className="flex w-full gap-4 justify-between mb-3">
                <h2 className="font-bold text-center text-gray-500 text-lg">Facturación</h2>
                <div className="flex justify-end justify-items-end">
                    {
                        !disabled &&
                        <>
                            <OffCanvas titlePrincipal='Productos' visible={visible} xClose={handleClose} position={Direction.Right}  >
                                <SearchProduct setProducts={setProducts} />
                            </OffCanvas>
                            <button className="bg-blue-500 text-white  rounded hover:bg-blue-600 mr-2 py1 px-3" onClick={handleClick}>
                                <FontAwesomeIcon icon={faSearch} className="mr-1" />
                                Producto
                            </button>
                        </>
                    }
                    {isVisiblePaymment &&
                        <button className="bg-teal-500 text-white  rounded hover:bg-teal-600 mr-2 py1 px-3" onClick={handleClickPayments}>
                            <FontAwesomeIcon icon={faDollar} className="mr-1" /> Abono
                        </button>}

                </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
                {
                    products.map((x) => (
                        <div key={x.id} className={`grid grid-cols-4 gap-2 mb-1`}>
                            <span className="font-bold">{x.name}</span>
                            <div className="flex justify-end items-center">
                                <input type="text" className="border border-gray-300 rounded p-1 ml-6"
                                    value={x.salePrice}
                                    disabled={disabled}
                                    onChange={(e) => handleChangeSalePrice(e, x.id)} />
                            </div>
                            <div className="flex justify-end items-center">
                                <input type="number" value={x.quantity}
                                    onChange={(e) => handleChangeQuantity(e, x.id)}
                                    min={0} max={999}
                                    disabled={disabled}
                                    className="w-14 border border-gray-300 rounded p-1 ml-2" />
                            </div>
                            <div className="flex justify-end items-center">
                                <MoneyFormatter amount={x.salePrice * x.quantity} />
                                {
                                    !disabled &&
                                    <div className="flex justify-end ml-2">
                                        <button className="w-8 bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteProduct(x.id)} ><FontAwesomeIcon icon={faMinus} /></button>
                                    </div>
                                }
                            </div>

                        </div>
                    ))
                }
                <div className="flex justify-end justify-items-end">
                    <p><span className="font-semibold">Total Productos:</span> <MoneyFormatter amount={totalProducts} /></p>
                </div>
            </div>
            {!disabled &&
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
            }
        </div>
    );
};  