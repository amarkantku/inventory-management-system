import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from '../src/store';
import rootSaga from '../src/sagas';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'semantic-ui/dist/semantic.min.css';
import AppContainer from './containers/AppContainer';

const store = configureStore();
store.runSaga(rootSaga)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<AppContainer />
		</ConnectedRouter>		
	</Provider>,
	document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
