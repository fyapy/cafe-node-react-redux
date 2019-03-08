import axios from "axios";

import { ADD_PRODUCT } from "./types";

export const addProduct = (data, history) => dispatch => {
  axios.post("/api/products/add", data).then(res => {
    if (res.data.success === true) {
      history.push("/panel");
    }
  });
};
