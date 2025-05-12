import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from '../features/auth/authSaga';
import { watchYearsWithSaga } from '../features/yearsWith/yearsWithSaga';
import { watchMonthsWithSaga } from '../features/monthsWith/monthsWithSaga';

export default function* rootSaga() {
    yield all([
        fork(watchAuthSaga),
        fork(watchYearsWithSaga),
        fork(watchMonthsWithSaga)
        // fork(watchAnotherSaga),
    ]);
}
