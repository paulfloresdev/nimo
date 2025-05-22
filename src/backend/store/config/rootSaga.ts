import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from '../features/auth/authSaga';
import { watchYearsWithSaga } from '../features/yearsWith/yearsWithSaga';
import { watchMonthsWithSaga } from '../features/monthsWith/monthsWithSaga';
import { watchMonthTransactionsSaga } from '../features/monthTransactions/monthTransactionsSaga';
import { watchAllCardsSaga } from '../features/allCards/allCardsSaga';

export default function* rootSaga() {
    yield all([
        fork(watchAuthSaga),
        fork(watchYearsWithSaga),
        fork(watchMonthsWithSaga),
        fork(watchMonthTransactionsSaga),
        fork(watchAllCardsSaga),
        // fork(watchAnotherSaga),
    ]);
}
