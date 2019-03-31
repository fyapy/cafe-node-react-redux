import axios from "axios";
import { GET_ORDERS } from "./types";

export const getOrders = () => dispatch => {
  axios.get("/api/orders").then(res => {
    dispatch({
      type: GET_ORDERS,
      payload: res.data.orders
    });
  });
};

export const addOrder = data => (dispatch, getState) => {
  axios.post("/api/orders", data).then(res => {
    console.log(res.data);
  });
};
