import axios from 'axios';
import { getToken } from '.';
const apiUrl = import.meta.env.VITE_API_URL;
export const fileDownloadServices = async (urlBlob: string, fileName?: string): Promise<number> => {
   const response = await axios({
      url: urlBlob,
      baseURL: apiUrl,
      method: 'POST',
      headers: {
         Authorization: getToken() ? `Bearer ${getToken()}` : '',
      },
      responseType: 'blob',
   });

   if (response.status !== 200) {
      return response.status;
   }

   const dataFile = new Blob([response.data]);

   const urlLink = window.URL.createObjectURL(dataFile);

   if (!fileName && response.headers['content-disposition']) {
      fileName = getNameFile(response.headers['content-disposition']);
      console.log(fileName, 'name content disposition');
   }

   const link = document.createElement('a');
   link.href = urlLink;
   link.setAttribute('download', fileName ?? '');
   document.body.appendChild(link);
   link.click();

   return response.status;
};

const getNameFile = (contentDisposition: string | null) => {
   if (!contentDisposition) return 'reporte.xlsx'; // Valor por defecto si no hay header

   const match = contentDisposition.match(/filename="?([^";]+)"?/i);
   return match ? match[1] : 'reporte.xlsx'; // Retorna el nombre o uno por defecto
};
