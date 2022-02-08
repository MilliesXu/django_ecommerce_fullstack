import { ORDER_CREATE_SUCCESS, ORDER_CREATE_RESET } from "../actions/types";

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
