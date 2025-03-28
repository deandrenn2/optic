import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientStoryResponseModel } from "./ClientModel";
import { getClientStories } from "./ClientServices";
import { getStatusColorInvoice } from "../Formulas/FormulasUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export const ClientStory = () => {
  const { id } = useParams();
  const clientId = Number(id);
  const [clientStories, setClientStories] = useState<ClientStoryResponseModel[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(clientId)) {
        setError("ID de cliente no válido.");
        setLoading(false);
        return;
      }

      try {
        const response = await getClientStories(clientId);
        console.log("Datos recibidos:", response);

        if (response?.isSuccess) {
          setClientStories(response.data ?? []);
        } else {
          setError("Error al obtener los datos.");
        }
      } catch (err) {
        console.error("Error en la API:", err);
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando historias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!clientStories || clientStories.length === 0) {
    return <p className="text-center text-gray-500">No hay historias disponibles</p>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl xl ">
      <div className="relative border-l-4 border-gray-300">
        {clientStories.map((story) => (
          <div key={story.id ?? crypto.randomUUID()} className="mb-8 ml-6 flex flex-col gap-2">
            <div className="absolute -left-6 w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center border border-gray-300">
              <FontAwesomeIcon className={getStatusColorInvoice(story.state)} icon={faCircle} />
            </div>

            <p className="text-lg font-bold p-2">
              {story.date
                ? new Date(story.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
                : "Fecha no disponible"}
            </p>

            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-80">
              <div className="grid grid-cols-2 gap-4 text-lg">
                <p className="text-gray-600 font-bold"># {story.number ?? "N/A"}</p>
                <label className={`block ${getStatusColorInvoice(story.state)} text-lg font-bold mb-2`}>
                  <FontAwesomeIcon className={getStatusColorInvoice(story.state)} icon={faCircle} /> {story.state}
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tipo Lente</label>
                  <p>{story.tags?.length ? story.tags.join(", ") : "N/A"}</p>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Diagnóstico</label>
                  <div className="flex flex-col text-sm font-bold">
                    {story.diagnosis?.length ? (
                      story.diagnosis.map((d, index) => <p key={index} className="mb-1">{d.name}</p>)
                    ) : (
                      <p>Sin diagnóstico</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold">{story.description ?? "Sin descripción"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
