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
  const [clientStories, setClientStories] = useState<ClientStoryResponseModel[] | undefined>(undefined);


  useEffect(() => {
    const fetchData = async () => {
      if (!isNaN(clientId)) {
        const response = await getClientStories(clientId);
        if (response?.isSuccess) {
          setClientStories(response.data);
        }
      }
    };
    fetchData();
  }, [clientId]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative border-l-4 border-gray-300 ">
        {(clientStories ?? []).map((story) => {
          return (
            <div key={story.id} className="mb-2 ml- flex flex-col gap-2">
              <div className="absolute -left-6 w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center border border-gray-300 ">
                <FontAwesomeIcon className={getStatusColorInvoice(story.state)} icon={faCircle} />
              </div>

              <p className="text-lg font-bold">
                {new Date(story.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-80">
                <div className="grid grid-cols-2 gap-4 text-lg">
                  <p className="text-gray-600 font-bold">#{story.number.toString().padWithZeros(5)}</p>
                  <label className={`block ${getStatusColorInvoice(story.state)} text-lg font-bold mb-2`}>
                    <FontAwesomeIcon className={getStatusColorInvoice(story.state)} icon={faCircle} /> {story.state}
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Tipo Lente</label>
                    <p className="">
                      {story.tags?.join(", ") || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-700   mb-2">Diagnóstico</label>
                    <div className="flex flex-col text-sm font-bold ">
                      {story.diagnosis?.length > 0 ? (
                        story.diagnosis.map((d, index) => (
                          <p key={index} className="mb-1">{d.name}</p>
                        ))
                      ) : (
                        <p>Sin diagnóstico</p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold">{story.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};