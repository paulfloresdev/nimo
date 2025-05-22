// authSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    meRequest,
    meSuccess,
    meFailure,
} from './authSlice';

import {
    loginRequest as loginAPI,
    registerRequest as registerAPI,
    logoutRequest as logoutAPI,
    meRequest as meAPI
} from '../../../api/backend';

function* loginSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(loginAPI, action.payload);
        yield put(loginSuccess(res.data));
    } catch (error: any) {
        yield put(loginFailure(error?.response?.data?.message || 'Error al iniciar sesión'));
    }
}

function* registerSaga(action: any): Generator<any, any, any> {
    try {
        const res = yield call(registerAPI, action.payload);
        yield put(registerSuccess(res.data));
    } catch (error: any) {
        yield put(registerFailure(error?.response?.data?.message || 'Error al registrarse'));
    }
}

function* logoutSaga(): Generator<any, any, any> {
    try {
        yield call(logoutAPI);
        yield put(logoutSuccess());
    } catch (error: any) {
        yield put(logoutFailure(error?.response?.data?.message || 'Error al cerrar sesión'));
    }
}

function* meSaga(): Generator<any, any, any> {
    try {
        const res = yield call(meAPI); // Llamada a la API
        yield put(meSuccess(res));  // Se pasan los datos correctos
    } catch (error: any) {
        console.error("Error en meSaga:", error);
        yield put(meFailure(error?.response?.data?.message || 'No se pudo obtener el usuario'));
    }
}


export function* watchAuthSaga() {
    yield takeLatest(loginRequest.type, loginSaga);
    yield takeLatest(registerRequest.type, registerSaga);
    yield takeLatest(logoutRequest.type, logoutSaga);
    yield takeLatest(meRequest.type, meSaga);
}
