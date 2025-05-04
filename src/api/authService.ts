import { AuthCredentials, SignupData } from '../interfaces/authInterfaces';
import axiosClient from './axiosClient';

// POST: Registro de usuario
export const signup = (data: SignupData) => axiosClient.post('/auth/signup', data);

// POST: Inicio de sesión
export const login = async (credentials: AuthCredentials) => {
    const response = await axiosClient.post('/auth/login', credentials);
    const token = response.data.token;

    if (token) {
        localStorage.setItem('token', token);
    }

    return response;
};

// GET: Obtener usuario autenticado
export const me = () => axiosClient.get('/auth/me');

// POST: Cerrar sesión
export const logout = async () => {
    await axiosClient.post('/auth/logout');
    localStorage.removeItem('token');
};
