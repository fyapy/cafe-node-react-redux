import axios from "axios";

export const addProduct = (data, history) => dispatch => {
  axios.post("/api/products/add", data).then(res => {
    if (res.data.success === true) {
      history.push("/panel");
    }
  });
};
