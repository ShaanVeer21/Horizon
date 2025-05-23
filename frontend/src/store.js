import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { productListReducers, productDetailsReducers, productDeleteReducers, productCreateReducers, productUpdateReducers, productReviewCreateReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers' 
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete : productDeleteReducers,
  productCreate : productCreateReducers,
  productUpdate : productUpdateReducers,
  productReviewCreate : productReviewCreateReducers,
  cart : cartReducer,
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails : userDetailsReducer,
  userUpdateProfile : userUpdateProfileReducer,
  userList : userListReducer,
  userDelete : userDeleteReducer,
  userUpdate : userUpdateReducer,
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  orderListMy : orderListMyReducer,
  orderList : orderListReducer,
  orderDeliver : orderDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
 
const initialState = {
  cart : {
    cartItems : cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage
  },
  userLogin : {userInfo : userInfoFromStorage},

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