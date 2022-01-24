import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTRATION_SUCCESS,
} from "../actions/types";

export function userReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
