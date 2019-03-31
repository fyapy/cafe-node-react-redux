import axios from "axios";
import { GET_PRODUCT } from "./types";
import { getHomeData } from "./homeAction";

export const addProduct = (data, history) => dispatch => {
  axios.post("/api/products/add", data).then(res => {
    if (res.data.success === true) {
      history.push("/panel");
    }
  });
};

export const getProduct = id => dispatch => {
  axios.get(`/api/products/${id}`).then(res => {
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.product
    });
  });
};

export const editProduct = (id, data, history) => dispatch => {
  axios.put(`/api/products/${id}`, data).then(res => {
    history.push("/panel");
  });
};

export const deleteProduct = id => dispatch => {
  axios.delete(`/api/products/${id}`).then(res => {
    dispatch(getHomeData());
  });
};
