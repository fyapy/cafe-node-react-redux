import { GET_CATEGORY, GET_PRODUCT, GET_ORDERS } from "../actions/types";

const initialState = {
  category: null,
  product: null,
  orders: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
};
