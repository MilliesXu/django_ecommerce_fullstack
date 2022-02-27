import { combineReducers } from "redux";

import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
} from "./ProductReducer";
import {
  userReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./userReducer";
import { cartReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";
import {
  orderReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListReducer,
} from "./orderReducer";

export default combineReducers({
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  cartReducer,
  errorReducer,
  userReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  orderReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListReducer,
});
