"use strict";
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import { postBooks, deleteBook, updateBook } from './actions/booksAction';
import { addToCart } from './actions/cartAction';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import routes from './routes';

const initialState = window.INITIAL_STATE;
const middleWare = applyMiddleware(thunk, logger);
const store = createStore(reducers, initialState, middleWare);
const Routes = (
	<Provider store={store}>
		{routes}
	</Provider>
)

render(
	Routes, document.getElementById('app')
);
