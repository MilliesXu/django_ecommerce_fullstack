import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_RESET,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_RESET,
} from "../actions/types";

export function orderReducer(state = { order: {} }, action) {
  switch (action.type) {
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: action.payload,
        success: true,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export function orderDetailReducer(
  state = {
    order: {},
  },
  action
) {
  switch (action.type) {
    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
}

export function orderPayReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
}

export function orderListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case ORDER_LIST_SUCCESS:
    case ORDER_LIST_ADMIN_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDER_LIST_RESET:
    case ORDER_LIST_ADMIN_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
}
