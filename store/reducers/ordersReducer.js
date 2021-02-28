import { ADD_ORDER } from '../actions/ordersActions';
import Order from '../../models/order';

const INITIAL_STATE = {
	orders: []
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_ORDER:
			const newOrder = new Order(
				new Date().toString(),
				action.orderData.items,
				action.orderData.amount,
				new Date()
			);
			return {
				...state,
				orders: state.orders.concat(newOrder)
			};
		default:
			return state;
	}
}