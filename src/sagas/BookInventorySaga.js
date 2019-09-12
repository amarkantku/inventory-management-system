import { all, takeLatest, put } from 'redux-saga/effects';
import booksInventory from '../mocks/booksInventory';

export function* getBooksCategorySaga(action) {
    try {
        if(true){
            yield put({
                type: 'SET_BOOKS_CATEGORY_DETAILS',
                payload: booksInventory
            }); 
        }
    } catch (err) {
        yield 1;
        console.error(err);
    }
}

export function* getBooksByCategorySaga(action) {
    try {
        yield 2;
        console.log('get book by category saga');
    } catch (err) {
        yield 1;
        console.error(err);
    }
}

export default function* root() {
    yield all([
        takeLatest('GET_BOOKS_BY_CATEGORY', getBooksByCategorySaga),
        takeLatest('GET_BOOKS_CATEGORY', getBooksCategorySaga),
    ]);
}

