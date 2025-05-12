// backend.ts

import { AuthCredentials } from "../../interfaces/authInterfaces";
import { APIClient } from "./configurations";
import * as url from "./url";

const api = new APIClient();

//---AUTH--------------------------------------------------

//  * login
export const loginRequest = async (data: AuthCredentials) =>
    await api.create(url.AUTH_LOGIN, data);

//  * register
export const registerRequest = async (data: {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
}) => await api.create(url.AUTH_SIGNUP, data);

//  * logout
export const logoutRequest = async () => await api.create(url.AUTH_LOGOUT, {});

//  * me
export const meRequest = async () => {
    try {
        const response = await api.get(url.AUTH_ME);
        return response;
    } catch (error) {
        throw error; // Lanza el error para que se pueda manejar en otro lugar si es necesario
    }
};

//  * updateData
export const updateUserDataRequest = async (
    id: string,
    data: {
        name: string;
        lastname: string;
        phone: string;
        email: string;
    }
) => await api.put(`${url.AUTH_UPDATE_DATA}/${id}`, data);

//  * updatePassword
export const updatePasswordRequest = async (
    id: string,
    data: { password: string }
) => await api.put(`${url.AUTH_UPDATE_PASSWORD}/${id}`, data);


//  ---TRANSACTIONS--------------------------------------------------

//  * getYearsWith
export const getYearsWithRequest = async () => await api.get(`${url.GET_YEARS_WITH}`);

//  * getMonthsWith
export const getMonthsWithRequest = async (data: { year?: number; page?: number }) => {
    const page = data.page ?? 1;
    const body = data.year !== undefined ? { year: data.year } : {};

    return await api.create(`${url.GET_MONTHS_WITH}?page=${page}`, body);
};

