import { legacy_createStore as createStore, combineReducers,applyMiddleware } from "redux";

import { thunk } from "redux-thunk";

import { cartReducer } from "./reducers/cartReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
import { reviewReducer } from "./reducers/reviewReducer";
import { orderReducer } from "./reducers/orderReducer";
import { authReducer } from "./reducers/authReducer";
import {catalogReducer} from "./reducers/catalogReducer.js";
import {ordersReducer} from "./reducers/ordersReducer.js";
import {orderDetailsReducer} from "./reducers/orderDetailsReducer.js";

const rootReducer = combineReducers({
  cartState: cartReducer,
  catalog: catalogReducer,
  categories: categoryReducer,
  products: productReducer,
  reviews: reviewReducer,
  order: orderReducer,
  auth: authReducer,
  orders:ordersReducer,
  orderDetails:orderDetailsReducer


});

export const store = createStore(
  rootReducer, applyMiddleware(thunk)
);