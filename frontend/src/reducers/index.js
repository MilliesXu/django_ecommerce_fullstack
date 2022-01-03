import { combineReducers } from "redux";

import { productListReducer, productDetailReducer } from "./ProductReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";

export default combineReducers({
  productListReducer,
  productDetailReducer,
  cartReducer,
  errorReducer,
});
