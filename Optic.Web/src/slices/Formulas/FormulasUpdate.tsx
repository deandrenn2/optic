import { useEffect, useState } from "react";
import { ClientSelect } from "../Clients/ClientSelect";
import { LenTypeSelect } from "./LenTypeSelect";
import { DiagnosisSelect } from "./DiagnosisSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMinus } from "@fortawesome/free-solid-svg-icons";
import { DiagnosisModel, UpdateFormulasModel } from "./FomulasModel";
import { MultiValue, SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
import { ProductsResponseModel } from "../Products/ProductModel";
import { useFormula, useFormulaMutation } from "./useFormulas";
import useUserContext from "../../shared/context/useUserContext";
import { useParams } from "react-router-dom";
import { Bar } from "../../shared/components/Progress/Bar";
import { FormulaProducts } from "./Common/FormulaProducts";
import { SumTotal } from "./Common/SumTotal";
import { ListStatus } from "./Common/ListStatus";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getStatusColorInvoice } from "./FormulasUtils";
export const FormulasUpdate = () => {
    const { id } = useParams();
    const [client, setClient] = useState<Option | undefined>();
    const [diagnosis, setDiagnosis] = useState<DiagnosisModel[]>([]);
    const [stateFormula, setStateFormula] = useState<string>("Borrador");
    const [products, setProducts] = useState<ProductsResponseModel[]>([]);
    const { updateFormula, updateStateFormula } = useFormulaMutation();
    const { formula: formulaData, queryFormula } = useFormula(id);
    const { business } = useUserContext();
    const [formula, setFormula] = useState<UpdateFormulasModel>({
        idBusiness: 0,
        idInvoice: 0,
        idClient: 0,
        description: "",
        date: new Date(),
        tags: [],
        diagnosis: [],
        products: [],
        priceLens: 0,
        priceConsultation: 0,
        sumTotal: 0,
        state: "Borrador"
    });


    useEffect(() => {
        if (id) {
            if (formulaData) {
                setFormula(formulaData);
                setClient({
                    value: formulaData.idClient?.toString(),
                    label: formulaData.clientName,
                });
                setDiagnosis(formulaData.diagnosis);

                if (formulaData.products) {
                    const products: ProductsResponseModel[] = formulaData.products.map((x) => {
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
    }, [id, formulaData]);

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

    const handleChangeTypeLen = (newValues: MultiValue<Option>) => {
        let values: string[] = [];
        values = newValues.map((x) => {
            return x.value ?? '';
        });
        setFormula({ ...formula, tags: values });
    }

    const handleChangeDiagnosis = (newValue: SingleValue<Option>) => {
        if (newValue) {
            const diagnosisData = diagnosis.find((x) => x.name === newValue.label);

            if (diagnosisData) {
                setDiagnosis([...diagnosis.map((x) => (x.name === diagnosisData.name ? { ...x, stateChange: 0 } : x))]);
                return;
            }

            setDiagnosis([...diagnosis, { name: newValue.label ?? '', value: '', stateChange: 0, id: newValue?.value ? parseInt(newValue.value) : 0 }]);
        }
    }

    const handleDeleteDiagnosis = (name: string) => {
        setDiagnosis(diagnosis.map((x) => (x.name === name ? { ...x, stateChange: 3 } : x)));
    }

    const handleEditDiagnosis = (event: React.ChangeEvent<HTMLInputElement>, diagnosisData: DiagnosisModel) => {
        const { value } = event.target;
        setDiagnosis(diagnosis?.map((x) => (x.name === diagnosisData.name ? { ...x, value } : x)));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = event.target;
        if (name === 'priceLens' || name === 'priceConsultation')
            setFormula({ ...formula, [name]: value ? parseFloat(value) : 0 });
        else
            setFormula({ ...formula, [name]: value });
    }

    const totalProducts = products.reduce((acc, x) => acc + x.salePrice * x.quantity, 0);

    const handleUpdateFormula = async () => {
        const formulaData: UpdateFormulasModel = {
            ...formula,
            id: Number(id),
            idClient: client?.value ? parseInt(client.value) : 0,
            idBusiness: business?.id ? business.id : 0,
            idInvoice: formula.idInvoice,
            diagnosis:
                diagnosis.map((x) => {
                    return {
                        name: x.name,
                        value: x.value,
                        id: x.id,
                        stateChange: x.stateChange
                    };
                }),
            products:
                products.map((x) => {
                    return {
                        price: x.salePrice,
                        unitPrice: x.salePrice,
                        idProduct: x.id,
                        quantity: x.quantity,

                    };
                }),
            priceLens: formula.priceLens,
            priceConsultation: formula.priceConsultation,
            sumTotal: formula.sumTotal,
            sumTotalProducts: formula.sumTotalProducts

        };

        await updateFormula.mutateAsync(formulaData);
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
                const res = await updateStateFormula.mutateAsync({ id: Number(id), state: stateFormula });
                if (res.isSuccess)
                    setFormula({ ...formula, state: stateFormula });
            }

        })
    }

    const diagnosisData = diagnosis.filter((x) => x.stateChange !== 3);

    if (queryFormula.isLoading)
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
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo Lente</label>
                        <LenTypeSelect selectedValue={formula?.tags?.map((x) => ({ value: x, label: x }))} xChange={handleChangeTypeLen} className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Diagnóstico</label>
                        {diagnosisData.length > 0 &&
                            <>
                                {diagnosisData.map((x) => (
                                    <div key={x.id} className="grid gap-1 mb-1 grid-cols-[minmax(50px,_1fr)_minmax(50px,_1fr)_35px]">
                                        <span key={x.id} className="font-bold">{x.name}</span>
                                        <input type="text" onChange={(event) => handleEditDiagnosis(event, x)} className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={x.value} />
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteDiagnosis(x.name)}><FontAwesomeIcon icon={faMinus} /></button>
                                    </div>
                                ))}
                            </>
                        }
                        <div className="flex items-center mb-2">
                            <DiagnosisSelect xChange={handleChangeDiagnosis} className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-4 gap-4">
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Valor de la consulta {<MoneyFormatter amount={formula?.priceConsultation} />}</label>
                        <input name="priceConsultation" onChange={handleChange} onFocus={(e) => e.target.select()} type="number" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={formula?.priceConsultation} />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Valor del lente {<MoneyFormatter amount={formula?.priceLens} />}</label>
                        <input name="priceLens" onChange={handleChange} onFocus={(e) => e.target.select()} type="number" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={formula?.priceLens} />
                    </div>
                </div>
                <div className="mb-0 py-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                    <textarea name="description" value={formula?.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <FormulaProducts products={products} setProducts={setProducts} isCredit={true} saleId={formula.idInvoice}  />
                <SumTotal formula={formula} sumTotalProducts={totalProducts} />
                <div className="flex justify-between gap-0">
                    <div className="flex">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4" onClick={handleUpdateFormula}>
                            {updateFormula.isPending ? "Guardando..." : "Guardar Cambios"}
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