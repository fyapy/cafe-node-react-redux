import isEmpty from "../validation/isEmpty";

import { SET_LOGIN_ERRORS } from "../actions/types";

const initialState = {
  loginErrors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload
      };
    default:
      return state;
  }
};
