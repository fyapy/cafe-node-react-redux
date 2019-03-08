import axios from "axios";

import { SET_CURRENT_USER } from "../actions/types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  axios
    .get("/api/users/current")
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    );
};
