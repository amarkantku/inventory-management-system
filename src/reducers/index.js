import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import bookInventoryReducer from './BookInventoryReducer';

const rootReducer = (history) => combineReducers({ 
        router: connectRouter(history),
        bookInventoryReducer, 
    }
);

export default rootReducer;
