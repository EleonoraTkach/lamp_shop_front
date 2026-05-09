import { legacy_createStore as createStore, combineReducers,applyMiddleware } from "redux";

import { thunk } from "redux-thunk";

import { cartReducer } from "./reducers/cartReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { productReducer } from "./reducers/productReducer";
import { reviewReducer } from "./reducers/reviewReducer";
import { orderReducer } from "./reducers/orderReducer";

const rootReducer = combineReducers({
  cartState: cartReducer,
  categories: categoryReducer,
  products: productReducer,
  reviews: reviewReducer,
  orders: orderReducer,

});

export const store = createStore(
  rootReducer, applyMiddleware(thunk)
);