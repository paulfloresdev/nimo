import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MonthYear } from "../../../../types/Month";

interface MonthsWithState {
    data: MonthYear[];        // Lista de meses y años obtenidos
    page: number;             // Página actual de los resultados
    totalPages: number;       // Total de páginas de resultados
    loading: boolean;         // Si estamos cargando los datos (indicado por un spinner o skeleton)
    error: string | null;     // Mensaje de error si algo salió mal
}

// Estado inicial del slice
const initialState: MonthsWithState = {
    data: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
};

// Creación del slice con acciones y reducers
const monthsWithSlice = createSlice({
    name: "months_with",
    initialState,
    reducers: {
        // Acción para iniciar la solicitud
        getMonthsWithRequest: (state, action: PayloadAction<{ year: number | undefined; page: number | undefined }>) => {
            state.loading = true;
            state.error = null;

            console.log('year: '+action.payload.year);
            console.log('page sent: '+action.payload.page);
        },
        // Acción para manejar la respuesta exitosa
        getMonthsWithSuccess: (
            state,
            action: PayloadAction<{ data: MonthYear[]; current_page: number; total_pages: number }>
        ) => {
            state.loading = false;  // Ya terminamos de cargar
            state.data = action.payload.data;  // Guardamos los datos obtenidos (meses y años)
            state.page = action.payload.current_page;  // Actualizamos la página actual
            state.totalPages = action.payload.total_pages;  // Actualizamos el total de páginas

            console.log('data: '+action.payload.data);
            console.log('page: '+action.payload.current_page);
            console.log('total: '+action.payload.total_pages);
        },
        // Acción para manejar los errores
        getMonthsWithFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;  // Terminamos de cargar, aunque con error
            state.error = action.payload;  // Guardamos el error
        },
    },
});

// Exportamos las acciones
export const { getMonthsWithRequest, getMonthsWithSuccess, getMonthsWithFailure } = monthsWithSlice.actions;

// Exportamos el reducer para usarlo en el store
export default monthsWithSlice.reducer;

// Definimos el tipo del estado para usarlo en la aplicación
export type { MonthsWithState };
