import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter";
import { useCreatePayment, useDeletePayment } from "./useSales";
import { format } from "date-fns";
import { SalesPaymentsModel } from "./SalesModel";
export const SalesPayments = ({ Id, totalFactura, payments }: { Id: number; totalFactura: number; payments: SalesPaymentsModel[] }) => {
  const [amount, setAmount] = useState<number>(0);
  const { createPayment } = useCreatePayment(Id);
  const { deletePayment } = useDeletePayment(Id);

  const handleAddAbono = async () => {
    
    if (amount <= 0 || isNaN(amount)) return;
    createPayment.mutate({
      invoiceId: Id,
      amount: amount,
    });

    setAmount(0);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const amount = parseFloat(value);
    const debt = totalFactura - totalPayments;
    if (isNaN(amount)) return;

    if (amount > debt) {
      setAmount(debt);
      return;
    }

    setAmount(amount);
  };

  const handleDelete = (id: number) => {
    deletePayment.mutate(id);
  };

  const totalPayments = payments.reduce((total, abono) => total + abono.amount, 0);

  return (
    <div className="grid-cols-2 mb-4 gap-4">
      <label className="block text-gray-700 font-bold mb-2">
        <MoneyFormatter amount={amount} />
      </label>
      <div className="flex rounded-lg w-full">
        <div className="relative">
          <input
            type="number"
            placeholder="Abono"
            value={amount}
            onChange={handleChangeAmount}
            className="shadow appearance-none border rounded-tl-lg rounded-bl-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddAbono}
          className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-1 font-bold rounded-tr-lg rounded-br-lg w-full"
        >
          Agregar
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Factura total: <MoneyFormatter amount={totalFactura} />
        </h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Abonos: <span className="text-green-600"><MoneyFormatter amount={totalPayments} /></span>
        </h3>
        <h3 className="text-lg font-semibold text-gray-700">
          Deuda: <span className="text-red-600"><MoneyFormatter amount={totalFactura - totalPayments} /></span>
        </h3>

        <div>
          <ul className="mt-2 space-y-1">
            {payments.length > 0 ? (
              payments.map((abono) => (
                <li
                  key={abono.id}
                  className="flex justify-between items-center border-b border-gray-300 py-2"
                >
                  <p className="text-sm text-gray-500">
                    {format(new Date(abono.date), "d 'de'  MMMM',' uuu")}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MoneyFormatter amount={abono.amount} />
                    <button
                      className="text-red-500 text-2xl hover:text-red-700 "
                      onClick={() => handleDelete(abono.id)}
                    >
                      <FontAwesomeIcon icon={faCircleMinus} />
                    </button>
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No se han realizado abonos aún.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
