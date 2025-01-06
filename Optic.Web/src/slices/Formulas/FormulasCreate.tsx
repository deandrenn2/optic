import { useState } from "react";
import { ClientSelect } from "../Clients/ClientSelect";
import { LenTypeSelect } from "./LenTypeSelect";
import { DiagnosisSelect } from "./DiagnosisSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { CreateFormulasModel, DiagnosisModel, InvoiceDetailModel } from "./FomulasModel";
import { MultiValue, SingleValue } from "react-select";
import { Option } from "../../shared/model";
import { format } from "date-fns";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";

export const FormulasCreate = () => {
    const [client, setClient] = useState<Option | undefined>();
    const [diagnosis, setDiagnosis] = useState<DiagnosisModel[]>([]);
    const [invoiceDetail, setInvoiceDetail] = useState<InvoiceDetailModel[]>([]);

    const [formula, setFormula] = useState<CreateFormulasModel>({
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
    });

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

            setDiagnosis([...diagnosis, { name: newValue.label ?? '', value: '' }]);
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
        setFormula({ ...formula, [name]: value });
    }

    if (formula)
        return (
            <div className="mb-1">
                <div className="grid grid-cols-2 gap-2 mb-2">
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
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 ">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo Lente</label>
                        <LenTypeSelect xChange={handleChangeTypeLen} className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                        <input name="priceConsultation" onChange={handleChange} type="text" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={formula?.priceConsultation} />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Valor del lente {<MoneyFormatter amount={formula?.priceLens} />}</label>
                        <input name="priceLens" onChange={handleChange} type="text" className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" value={formula?.priceLens} />
                    </div>
                </div>
                <div className="mb-0 py-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                    <textarea name="description" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div className="bg-gray-100 py-1 px-2 rounded-lg border border-gray-300">
                    <div className="flex w-full gap-4 justify-between">
                        <h2 className="font-bold text-center text-gray-500 text-lg mb-2 px-2">Facturación</h2>
                        {/* <div className="flex items-center mb-3">
                            <button className="bg-green-500 text-white px-1 py-1 rounded mr-1">+ Reparación</button>
                            <button className="bg-yellow-500 text-white px-1 py-1 rounded">+ Abono</button>
                        </div> */}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">

                        <div className="flex justify-between">
                            <span className="font-bold">MARCO CATERPILLER</span>
                            <input type="text" value="120000"
                                className="border border-gray-300 rounded p-1 ml-6" />
                            <input type="number" value="2"
                                className="w-12 border border-gray-300 rounded p-1 ml-2" />
                            <button className="text-red-500  flex items-center"><i
                                className="fas fa-minus-circle ml-2"></i></button>
                            <p className=" right-0">$400.000</p>

                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">REPARACION LENTES</span>
                            <input type="text" className="border border-gray-300 rounded p-1 ml-6"
                                value="35000" />
                            <input type="number" value="1"
                                className="w-12 border border-gray-300 rounded p-1 ml-2" />
                            <button className="text-red-500  justify-center"><i
                                className="fas fa-minus-circle ml-2 "></i></button>
                            <p className=" right-0"> $400.000</p>
                        </div>
                        <div className="flex justify-end justify-items-end">
                            <p><span className="font-semibold">Total Productos:</span> $520.000</p>
                        </div>
                    </div>

                    <div>

                        <input
                            required
                            name="name"
                            onChange={(e) => handleChange(e)}
                            placeholder="Agregar producto por código"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <p>Consulta: $35.000</p>
                    <p>Productos: $520.000</p>
                    <p>Abono: $0</p>
                    <p className="font-bold">Total: $555.000</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-1">Guardar
                    Cambios
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded " >
                    Cancelar
                </button>
            </div>
        );
};