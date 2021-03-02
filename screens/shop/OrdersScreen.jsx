import React, { useState, useEffect } from 'react';
import { 
	View,
	FlatList,
	Text,
	Platform,
	ActivityIndicator,
	StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/ordersActions';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';

const OrdersScreen = props => {
	const [isLoading, setIsLoading] = useState(false);

	const orders = useSelector(state => state.orders.orders);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		dispatch(ordersActions.fetchOrders()).then(() => {
			setIsLoading(false);
		}).catch(err => {console.warn});
	}, [dispatch]);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator 
					size='large' 
					color={Colors.primary}
				/>
			</View>
		)
	}

	return (
		<FlatList 
			data={orders} 
			keyExtractor={item => item.id}
			renderItem={itemData => 
				<OrderItem 
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
					items={itemData.item.items}
				/>
			}
		/>
	);
};

OrdersScreen.navigationOptions =  navData => {
	return {
		headerTitle: "Your Orders",
		headerLeft: () => (
				<HeaderButtons
					HeaderButtonComponent={HeaderButton}
				>
					<Item 
						title='Menu'
						iconName={
							Platform.OS === 'android' ?
							'md-menu' : 'ios-menu'
						}
						onPress={() => {
							navData.navigation.toggleDrawer();
						}}
					/>
				</HeaderButtons>
		), 
	}
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default OrdersScreen;






