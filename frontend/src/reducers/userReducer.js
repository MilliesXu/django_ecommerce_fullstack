import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTRATION_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_LOGOUT_SUCCESS,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
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

export function userDetailsReducer(state = { user: {} }, action) {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_DETAILS_LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

export function userUpdateProfileReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.payload,
      };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
}

export function userListReducer(state = { users: [] }, action) {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
}

export function userDeleteReducer(state = {}, action) {
  switch (action.type) {
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
}

export function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}
