import { AUTHENTICATE, LOGOUT } from '../actions/authActions';

const INITIAL_STATE = {
	token: null,
	userId: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				token: action.token,
				userId: action.userId
			};
		// case SIGNUP:
		// 	return {
		// 			token: action.token,
		// 			userId: action.userId
		// 	};
		case LOGOUT:
		 	return INITIAL_STATE;
		default:
			return state;
	};
};