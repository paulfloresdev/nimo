import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from 'qs';
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const baseUrl = import.meta.env.VITE_SITE_BASE_API_URL_BACKEND;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: false
});

axiosInstance.interceptors.response.use(
    function (response: AxiosResponse) {
        return response.data;
    },
    function (error: any) {
        // Obtener mensaje personalizado según el código de estado
        let message: string;
        switch (error.response?.status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 401:
                message = "Invalid credentials";
                localStorage.removeItem("user");
                window.location.href = '/login';
                break;
            case 404:
                message = "Sorry! the data you are looking for could not be found";
                break;
            case 400:
                const errors = error.response?.data;
                message = errors && errors.length > 0 ? errors[0] : "Bad Request";
                break;
            default:
                message = error.response?.data?.errors || error.message || "An unknown error occurred";
        }

        // Adjunta el mensaje al objeto original y reenvíalo
        error.customMessage = message;
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Accept-Language'] = 'es-MX';
        return config;
    },
    function (error: any) {
        return Promise.reject(error);
    }
);

class APIClient {
    get = (url: string, params?: Record<string, any>): Promise<AxiosResponse> => {
        let response: Promise<AxiosResponse>;

        if (params) {
            const queryString = qs.stringify(params, { arrayFormat: 'comma' });
            response = axiosInstance.get(`${url}?${queryString}`);
        } else {
            response = axiosInstance.get(url);
        }

        return response;
    };

    create = (url: string, data: any): Promise<AxiosResponse> => {
        return axiosInstance.post(url, data);
    };

    update = (url: string, data: any): Promise<AxiosResponse> => {
        return axiosInstance.patch(url, data);
    };

    put = (url: string, data: any): Promise<AxiosResponse> => {
        return axiosInstance.put(url, data);
    };

    delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return axiosInstance.delete(url, { ...config });
    };
}

export { APIClient };