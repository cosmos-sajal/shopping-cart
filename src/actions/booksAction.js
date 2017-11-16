"use strict";
import axios from 'axios';

export function getBooks() {
	return function(dispatch) {
		axios.get('/api/get/books')
			.then(function(response) {
				dispatch({
					type : 'GET_BOOKS',
					payload : response.data
				});
			})
			.catch(function(err) {
				dispatch({
					type : 'GET_BOOKS_REJECTED',
					payload : err
				})	
			});
	}
}

export function postBooks(book) {
	return function(dispatch) {
		axios.post('/api/post/books', book)
			.then(function(response) {
				dispatch({
					type : "POST_BOOK",
					payload : response.data
				});
			})
			.catch(function(err) {
				dispatch({
					type : "POST_BOOK_REJECTED",
					payload : "Post book failed"
				});
			});
	}
}

export function deleteBook(book) {
	return function(dispatch) {
		axios.delete('/api/book/' + book._id)
			.then(function(response) {
				dispatch({
					type : "DELETE_BOOK",
					payload : book
				})
			})
			.catch(function(err) {
				dispatch({
					type : "DELETE_BOOK_REJECTED",
					payload : err
				})
			});
	}
}

export function updateBook(book) {
	return {
		type : 'UPDATE_BOOK',
		payload : book
	}
}