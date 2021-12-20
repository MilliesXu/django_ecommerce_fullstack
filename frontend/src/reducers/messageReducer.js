import { CREATE_MESSAGE } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}
