export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (product,quantity) => {
  return {
    type: "ADD_TO_CART",

    payload: {
      ...product,
      quantity,
    },
  };
};

export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: id,
  };
};

export const updateQuantity = (id,quantity) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: {
      id,
      quantity,
    },
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};