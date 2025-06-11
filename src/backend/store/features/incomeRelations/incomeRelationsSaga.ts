import { call, put, takeLatest } from "redux-saga/effects";

import {
    getIncomeRelationsRequest,
    getIncomeRelationsSuccess,
    getIncomeRelationsFailure,
} from "./incomeRelationsSlice";

import { getIncomeRelationsRequest as apiGetIncomeRelations } from "../../../api/backend";

function* incomeRelationsSaga(action: ReturnType<typeof getIncomeRelationsRequest>): Generator<any, any, any> {
    try {
        const res = yield call(apiGetIncomeRelations, action.payload);
        console.log("Response de incomeRelationsSaga:", res);
        yield put(getIncomeRelationsSuccess(res));
    } catch (error: any) {
        console.error("Error en incomeRelationsSaga:", error);
        yield put(getIncomeRelationsFailure(error?.response?.data?.message || "No se pudieron obtener las relaciones de ingresos"));
    }
}

export function* watchIncomeRelationsSaga() {
    yield takeLatest(getIncomeRelationsRequest.type, incomeRelationsSaga);
}