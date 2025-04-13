import { useListSettings } from "../../shared/components/List/useListSettings";
export const Settings = () => {
    const { settings } = useListSettings();
    return (
        <div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {settings?.settings?.map((setting) => (
                        <tr key={setting.id} className="hover:bg-pink-200">
                            <td className="border border-gray-300 p-2 text-center">{setting.name}</td>
                            <td className="border border-gray-300 p-2 text-center">{setting.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
