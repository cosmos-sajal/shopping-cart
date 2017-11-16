"use strict";

export function cartReducer(state = {cart : [], total : 0, quantity : 0}, action) {
	const cart = [...state.cart];
	const quantity = state.quantity;
	let indexToUpdate, updatedItem;
	switch(action.type) {
		case 'ADD_TO_CART' :
			const indexToCheck = cart.findIndex(function(item) {
				return (item.title === action.payload.title);
			});
			if (indexToCheck >= 0) {
				updatedItem = cart[indexToCheck];
				updatedItem['quantity'] += 1;

				return {cart : [...cart.slice(0, indexToCheck), updatedItem, ...cart.slice(indexToCheck + 1)], quantity : quantity + 1};
			} else {
				return {cart : [...state.cart, action.payload], quantity : quantity + 1};
			}
			break;
		case 'DELETE_CART_ITEM' :
			const indexToDelete = cart.findIndex(function(item) {
				return (item._id === action.payload._id);
			});
			let qtyOfItemToBeDeleted = cart[indexToDelete]['quantity'];

			return {cart : [...cart.slice(0, indexToDelete), ...cart.slice(indexToDelete + 1)], quantity : quantity - qtyOfItemToBeDeleted};
			break;
		case 'INCREMENT_ITEM' :
			indexToUpdate = cart.findIndex(function(item) {
				return (item._id === action.payload._id);
			});
			updatedItem = cart[indexToUpdate];
			updatedItem['quantity'] += 1;

			return {cart : [...cart.slice(0, indexToUpdate), updatedItem, ...cart.slice(indexToUpdate + 1)], quantity : quantity + 1};
			break;
		case 'DECREMENT_ITEM' :
			indexToUpdate = cart.findIndex(function(item) {
				return (item._id === action.payload._id);
			});
			updatedItem = cart[indexToUpdate];
			if (updatedItem['quantity'] === 1) {
				return {cart : [...cart.slice(0, indexToUpdate), ...cart.slice(indexToUpdate + 1)], quantity : quantity - 1};
			} else {
				updatedItem['quantity'] -= 1;
				return {cart : [...cart.slice(0, indexToUpdate), updatedItem, ...cart.slice(indexToUpdate + 1)], quantity : quantity - 1};
			}
			break;
		case 'CALCULATE_TOTAL' :
			let totalCost = 0;
			for (let i = 0 ; i < cart.length ; i++) {
				totalCost += (cart[i]['price'] * cart[i]['quantity']);
			}

			return {cart : [...state.cart], total : totalCost, quantity : quantity};
	}

	return state;
};
