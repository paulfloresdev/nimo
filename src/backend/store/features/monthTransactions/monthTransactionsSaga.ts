import { call, put, takeLatest } from "redux-saga/effects";
import {
    getMonthTransactionsRequest,
    getMonthTransactionsSuccess,
    getMonthTransactionsFailure,
} from "./monthTransactionsSlice";

import { getTransactionsRequest } from "../../../api/backend";

function* monthTransactionsSaga(action: ReturnType<typeof getMonthTransactionsRequest>): Generator<any, any, any> {
    try {
        const { year, month, data } = action.payload;
        const res = yield call(getTransactionsRequest, year, month, data);
        yield put(getMonthTransactionsSuccess(res.data));
    } catch (error: any) {
        console.error("Error en monthTransactionsSaga:", error);
        yield put(getMonthTransactionsFailure(error?.response?.data?.message || "No se pudieron obtener las transacciones"));
    }
}

export function* watchMonthTransactionsSaga() {
    yield takeLatest(getMonthTransactionsRequest.type, monthTransactionsSaga);
}
