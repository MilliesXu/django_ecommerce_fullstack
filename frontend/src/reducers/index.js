import { combineReducers } from "redux";

import { productListReducer, productDetailReducer } from "./ProductReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  productListReducer,
  productDetailReducer,
  errorReducer,
  messageReducer,
});
