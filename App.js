import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import {useFonts } from 'expo-font';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/productsReducer';
import cartReducer from './store/reducers/cartReducer';
import ordersReducer from './store/reducers/ordersReducer';
import authReducer from './store/reducers/authReducer';

import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	let [fontsLoaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});


	 	if (!fontsLoaded) {
	 		try {
	 			  return <AppLoading />
	 		} catch (error) {
	 			console.log(error)
	 		}
	 	} else {
	 		return (
	 			<Provider store={store}>
	      			<NavigationContainer />
	    		</Provider>	
	 		);
	 	}
};
