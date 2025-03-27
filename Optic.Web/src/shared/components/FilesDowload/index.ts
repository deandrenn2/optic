import { toast } from 'react-toastify';
import { fileDownloadServices } from './FileDownloadServices';

export const getToken = () => {
   return '';
};

const idNotifyDowload = 'notify-download';
export const useFileDownload = () => {
   const descargarArchivo = async (urlBlob: string, fileName?: string) => {
      toast.info('Descargando...', {
         toastId: idNotifyDowload,
         autoClose: false,
         isLoading: true,
      });
      const resStatus = await fileDownloadServices(urlBlob, fileName);

      if (resStatus !== 200) {
         toast.error('Se ha presentado un error al intentar descargar');
      }

      toast.dismiss(idNotifyDowload);
   };

   const getIconFileExtension = (extension: string) => {
      if (extension.includes('xlsx')) return ['fa fa-file-excel-o', 'text-green'];

      if (extension.includes('docx')) return ['fa fa-file-word-o', 'text-light-blue'];

      if (extension.includes('pdf')) return ['fa fa-file-pdf-o', 'text-red'];

      if (extension.includes('png') || extension.includes('jpg')) return ['fa  fa-file-image-o', 'text-aqua'];

      if (extension.includes('mp4')) return ['fa  fa-file-image-o', 'text-aqua'];

      return ['fa fa-file', 'text-muted'];
   };

   const getExtension = (url: string) => {
      if (!url) {
         return '';
      }
      return url && url.substring(url.lastIndexOf('.'), url.length);
   };

   return {
      descargarArchivo,
      getIconFileExtension,
      getExtension,
   };
};
