export const SIGNUP = 'SIGNUP';

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
				console.log(resData);

				dispatch({
					type: SIGNUP
				});
		} catch (error) {
			throw error;
		}
	};
};