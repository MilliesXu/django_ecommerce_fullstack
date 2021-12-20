import { CREATE_MESSAGE, ERROR } from "./types";

export const createMessage = (msg) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: ERROR,
    payload: { msg, status },
  };
};
