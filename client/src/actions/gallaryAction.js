import axios from "axios";
import { GET_GALLARY } from "./types";

export const fetchGallary = () => dispatch => {
  axios.get("/api/gallary").then(res => {
    dispatch({
      type: GET_GALLARY,
      payload: res.data.gallary
    });
  });
};

export const addToGallary = (data, history) => dispatch => {
  axios.post("/api/gallary", data).then(res => {
    history.push("/panel/gallary");
  });
};

export const deleteGallary = id => dispatch => {
  axios.delete(`/api/gallary/${id}`).then(res => {
    dispatch(fetchGallary());
  });
};
