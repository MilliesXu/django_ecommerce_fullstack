import { combineReducers } from "redux";

import { productListReducer, productDetailReducer } from "./ProductReducer";
import {
  userReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./userReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";

export default combineReducers({
  productListReducer,
  productDetailReducer,
  cartReducer,
  errorReducer,
  userReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
});
