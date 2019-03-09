import axios from "axios";

export const addCategory = (data, history) => dispatch => {
  axios.post("/api/categories/add", data).then(res => {
    if (res.data.success === true) {
      history.push("/panel/categories");
    }
  });
};
