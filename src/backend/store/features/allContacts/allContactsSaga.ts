import { call, put, takeLatest } from "redux-saga/effects";

import {
    getAllContactsRequest,
    getAllContactsSuccess,
    getAllContactsFailure,
} from "./allContactsSlice";

import { getContactsRequest } from "../../../api/backend";

function* allContactsSaga(action: ReturnType<typeof getAllContactsRequest>): Generator<any, any, any> {
    try {
        const res = yield call(getContactsRequest, action.payload);
        console.log("Response from getContactsRequest:", res.data);
        yield put(getAllContactsSuccess(res.data));
    } catch (error: any) {
        console.error("Error en allContactsSaga:", error);
        yield put(getAllContactsFailure(error?.response?.data?.message || "No se pudieron obtener los contactos"));
    }
}

export function* watchAllContactsSaga() {
    yield takeLatest(getAllContactsRequest.type, allContactsSaga);
}