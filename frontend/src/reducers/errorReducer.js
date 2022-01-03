import { ERROR } from "../actions/types";

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
    default:
      return state;
  }
}
