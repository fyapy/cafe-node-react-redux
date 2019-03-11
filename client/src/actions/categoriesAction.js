import axios from "axios";
import { GET_CATEGORY } from "./types";
import { getHomeData } from "./homeAction";

export const addCategory = (data, history) => dispatch => {
  axios.post("/api/categories/add", data).then(res => {
    if (res.data.success === true) {
      history.push("/panel/categories");
    }
  });
};

export const getCategory = id => (dispatch, getState) => {
  axios.get(`/api/categories/${id}`).then(res => {
    dispatch({
      type: GET_CATEGORY,
      payload: res.data.category
    });
  });
};

export const editCategory = (id, data, history) => dispatch => {
  axios.put(`/api/categories/${id}`, data).then(res => {
    history.push("/panel/categories");
  });
};

export const deleteCategory = id => dispatch => {
  axios.delete(`/api/categories/${id}`).then(res => {
    dispatch(getHomeData());
  });
};
