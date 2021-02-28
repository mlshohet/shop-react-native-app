import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cartActions';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';


const ProductsOverviewScreen = props => {
	const products = useSelector(state => state.products.availableProducts);
	const dispatch = useDispatch();

	const selectItemHandler = (id, title) => {
		props.navigation.navigate(
			'ProductDetails',
			{
				productId: id,
				productTitle: title
			}
		);
	}

	return <FlatList
		data={products}
		keyExtractor={item => item.id}
		renderItem={ itemData => 
			<ProductItem 
				image={itemData.item.imageUrl}
				title={itemData.item.title}
				price={itemData.item.price}
				onSelect={()=> {
					selectItemHandler(itemData.item.id, itemData.item.title);
				}}
			>
				<Button 
					title="View Details"
					color={Colors.primary}
					onPress={()=> {
						selectItemHandler(itemData.item.id, itemData.item.title);
					}}
				/>
				<Button
					title="To Cart" 
					color={Colors.primary}
					onPress={() => {
						dispatch(cartActions.addToCart(itemData.item))
					}}
				/>
			</ProductItem>
		}
	/>;
};

ProductsOverviewScreen.navigationOptions = navData => {
	return ({
		headerTitle: 'All Products',
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
		headerRight: (
	
				<HeaderButtons
					HeaderButtonComponent={HeaderButton}
				>
					<Item 
						title='Cart' 
						iconName={
							Platform.OS === 'android' ?
							'md-cart' : 'ios-cart'
						}
						onPress={() => {
							navData.navigation.navigate('Cart')
						}}
					/>
				</HeaderButtons>
		)
	})
};

export default ProductsOverviewScreen;