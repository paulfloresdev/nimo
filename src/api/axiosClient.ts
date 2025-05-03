import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("TOKEN ENVIADO:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
