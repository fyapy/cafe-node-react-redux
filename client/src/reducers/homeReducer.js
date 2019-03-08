import { GET_HOME_DATA } from "../actions/types";

const initialState = {
  categories: [],
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_DATA:
      return {
        ...state,
        categories: action.payload.categories,
        products: action.payload.products
      };
    default:
      return state;
  }
};
