import React, { useReducer, useCallback } from 'react';
import { 
	ScrollView, 
	View, 
	KeyboardAvoidingView,
	StyleSheet,
	Button
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/authActions';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues
		};
	}
	return state;
};

const AuthScreen = props => {
	const dispatch = useDispatch();

	const signupHandler = () => {
		dispatch(authActions.signUp(
			formState.inputValues.email,
			formState.inputValues.password
		));
	};

	const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: inputValue,
			isValid: inputValidity,
			input: inputIdentifier
		});
	}, [dispatchFormState]);

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});


	return (
		<KeyboardAvoidingView 
			style={styles.screen}
			behavior='padding'
			keyboardVerticalOffset={50}
		>
		<LinearGradient
			colors={['#ffedff', '#ffe3ff']}
			style={styles.gradient}
		>
			<Card style={styles.authContainer}>
				<ScrollView>
					<Input 
						id='email'
						label='E-Mail'
						keyboardType='email-address'
						required
						email
						autoCapitalize='none'
						errorText="Please enter a valid email address"
						onInputChange={inputChangeHandler}
						initialValue=''
					/>
					<Input 
						id='password'
						label='Password'
						keyboardType='default'
						secureTextEntry
						required
						minLength={5}
						autoCapitalize='none'
						errorText="Please enter a valid password"
						onInputChange={inputChangeHandler}
						initialValue=''
					/>
					<View style={styles.buttonContainer}>
						<Button 
							title="Login"
							color={Colors.primary} 
							onPress={signupHandler}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button 
							title="Switch To Sign Up"
							color={Colors.accent} 
							onPress={() => {}}
						/>
					</View>
				</ScrollView>
			</Card>
			</LinearGradient>
		</KeyboardAvoidingView>

	)
};

AuthScreen.navigationOptions = {
	headerTitle: 'Authenticating'
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	gradient: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20
	},
	buttonContainer: {
		marginTop: 10
	}
});

export default AuthScreen;