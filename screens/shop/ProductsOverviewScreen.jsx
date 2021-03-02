import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Text,
	View, 
	FlatList,
	Button,
	Platform,
	ActivityIndicator,
	StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cartActions';
import * as productsActions from '../../store/actions/productsActions';

import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';


const ProductsOverviewScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isRefreshing, setIsRefreshing] = useState(false);


	const products = useSelector(state => state.products.availableProducts);
	const dispatch = useDispatch();

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(productsActions.fetchProducts());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setError, setIsLoading]);

	useEffect(() => {
		setIsLoading(true);
		loadProducts().then(() => {
				setIsLoading(false) 
			}
		);
	}, [dispatch, loadProducts]);

	useEffect(() => {
		const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
		return () => {
			willFocusSub.remove();
		}
	}, [loadProducts]);

	const selectItemHandler = (id, title) => {
		props.navigation.navigate(
			'ProductDetails',
			{
				productId: id,
				productTitle: title
			}
		);
	};

	if (error) {
		return 
			<View style={styles.centered}>
				<Text style={styles.noProducts}>An error occured</Text>
			</View>
	};

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size='large'
					color={Colors.primary}
				/>
			</View>
		);
	};

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={styles.noProducts}>No products found. Add some products!</Text>
			</View>
		);
	};

//always set a refresh prop with onRefresh
	return <FlatList
		onRefresh={loadProducts}
		refreshing={isRefreshing}
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

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	noProducts: {
		fontFamily: 'open-sans-bold',
		color: Colors.primary
	}
});


export default ProductsOverviewScreen;



