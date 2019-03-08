import axios from "axios";

import { ADD_CATEGORY } from "./types";

export const addCategory = (data, history) => dispatch => {
  axios.post("/api/categories/add", data).then(res => {
    if (res.data.success === true) {
      history.push("/panel/categories");
    }
  });
};
