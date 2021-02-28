import PRODUCTS from '../../data/data';
import { 
	CREATE_PRODUCT, 
	UPDATE_PRODUCT, 
	DELETE_PRODUCT 
} from '../actions/productsActions';
import Product from '../../models/product.model';

const INITIAL_STATE = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_PRODUCT:
			const newProduct = new Product(
				new Date().toString(),
				'u1',
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price,
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct)
			}

		case UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex(product => 
				product.id === action.pid
			);
			const updatedProduct = new Product(
				action.pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			);
			const updatedUserProducts = [ ...state.userProducts ];
			updatedUserProducts[productIndex]=updatedProduct;
			const availableProductIndex = state.availableProducts.findIndex(product => 
				product.id === action.pid
			);
			const updatedAvailableProducts = [ ...state.availableProducts ];
			updatedAvailableProducts[availableProductIndex]=updatedProduct;
			return {
				...state,
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts
			};
		case DELETE_PRODUCT:
			return {
				...state,
				userProducts: state.userProducts.filter(product => 
					product.id !== action.pid
				),
				availableProducts: state.availableProducts.filter(product =>
					product.id !== action.pid
				),
			};
		default:
			return state;
	}
}