import axios from "axios";

import { GET_HOME_DATA } from "./types";

export const getHomeData = () => dispatch => {
  axios.get("/api/home").then(res => {
    dispatch({
      type: GET_HOME_DATA,
      payload: res.data
    });
  });
};
