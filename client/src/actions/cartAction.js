import isEmpty from "../validation/isEmpty";

import { ADD_TO_CART, INCREASE_PRICE, INCREASE_QUANTITY } from "./types";

export const addToCart = (prodId, price) => (dispatch, getState) => {
  const inCart = getState().cart.cart.find(c => c.id === prodId);
  const product = getState().home.products.find(p => p.id === prodId);

  if (isEmpty(inCart)) {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: prodId,
        quantity: 1
      }
    });
  } else {
    inCart.quantity++;
    const index = getState().cart.cart.findIndex(o => o.id === prodId);
    let cart = getState().cart.cart;
    cart[index] = inCart;
    dispatch({
      type: INCREASE_QUANTITY,
      payload: cart
    });
  }

  dispatch({
    type: INCREASE_PRICE,
    payload: product.price
  });
};
