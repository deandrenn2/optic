import { useEffect, useState } from "react";
import { SupplierSelect } from "../Suppliers/SupplierSelect";
import { UpdatePurchaseModel } from "./PurchaseModel";
import { SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import useUserContext from "../../shared/context/useUserContext";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { ListPaymentTypes } from "../Sales/Common/ListPaymentTypes";
import { SumTotal } from "../Sales/Common/SumTotal";
import { ProductsResponseModel } from "../Products/ProductModel";
import { SuppliersForm } from "../Suppliers/SuppliersForm";
import { PurchaseProducts } from "./Common/PurchaseProducts";
import { ProductForm } from "../Products/ProductsForm";
import { usePurchase, usePurchaseMutation } from "./usePurchases";
import { useParams } from "react-router-dom";
import { Bar } from "../../shared/components/Progress/Bar";
import { ListStatus } from "../Formulas/Common/ListStatus";
import { getStatusColorInvoice } from "../Formulas/FormulasUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const PurchaseUpdate = ({ xChange }: { xChange?: () => void }) => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState<Option | undefined>();
    const [products, setProducts] = useState<ProductsResponseModel[]>([]);
    const [statePurchase, setStatePurchase] = useState<string>("Borrador");
    const { updatePurchase, updateStatePurchase } = usePurchaseMutation();
    const { purchase: purchaseData, queryPurchase } = usePurchase(id);
    const { business } = useUserContext();
    const [visibleModalSupplier, setVisibleModalSupplier] = useState(false);
    const [visibleModalProduct, setVisibleModalProduct] = useState(false);

    const [purchase, setPurchase] = useState<UpdatePurchaseModel>({
        id: 0,
        idBusiness: 0,
        supplierId: 0,
        date: new Date(),
        products: [],
        totalAmount: 0,
        paymentType: "Contado",
        state: "Borrador"
    });

    useEffect(() => {
        if (id) {
            if (purchaseData) {
                setPurchase(purchaseData);
                setSupplier({
                    value: purchaseData.idSupplier?.toString(),
                    label: purchaseData.supplierName,
                });

                if (purchaseData.products) {
                    const products: ProductsResponseModel[] = purchaseData.products.map((x) => {
                        return {
                            id: x.idProduct,
                            name: x.productName || '',
                            idBrand: 0,
                            codeNumber: '',
                            quantity: x.quantity,
                            unitPrice: 0,
                            salePrice: x.unitPrice,
                            idSupplier: 0,
                            categories: []
                        }
                    });
                    setProducts(products);
                }
            }
        }
    }, [id, purchaseData]);


    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            body.style.overflowY = "auto";
        }
    }, []);

    const handleChangeSupplier = (newValue: SingleValue<Option>) => {
        setSupplier({
            value: newValue?.value,
            label: newValue?.label,
        });
    };

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPurchase({ ...purchase, date: new Date(`${e.target.value}T00:00:00`) });
    };

    const totalProducts = products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0);

    const handleUpdatePurchase = async () => {
        const purchaseData: UpdatePurchaseModel = {
            ...purchase,
            id: Number(id),
            supplierId: supplier?.value ? parseInt(supplier.value) : 0,
            idBusiness: business?.id ? business.id : 0,
            totalAmount: purchase.totalAmount,
        };

        const res = await updatePurchase.mutateAsync(purchaseData);
        if (res.isSuccess && xChange) xChange();
    };

    const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatePurchase(e.target.value);
    }

    const handleChangeStatus = () => {
        if (statePurchase === '') {
            toast.info('Debes seleccionar un estado antes de cambiar el estado');
            return;
        }
        Swal.fire({
            title: "Cambiar estado",
            text: `¿Estás seguro de que quieres cambiar el estado a ${statePurchase}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const res = await updateStatePurchase.mutateAsync({ id: Number(id), state: statePurchase });
                if (res.isSuccess)
                    setPurchase({ ...purchase, state: statePurchase });
            }

        })
    }

    if (queryPurchase.isLoading)
        return <Bar Title="Cargando..." />;

    return (
        <div className="mb-1">
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Proveedor</label>
                    <SupplierSelect
                        selectedValue={supplier?.value || ""}
                        xChange={(e) => {
                            const selectElement = e.target as HTMLSelectElement;
                            handleChangeSupplier({
                                value: selectElement.value,
                                label: selectElement.options[selectElement.selectedIndex].text,
                            });
                        }}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                    <input
                        type="date"
                        onChange={handleChangeDate}
                        value={format(purchase?.date, "yyyy-LL-dd")}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de pago</label>
                    <ListPaymentTypes selectedValue={purchase?.paymentType} xChange={(e) => setPurchase({ ...purchase, paymentType: e.target.value })} />
                </div>
            </div>

            <PurchaseProducts products={products} setProducts={setProducts} />
            <SumTotal sumTotalProducts={totalProducts} />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-1" onClick={handleUpdatePurchase}>
                {updatePurchase.isPending ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded mr-1" onClick={() => setVisibleModalSupplier(true)}>
                Crear Proveedor
            </button>
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded mr-1" onClick={() => setVisibleModalProduct(true)}>
                Crear Producto
            </button>

            <div className="flex rounded overflow-hidden">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2" onClick={handleChangeStatus}>
                    Cambiar estado
                </button>
                <ListStatus className="w-auto border border-gray-300 shadow-sm px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" name="state" xChange={handleSelectStatus} status={purchase.state} />
            </div>

            <label className={`block ${getStatusColorInvoice(purchase.state)} text-lg font-bold mb-2`}><FontAwesomeIcon className={getStatusColorInvoice(purchase.state)} icon={faCircle} /> {purchase.state}</label>

            <OffCanvas titlePrincipal='Registro de Proveedor' visible={visibleModalSupplier} xClose={() => setVisibleModalSupplier(false)} position={Direction.Right}>
                <SuppliersForm />
            </OffCanvas>
            <OffCanvas titlePrincipal='Registro de Producto' visible={visibleModalProduct} xClose={() => setVisibleModalProduct(false)} position={Direction.Right}>
                <ProductForm />
            </OffCanvas>
        </div>
    );
};


