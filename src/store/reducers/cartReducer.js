import { ADD_TO_CART,REMOVE_FROM_CART,UPDATE_QUANTITY,CLEAR_CART } from "../actions/cartActions";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartReducer = (state = initialState,action) => {
  switch (action.type) {

    case ADD_TO_CART: {
      const existing = state.cart.find(
        (p) => p.id === action.payload.id
      );

      let updatedCart;

      if (existing) {
        updatedCart = state.cart.map((p) =>
          p.id === action.payload.id
            ? {
                ...p,
                quantity:
                  p.quantity +
                  action.payload.quantity,
              }
            : p
        );
      } else {
        updatedCart = [
          ...state.cart,
          action.payload,
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter(
        (p) => p.id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case UPDATE_QUANTITY: {
      const updatedCart = state.cart.map(
        (item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  action.payload.quantity
                ),
              }
            : item
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case CLEAR_CART: {
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};