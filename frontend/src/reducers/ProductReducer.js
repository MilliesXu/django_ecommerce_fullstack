import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_RESET,
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

export function productCreateReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export function productUpdateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
}

export function productCreateReviewReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return { product: {} };
    default:
      return state;
  }
}
