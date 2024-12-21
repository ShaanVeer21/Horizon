import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { productListReducers, productDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers' 

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart : cartReducer,
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails : userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
 
const initialState = {
  cart : {cartItems : cartItemsFromStorage},
  userLogin : {userInfo : userInfoFromStorage}
};
 
const middleware = [thunk];
 
const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: middleware,
      },
    }),
});
 
export default store;