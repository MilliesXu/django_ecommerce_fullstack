import { ERROR, ERROR_RESET } from "../actions/types";

const initialState = {
  errors: [],
};

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case ERROR_RESET:
      return {
        ...state,
        errors: "",
      };
    default:
      return state;
  }
}
