import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
} from "../actions/types";

const initialState = {
  products: [],
};

export function productListReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}

export function productDetailReducer(
  state = { product: { reviews: [] } },
  action
) {
  switch (action.type) {
    case PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
}

export function productDeleteReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
}
