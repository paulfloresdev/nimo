import { call, put, takeLatest } from "redux-saga/effects";
import {
    getMonthsWithRequest,
    getMonthsWithSuccess,
    getMonthsWithFailure
} from "./monthsWithSlice";

// Función para realizar la solicitud a la API
import { getMonthsWithRequest as getMonthsWithAPI } from "../../../api/backend"; // Cambia el path si es necesario

// Función que se ejecuta cuando la acción `getMonthsWithRequest` es disparada
function* monthsWithSaga(action: any): Generator<any, any, any> {
    try {
        // Llamada a la API con los parámetros de año y página
        const { year, page } = action.payload;
        const res = yield call(getMonthsWithAPI, { year, page });

        // Después de recibir los datos, despachamos la acción de éxito
        yield put(
            getMonthsWithSuccess({
                data: res.data.data,        // Los datos de meses obtenidos
                current_page: res.data.current_page,  // La página actual
                total_pages: res.data.last_page,  // El total de páginas
            })
        );
    } catch (error: any) {
        console.error("Error en monthsWithSaga:", error); // Puedes quitar esto cuando no necesites depurar
        // En caso de error, despachamos la acción de fallo
        yield put(getMonthsWithFailure(error?.response?.data?.message || 'No se pudo obtener los meses'));
    }
}

// Función para observar la acción 'getMonthsWithRequest' y lanzar la saga correspondiente
export function* watchMonthsWithSaga() {
    yield takeLatest(getMonthsWithRequest.type, monthsWithSaga);  // Observamos la acción y llamamos a la saga
}
