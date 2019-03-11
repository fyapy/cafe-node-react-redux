import {
  ADD_TO_CART,
  INCREASE_PRICE,
  INCREASE_QUANTITY
} from "../actions/types";

const initialState = {
  cart: [],
  totalPrice: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: action.payload
      };
    case INCREASE_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload
      };
    default:
      return state;
  }
};
