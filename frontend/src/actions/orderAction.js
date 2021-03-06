import {
  ORDER_CREATE_SUCCESS,
  ERROR,
  CART_CLEAR_ITEM,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_DELIVER_SUCCESS,
} from "./types";
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
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

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
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

    const { data } = await axios.put(
      `/api/orders/${id}/`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
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

export const deliverOrder = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.put(`/api/orders/${id}/deliver/`, {}, config);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
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

export const getListOrders = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/orders/`, config);

    if (userInfo.is_admin) {
      dispatch({
        type: ORDER_LIST_ADMIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    }
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
