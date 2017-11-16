import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import Main from './main';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={BooksList}/>
			<Route path="/admin" component={BookForm}/>
			<Route path="/cart" component={Cart}/>
		</Route>
	</Router>
);

export default routes;
