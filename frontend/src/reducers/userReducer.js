import { USER_LOGIN_SUCCESS, USER_LOGIN_LOGOUT } from "../actions/types";

export function userReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_LOGIN_LOGOUT:
      return {};
    default:
      return state;
  }
}
