import { ORDER_CREATE_SUCCESS, ERROR, CART_CLEAR_ITEM } from "./types";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders/", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEM,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
