import isEmpty from "../validation/isEmpty";

import {
  ADD_TO_CART,
  INCREASE_PRICE,
  DECREASE_PRICE,
  INCREASE_QUANTITY,
  NEW_CART
} from "./types";

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

export const deleteFromCart = id => (dispatch, getState) => {
  const count = getState().cart.cart.find(el => el.id === id).quantity;
  const newCart = getState().cart.cart.filter(el => el.id !== id);
  dispatch({
    type: NEW_CART,
    payload: newCart
  });

  const product = getState().home.products.find(p => p.id === id);
  dispatch({
    type: DECREASE_PRICE,
    payload: product.price * count
  });
};

export const increaseCart = id => (dispatch, getState) => {
  let cart = getState().cart.cart;
  const index = cart.findIndex(el => el.id === id);
  cart[index].quantity++;
  dispatch({
    type: NEW_CART,
    payload: cart
  });

  const product = getState().home.products.find(p => p.id === id);
  dispatch({
    type: INCREASE_PRICE,
    payload: product.price
  });
};

export const decreaseCart = id => (dispatch, getState) => {
  let cart = getState().cart.cart;
  const index = cart.findIndex(el => el.id === id);
  cart[index].quantity--;
  if (cart[index].quantity <= 0) {
    cart = cart.filter(el => el.id !== id);
  }
  dispatch({
    type: NEW_CART,
    payload: cart
  });

  const product = getState().home.products.find(p => p.id === id);
  dispatch({
    type: DECREASE_PRICE,
    payload: product.price
  });
};
