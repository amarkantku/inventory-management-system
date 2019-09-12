import * as types from '../actionTypes/BookInventoryActions';

export const addBook = payload => ({
    type: types.ADD_BOOK,
    payload
});

export const editBook = payload => ({
    type: types.EDIT_BOOK,
    payload
});

export const deleteBook = payload => ({
    type: types.DELETE_BOOK,
    payload
});

export const getBooksByCategory = () => ({
    type: types.GET_BOOKS_BY_CATEGORY
})
export const setBooksCategoryDetails = payload => ({
    type: types.SET_BOOKS_CATEGORY_DETAILS,
    payload
})

export const addBookCategory = payload => ({
    type: types.ADD_BOOK_CATEGORY,
    payload
});

export const editBookCategory = payload => ({
    type: types.EDIT_BOOK_CATEGORY,
    payload
});

export const deleteBookCategory = payload => ({
    type: types.DELETE_BOOK_CATEGORY,
    payload
});

export const getBooksCategoryDetails = () => ({
    type: types.GET_BOOKS_CATEGORY
})

export const updateBookCategory = payload => ({
    type: types.UPDATE_BOOK_CATEGORY,
    payload
});

export const showBookTableByCategory = payload => ({
    type: types.SHOW_BOOK_TABLE_BY_CATEGORY,
    payload
})
