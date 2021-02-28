import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';
import { ADD_ORDER } from '../actions/ordersActions';
import { DELETE_PRODUCT } from '../actions/productsActions';
import CartItem from '../../models/cart-item';


const INITIAL_STATE = {
	items: {},
	totalAmount: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedProduct = action.item;
			console.log("Action.item: ", action.item);
			const prodPrice = addedProduct.price;
			const prodTitle = addedProduct.title

			let updatedOrNewCartItem;

			if (state.items[addedProduct.id]) {
				updatedOrNewCartItem = new CartItem(
					state.items[addedProduct.id].quantity + 1,
					prodPrice,
					prodTitle,
					state.items[addedProduct.id].sum + prodPrice
				);
				console.log("From update: ",state.items[addedProduct.id].quantity + 1,);
			} else {
				updatedOrNewCartItem = new CartItem(
					1,
					prodPrice,
					prodTitle,
					prodPrice
				);
			}
			console.log("from reducer: ", updatedOrNewCartItem);
			return (
				{
					// ...state,
					items: {
						...state.items,
						[addedProduct.id]: updatedOrNewCartItem
					},
					totalAmount: state.totalAmount + prodPrice
				}
			);

		case REMOVE_FROM_CART:
			const selectedCartItem = state.items[action.pid];
			const currentQty = selectedCartItem.quantity;
			console.log("quantity: ",currentQty);
			let updatedCartItems;
			if (currentQty > 1) {
				const updatedCartItem = new CartItem(
					selectedCartItem.quantity - 1,
					selectedCartItem.price,
					selectedCartItem.title,
					selectedCartItem.sum - selectedCartItem.price
				);
				updatedCartItems = { 
					...state.items,
					[action.pid]: updatedCartItem
				};
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.pid];
			}
			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - selectedCartItem.price
			};
		case ADD_ORDER:
			return INITIAL_STATE;
		case DELETE_PRODUCT:
			if (!state.items[action.pid]) {
				return state;
			}
			const updatedItems = { ... state.items };
			const itemTotal = state.items[action.pid].sum;
			delete updatedItems[acton.pid];
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount = itemTotal
			};
		default: 
			return state;
	}
};




