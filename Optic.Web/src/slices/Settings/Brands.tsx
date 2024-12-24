import { useListSettings } from "../../shared/components/List/useListSettings";
export const Brands = () => {
    const { settings } = useListSettings();

    return (
        <div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Marca</th>
                    </tr>
                </thead>
                <tbody>
                    {settings?.brands?.map((brand) => (
                        <tr key={brand.id}>
                            <td className="border border-gray-300 p-2 text-center">{brand.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}