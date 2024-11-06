import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getToken = () => {
    return "";
}

export const ApiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: getToken()? `Bearer ${getToken()}`: "",
    }
});