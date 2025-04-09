import { useState } from "react";
import { ClientSelect } from "../Clients/ClientSelect";
import { CreateSaleModel } from "./SalesModel";
import { SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import { ProductsResponseModel } from "../Products/ProductModel";
import { useSalesMutation } from "./useSales";
import useUserContext from "../../shared/context/useUserContext";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { ClientForm } from "../Clients/ClientForm";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { FormulaProducts } from "../Formulas/Common/FormulaProducts";
import { ListPaymentTypes } from "./Common/ListPaymentTypes";
import { SumTotal } from "./Common/SumTotal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const SalesCreate = ({ xChange }: { xChange?: () => void }) => {
    const [client, setClient] = useState<Option | undefined>();
    const [products, setProducts] = useState<ProductsResponseModel[]>([]);
    const { createSale } = useSalesMutation();
    const { business } = useUserContext();
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const [formula, setFormula] = useState<CreateSaleModel>({
        idBusiness: 0,
        idClient: 0,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        products: [],
        sumTotal: 0,
        paymentType: "Contado",
    });

    const handleClose = () => {
        setVisible(false);
    }

    const handleClick = () => {
        setVisible(true);
    }

    const handleChangeClient = (newValue: SingleValue<Option>) => {
        setClient({
            value: newValue?.value,
            label: newValue?.label,
        });
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log(value);
        setFormula({ ...formula, date: new Date(`${value}T00:00:00`) });
    }


    const handleCreateSale = async () => {
        const formulaData: CreateSaleModel = {
            ...formula,
            idClient: client?.value ? parseInt(client.value) : null,
            idBusiness: business?.id ? business.id : 0,
            products:
                products.map((x) => {
                    return {
                        price: x.salePrice,
                        unitPrice: x.salePrice,
                        idProduct: x.id,
                        quantity: x.quantity,
                    };
                }),
            sumTotal: products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0),

        };

        const res = await createSale.mutateAsync(formulaData);

        if (res.isSuccess) {
            Swal.fire({
                title: '¿Quieres mantenerte en esta ventana o ir al detalle de la factura?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir al detalle',
                cancelButtonText: 'Cerrar',
                preConfirm: async () => {
                    navigate(`/Sales/${res.data}`);
                }
            });

            if (xChange)
                xChange();

        }


    }

    const handleChangePaymentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormula({ ...formula, paymentType: e.target.value });
    }

    //Calculos
    const totalProducts = products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0);

    if (formula)
        return (
            <div className="mb-1">
                <div className="grid grid-cols-3 gap-2 mb-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
                        <ClientSelect selectedValue={client} xChange={handleChangeClient} className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                        <div className="relative">
                            <input type="date" onChange={handleChangeDate}
                                value={format(formula?.date, 'yyyy-LL-dd')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <i className="fas fa-calendar-alt absolute right-1 top-2 text-gray-400"></i>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de pago</label>
                        <ListPaymentTypes selectedValue={formula?.paymentType} xChange={handleChangePaymentType} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>
                <FormulaProducts products={products} setProducts={setProducts} />
                <SumTotal sumTotalProducts={totalProducts} />

                <OffCanvas titlePrincipal='Registro de Cliente' visible={visible} xClose={handleClose} position={Direction.Right}  >
                    <ClientForm />
                </OffCanvas>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-1" onClick={handleCreateSale}>
                    {createSale.isPending ? "Vendiendo..." : "Vender"}
                </button>
                <button className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded mr-1"
                    onClick={handleClick}
                >Crear Cliente</button>
            </div>
        );
};