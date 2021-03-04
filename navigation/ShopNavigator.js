import React from 'react';
import { useDispatch } from 'react-redux';
import { 
	createAppContainer, 
	createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { View, Platform, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
	ProductsOverview: ProductsOverviewScreen,
	ProductDetails: ProductDetailsScreen,
	Cart: CartScreen
}, {
		navigationOptons: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={
						Platform.OS === 'android' ?
						'md-cart' : 'ios-cart'
					}
				/>
			)
		},
		
		defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
		UserProducts: UserProductsScreen,
		EditProduct: EditProductScreen
	}, 
	{
		navigationOptons: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={Platform.OS === 'android' ?
						'md-create' : 'ios-create'
					}
					size={23}
					color={drawerConfig.tintColor}
				/>
			)
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const OrdersNavigator = createStackNavigator({
	Orders: OrdersScreen
}, {
		navigationOptons: {
			drawerIcon: drawerConfig => 
				<Ionicons 
					name={Platform.OS === 'android'? 'md-list' : 'ios-list'}
					size={23}
					color={drawerConfig.tintColor}
				/>
		},
		defaultNavigationOptions: defaultNavOptions
	}
);

const ShopNavigator = createDrawerNavigator({
	Products: ProductsNavigator,
	Orders: OrdersNavigator,
	Admin: AdminNavigator
}, {
	contentOptions: {
		activeTintColor: Colors.primary
	},
	contentComponent: props => {
		const dispatch = useDispatch();
		return (
			<View style={{ flex:1, paddingTop: 20 }}>
				<SafeAreaView forceInset={
					{
						top: 'always', 
						horizontal: 'never'
					}
				}
				>
					<DrawerItems { ...props } />
					<Button 
						title="Logout" 
						color={Colors.primary}
						onPress={() => {
							console.log("button pressed");
							dispatch(authActions.logout());
						}}
					/>
				</SafeAreaView>
			</View>
		);
	}
});

const AuthNavigator = createStackNavigator({
	Auth: AuthScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);


