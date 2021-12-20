import { ERROR } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      };
    default:
      return state;
  }
}
