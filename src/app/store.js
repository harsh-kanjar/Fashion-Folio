import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import cartSlice from '../features/product/cartSlice'
import orderReducer from '../features/product/orderSlice'
import authReducer from '../features/auth/authSlice'
// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer, // Assigning the product reducer to the 'product' slice of state
    cart: cartSlice,
    order: orderReducer,
  },
});
