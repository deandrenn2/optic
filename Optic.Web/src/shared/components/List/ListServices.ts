import { ApiClient } from '../../helpers/ApiClient';

export const getList = async (page: number, limit: number) => {
   const url = `/api/list/getList?page=${page}&limit=${limit}`;
   const response = await ApiClient.get(url);
   return response;
};
