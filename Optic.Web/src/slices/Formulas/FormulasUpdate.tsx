import { useEffect, useState } from "react";
import { ClientSelect } from "../Clients/ClientSelect";
import { LenTypeSelect } from "./LenTypeSelect";
import { DiagnosisSelect } from "./DiagnosisSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleInfo, faMinus } from "@fortawesome/free-solid-svg-icons";
import { CreateFormulasModel, DiagnosisModel, UpdateFormulasModel } from "./FomulasModel";
import { MultiValue, SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
import { ProductsResponseModel } from "../Products/ProductModel";
import { useFormula, useFormulas } from "./useFormulas";
import useUserContext from "../../shared/context/useUserContext";
import { useParams } from "react-router-dom";
import { Bar } from "../../shared/components/Progress/Bar";
import { FormulaProducts } from "./Common/FormulaProducts";


export const FormulasUpdate = () => {
    const { id } = useParams();
    const [client, setClient] = useState<Option | undefined>();
    const [diagnosis, setDiagnosis] = useState<DiagnosisModel[]>([]);
    const [products, setProducts] = useState<ProductsResponseModel[]>([]);
    const { createFormula } = useFormulas();
    const { formula: formulaData, queryFormula } = useFormula(id);
    const { business } = useUserContext();
    const [formula, setFormula] = useState<UpdateFormulasModel>({
        idBusiness: 0,
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

            if (diagnosisData)
                return;

            setDiagnosis([...diagnosis, { name: newValue.label ?? '', value: '', id: newValue?.value ? parseInt(newValue.value) : 0 }]);
        }
    }

    const handleDeleteDiagnosis = (name: string) => {
        setDiagnosis(diagnosis.filter((x) => x.name !== name));
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

    const getTotalSumaTotal = () => {
        let total = 0;
        total = totalProducts;

        if (formula.priceLens)
            total += formula.priceLens;

        if (formula.priceConsultation)
            total += formula.priceConsultation;

        return total;
    }

    const handleCreateFormula = async () => {
        const formulaData: CreateFormulasModel = {
            ...formula,
            idClient: client?.value ? parseInt(client.value) : 0,
            idBusiness: business?.id ? business.id : 0,
            diagnosis:
                diagnosis.map((x) => {
                    return {
                        name: x.name,
                        value: x.value,
                        id: x.id
                    };
                }),
            products:
                products.map((x) => {
                    return {
                        price: x.unitPrice,
                        unitPrice: x.unitPrice,
                        idProduct: x.id,
                        quantity: x.quantity,

                    };
                }),
            priceLens: formula.priceLens,
            priceConsultation: formula.priceConsultation,
            sumTotal: formula.sumTotal,
            sumTotalProducts: formula.sumTotalProducts

        };

        await createFormula.mutateAsync(formulaData);
    }

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
                        {diagnosis.length > 0 &&
                            <>
                                {diagnosis.map((x) => (
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
                    <textarea name="description" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <FormulaProducts products={products} setProducts={setProducts} />
                <div className="mb-4 text-right">
                    <p>Consulta: <MoneyFormatter amount={formula.priceConsultation} /></p>
                    <p>Lente: <MoneyFormatter amount={formula.priceLens} /></p>
                    <p>Productos: <MoneyFormatter amount={totalProducts} /></p>
                    <p className="font-bold">Total: <MoneyFormatter amount={getTotalSumaTotal()} /></p>
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-1" onClick={handleCreateFormula}>
                        Guardar Cambios
                    </button>
                    <label className="block text-gray-500 text-lg font-bold mb-2">Estado: <FontAwesomeIcon className="text-gray-600" icon={faCircle} /> {formula.state}</label>
                </div>

            </div>
        );
};