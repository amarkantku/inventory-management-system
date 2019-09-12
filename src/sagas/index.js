import { fork, all } from 'redux-saga/effects';
import BookInventorySaga from './BookInventorySaga';

export default function* rootSaga() {
    yield all([
        fork(BookInventorySaga),
    ])
}
