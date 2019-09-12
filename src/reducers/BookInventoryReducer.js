import * as types from '../actionTypes/BookInventoryActions';
import shortid from 'shortid';
const initialState = {
    booksCategoryDetails: [],
    editedBookCategory: {},
    editedBook: {},
};

export default function bookInventoryReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_BOOKS_CATEGORY_DETAILS:
            return {
                ...state,
                booksCategoryDetails: action.payload.booksCategory
            }
        case types.ADD_BOOK:
            const { payload: { name, price, cat_id } } = action;
            return {
                ...state,
                booksCategoryDetails: state.booksCategoryDetails.map(catBook => {
                    if(catBook.cat_id === cat_id){
                        catBook.books = [...catBook.books, {
                            id: shortid.generate(),
                            name,
                            price
                        }];
                    }
                    return catBook;
                })
            }
            case types.ADD_BOOK_CATEGORY:
                const booksCategoryDetails = [...state.booksCategoryDetails, {
                    cat_id: shortid.generate(),
                    name: action.payload.name,
                    books: []
                }];
                return {
                    ...state,
                    booksCategoryDetails 
                }
            case types.EDIT_BOOK_CATEGORY:
                return {
                    ...state,
                    editedBookCategory: state.booksCategoryDetails.filter(category=> category.cat_id === action.payload.id)[0] || {}
                }
            case types.DELETE_BOOK_CATEGORY:
                return {
                    ...state,
                    booksCategoryDetails: state.booksCategoryDetails.filter(category=> category.cat_id !== action.payload.cat_id)
                }
            case types.SHOW_BOOK_TABLE_BY_CATEGORY:
                return {
                    ...state,
                    booksCategoryDetails: state.booksCategoryDetails.map(category=> {
                        category.show = category.cat_id === action.payload.cat_id && (category.show ? false: true);
                        return category;
                    })
                }
            case types.UPDATE_BOOK_CATEGORY:
                return {
                    ...state,
                    editedBookCategory: {},
                    booksCategoryDetails: state.booksCategoryDetails.map(category=> {
                        if(category.cat_id === action.payload.cat_id){
                            category.name = action.payload.name;
                            return category;
                        }
                        return category;
                    })
                }
        default:
            return state;
    }
};
