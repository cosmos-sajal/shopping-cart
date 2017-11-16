"use strict";

export function addToCart(book) {
	return {
		type : 'ADD_TO_CART',
		payload : book
	};
}

export function deleteCartItem(item) {
	return {
		type : 'DELETE_CART_ITEM',
		payload : item
	};
}

export function incrementItem(item) {
	return {
		type : 'INCREMENT_ITEM',
		payload : item
	};
}

export function decrementItem(item) {
	return {
		type : 'DECREMENT_ITEM',
		payload : item
	}
}

export function calculateTotal() {
	return {
		type : 'CALCULATE_TOTAL'
	};
}