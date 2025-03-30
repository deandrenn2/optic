import { useEffect, useState } from "react";
import { ClientSelect } from "../Clients/ClientSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import { ProductsResponseModel } from "../Products/ProductModel";
import useUserContext from "../../shared/context/useUserContext";
import { useParams } from "react-router-dom";
import { Bar } from "../../shared/components/Progress/Bar";
import { SumTotal } from "./Common/SumTotal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getStatusColorInvoice } from "./SalesUtils";
import { UpdateSaleModel } from "./SalesModel";
import { useSale, useSalesMutation } from "./useSales";
import { ListStatus } from "./Common/ListStatus";
import { FormulaProducts } from "../Formulas/Common/FormulaProducts";


export const SalesUpdate = () => {
    const { id } = useParams();
    const [client, setClient] = useState<Option | undefined>();
    const [stateFormula, setStateFormula] = useState<string>("Borrador");
    const [products, setProducts] = useState<ProductsResponseModel[]>([]);
    const { updateSale, updateStateSale } = useSalesMutation();
    const { sale: saleData, querySale } = useSale(id);
    const { business } = useUserContext();
    const [formula, setFormula] = useState<UpdateSaleModel>({
        id: 0,
        number: 0,
        idBusiness: 0,
        idClient: 0,
        date: new Date(),
        sumTotal: 0,
        paymentType: "Contado",
        products: [],
        state: "Borrador"
    });


    useEffect(() => {
        if (id) {
            if (saleData) {
                setFormula(saleData);
                setClient({
                    value: saleData.idClient?.toString(),
                    label: saleData.clientName,
                });

                if (saleData.products) {
                    const products: ProductsResponseModel[] = saleData.products.map((x) => {
                        return {
                            id: x.idProduct,
                            name: x.productName || '',
                            idBrand: 0,
                            codeNumber: '',
                            quantity: x.quantity,
                            unitPrice: 0,
                            salePrice: x.price,
                            idSupplier: 0,
                            categories: []
                        }
                    });
                    setProducts(products);
                }


            }
        }
    }, [id, saleData]);

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            body.style.overflowY = "auto";
        }
    }, []);



    const handleChangeClient = (newValue: SingleValue<Option>) => {
        setClient({
            value: newValue?.value,
            label: newValue?.label,
        });
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormula({ ...formula, date: new Date(`${value}T00:00:00`) });
    }

    const totalProducts = products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0);

    const handleUpdateFormula = async () => {
        const saleData: UpdateSaleModel = {
            ...formula,
            id: Number(id),
            idClient: client?.value ? parseInt(client.value) : 0,
            idBusiness: business?.id ? business.id : 0,
            sumTotal: formula.sumTotal,
        };

        await updateSale.mutateAsync(saleData);
    }

    const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStateFormula(e.target.value);
    }

    const handleChangeStatus = () => {
        if (stateFormula === '') {
            toast.info('Debes seleccionar un estado antes de cambiar el estado');
            return;
        }
        Swal.fire({
            title: "Cambiar estado",
            text: `¿Estás seguro de que quieres cambiar el estado a ${stateFormula}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const res = await updateStateSale.mutateAsync({ id: Number(id), state: stateFormula });
                if (res.isSuccess)
                    setFormula({ ...formula, state: stateFormula });
            }

        })
    }


    if (querySale.isLoading)
        return <Bar Title="Cargando..." />;

    if (formula)
        return (
            <div className="mb-1">
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
                        <ClientSelect isDisabled={true} selectedValue={client} xChange={handleChangeClient} className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                        <div className="relative">
                            <input type="date" onChange={handleChangeDate}

                                value={format(formula?.date, 'yyyy-LL-dd')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <i className="fas fa-calendar-alt absolute right-1 top-2 text-gray-400"></i>
                        </div>
                    </div>
                </div>


                <FormulaProducts products={products} setProducts={setProducts} />
                <SumTotal sumTotalProducts={totalProducts} />
                <div className="flex justify-between gap-0">
                    <div className="flex">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4" onClick={handleUpdateFormula}>
                            {updateSale.isPending ? "Guardando..." : "Guardar Cambios"}
                        </button>
                        <div className="flex rounded overflow-hidden">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2" onClick={handleChangeStatus}>
                                Cambiar estado
                            </button>
                            <ListStatus className="w-auto border border-gray-300 shadow-sm px-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" name="state" xChange={handleSelectStatus} status={formula.state} />
                        </div>
                    </div>

                    <label className={`block ${getStatusColorInvoice(formula.state)} text-lg font-bold mb-2`}><FontAwesomeIcon className={getStatusColorInvoice(formula.state)} icon={faCircle} /> {formula.state}</label>
                </div>

            </div>
        );
};