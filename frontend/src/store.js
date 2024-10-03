import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import {
  productListReducers,
  productDetailsReducers,
} from './reducers/productReducers';
 
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
});
 
const initialState = {};
 
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