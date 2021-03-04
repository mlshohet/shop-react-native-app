import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
	return dispatch => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: AUTHENTICATE,
			userId,
			token
		});
	};
};

export const signUp = (email, password) => {
	return async dispatch => {
		try {
				const response = await fetch(
					'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4UN89LnYuIr4raL8VgcbU2ZCsGlJ7efA',{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true
					})
				});

				if (!response.ok) {
					throw new Error('Something went wrong');
				};

				const resData = await response.json();

				dispatch(authenticate(
					resData.localId, 
					resData.idToken,
					parseInt(resData.expiresIn) * 1000
				));
				
				const expirationDate = new Date(
					new Date().getTime() + parseInt(resData.expiresIn) * 1000
				);
				saveDataToStorage(
					resData.idToken,
					resData.localId,
					expirationDate
				);
		} catch (error) {
			throw error;
		}
	};
};

export const logIn = (email, password) => {
	return async dispatch => {
		try {
				const response = await fetch(
					'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4UN89LnYuIr4raL8VgcbU2ZCsGlJ7efA',{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password,
						returnSecureToken: true
					})
				});

				if (!response.ok) {
					const errorResData = await response.json();
					console.log(errorResData);
					const errorId = errorResData.error.message;
					let message ='Something went wrong';

					if (errorId === 'EMAIL_NOT_FOUND') {
						message='This email could not be found';
					} else if (errorId === 'INVALID_PASSWORD') {
						message='This password is not valid';
					}
					throw new Error(message);
				};

				const resData = await response.json();
				console.log(resData);

				dispatch(authenticate(
					resData.localId,
					resData.idToken,
					parseInt(resData.expiresIn) * 1000
				));

				const expirationDate = new Date(
					new Date().getTime() + parseInt(resData.expiresIn) * 1000
				);
				saveDataToStorage(
					resData.idToken,
					resData.localId,
					expirationDate
				);
		} catch (error) {
			throw error;
		}
	};
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return dispatch => dispatch({
		type: LOGOUT
	});
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeOut(timer);
	}
};

const setLogoutTimer = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	}
}

const saveDataToStorage = (token, userId, expirationDate) => {
	AsyncStorage.setItem(
		'userData', 
		JSON.stringify({
			token: token,
			userId: userId,
			expiryDate: expirationDate.toISOString()
		})
	);
};














