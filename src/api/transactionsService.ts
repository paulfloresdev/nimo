import { GetMonthsWithResponse } from "../types/Month";
import axiosClient from "./axiosClient";

// GET: Obtener años con transacciones
export const getYearsWith = () => axiosClient.get('/getYearsWith');

// GET: Obtener meses con transacciones
export const getMonthsWith = (year?: number, page?: string) =>
    axiosClient.get<GetMonthsWithResponse>('/getMonthsWith'+'?page='+page, {
    params: year ? { year } : {},
});
