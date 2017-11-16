"use strict";

import { combineReducers } from 'redux';

import { booksReducer } from './booksReducer';
import { cartReducer } from './cartReducer';

export default combineReducers({
	books : booksReducer,
	cart : cartReducer
});
