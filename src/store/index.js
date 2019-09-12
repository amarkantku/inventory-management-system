import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware, { END } from 'redux-saga';
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers';

export const history = createBrowserHistory()
export default function configureStore(initialState = {}) {
    const sagaMiddleware = createSagaMiddleware({});
    const enhancer = compose(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
            createLogger()
        )
    );
    const store = createStore(rootReducer(history), initialState , enhancer)
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
