import { PRODUCT_LIST_SUCCESS, PRODUCT_DETAIL_SUCCESS } from "./types";
import { returnErrors } from "./messages";
import axios from "axios";

export const productList = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/products/");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};
