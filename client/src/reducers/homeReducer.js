import { GET_HOME_DATA, GET_GALLARY } from "../actions/types";

const initialState = {
  categories: [],
  products: [],
  gallary: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_DATA:
      return {
        ...state,
        categories: action.payload.categories,
        products: action.payload.products
      };
    case GET_GALLARY:
      return {
        ...state,
        gallary: action.payload
      };
    default:
      return state;
  }
};
