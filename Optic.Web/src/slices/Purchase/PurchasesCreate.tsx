import { useState } from "react";
import { SupplierSelect } from "../Suppliers/SupplierSelect";
import { CreatePurchaseModel } from "./PurchaseModel";
import { SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import { usePurchaseMutation } from "./usePurchases";
import useUserContext from "../../shared/context/useUserContext";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { ListPaymentTypes } from "../Sales/Common/ListPaymentTypes";
import { SumTotal } from "../Sales/Common/SumTotal";
import { ProductsResponseModel } from "../Products/ProductModel";
import { SuppliersForm } from "../Suppliers/SuppliersForm";
import { PurchaseProducts } from "./Common/PurchaseProducts";
import { ProductForm } from "../Products/ProductsForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const PurchasesCreate = ({ xChange }: { xChange?: () => void }) => {
    const [supplier, setSupplier] = useState<Option | undefined>();
    const [products, setProducts] = useState<ProductsResponseModel[]>([]);
    const { createPurchase } = usePurchaseMutation();
    const { business } = useUserContext();
    const [visibleModalSupplier, setVisibleModalSupplier] = useState(false);
    const [visibleModalProduct, setVisibleModalProduct] = useState(false);
    const navigate = useNavigate();
    const [purchase, setPurchase] = useState<CreatePurchaseModel>({
        idBusiness: 0,
        supplierId: 0,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        products: [],
        sumTotal: 0,
        paymentType: "Contado",
    });

    const handleChangeSupplier = (newValue: SingleValue<Option>) => {
        setSupplier({
            value: newValue?.value,
            label: newValue?.label,
        });
    };

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPurchase({ ...purchase, date: new Date(`${e.target.value}T00:00:00`) });
    };


    const totalProducts = products.reduce((acc, x) => acc + x.unitPrice * x.quantity, 0);

    const handleCreatePurchase = async () => {
        const purchaseData: CreatePurchaseModel = {
            idBusiness: business?.id ? business.id : 0,
            supplierId: supplier?.value ? parseInt(supplier.value) : 0,
            date: purchase.date,
            products: products.map((x) => ({
                idProduct: x.id,
                quantity: x.quantity,
                price: x.unitPrice,
                priceSale: x.salePrice,
                totalCost: x.unitPrice * x.quantity,

            })),
            sumTotal: totalProducts,
            paymentType: purchase.paymentType,
        };

        const res = await createPurchase.mutateAsync(purchaseData);
        if (res.isSuccess) {
            Swal.fire({
                title: '¿Quieres mantenerte en esta ventana o ir al detalle de la factura?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir al detalle',
                cancelButtonText: 'Cerrar',
                preConfirm: async () => {
                    navigate(`/Purchases/${res.data}`);
                }
            });

            if (xChange)
                xChange();

        }
    };


    return (
        <div className="mb-1">
            <div className="grid grid-cols-3 gap-2 mb-2">
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

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-1" onClick={handleCreatePurchase}>
                {createPurchase.isPending ? "Comprando..." : "Comprar"}
            </button>
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded mr-1" onClick={() => setVisibleModalSupplier(true)}>
                Crear Proveedor
            </button>
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded mr-1" onClick={() => setVisibleModalProduct(true)}>
                Crear Producto
            </button>

            <OffCanvas titlePrincipal='Registro de Proveedor' visible={visibleModalSupplier} xClose={() => setVisibleModalSupplier(false)} position={Direction.Right}>
                <SuppliersForm />
            </OffCanvas>
            <OffCanvas titlePrincipal='Registro de Producto' visible={visibleModalProduct} xClose={() => setVisibleModalProduct(false)} position={Direction.Right}>
                <ProductForm />
            </OffCanvas>
        </div>
    );
};


