import { MoneyFormatter } from "../../shared/components/Numbers/MoneyFormatter"

export const PurchasePayments = () => {
    return (
        <div className="grid-cols-2 mb-4 gap-4">
            <label className="block text-gray-700 font-bold mb-2">
                <MoneyFormatter/>
            </label>
            <div className="flex rounded-lg w-full">
        <div className="relative">
          <input
            type="number"
            placeholder="Abono"
            className="shadow appearance-none border rounded-tl-lg rounded-bl-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-3 font-bold rounded-tr-lg rounded-br-lg w-full">
          Agregar
        </button>
      </div>
            <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-700">
                    Factura Total:
                </h3>

                <h3 className="text-lg font-bold text-gray-700">
                    Abono de Venta:
                </h3>

                <h3 className=" text-gl font-bold text-gray-700">
                    Dueda:
                </h3>

                <div className="">
                    <ul className="mt-2 space-y-2">

                    </ul>
                </div>
            </div>

        </div>
    )
}