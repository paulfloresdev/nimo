import { call, put, takeLatest } from 'redux-saga/effects'

import {
    getAllCardsRequest,
    getAllCardsSuccess,
    getAllCardsFailure,
} from './allCardsSlice';

import {
    getAllCardsRequest as getAllCardsAPI,
} from '../../../api/backend';

function* allCardsSaga(): Generator<any, any, any> {
    try{
        const res = yield call(getAllCardsAPI);
        yield put(getAllCardsSuccess(res.data));
    } catch (error: any) {
        yield put(getAllCardsFailure(error?.response?.data?.message || 'No se pudieron obtener las tarjetas'))
    }
}

export function* watchAllCardsSaga() {
    yield takeLatest(getAllCardsRequest.type, allCardsSaga);
}