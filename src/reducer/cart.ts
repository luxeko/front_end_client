const data = localStorage.getItem('carts');
const checkout = localStorage.getItem('checkout');
export const CART_INITIAL_STATE = {
  cart: data ? JSON.parse(data) : [],
  listCheckout: checkout ? JSON.parse(checkout) : [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'ADD':
      // Check if item is in cart already
      const inCart = state.cart.find(
        (item: { id: string }) => item.id === action.payload.data.id,
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item: { id: string; qty: number }) =>
              item.id === action.payload.data.id
                ? { ...item, qty: item.qty + 1 }
                : item,
            )
          : [...state.cart, { ...action.payload.data, qty: 1 }],
      };
    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter(
          (item: { id: string }) => item.id !== action.payload.id,
        ),
      };
    case 'ADJUST_QTY':
      return {
        ...state,
        cart: state.cart.map((item: { id: string }) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item,
        ),
      };
    case 'REMOVE_ALL_ITEMS':
      return {
        ...state,
        cart: [],
      };
    case 'CHECKOUT':
      return {
        ...state,
        listCheckout: action.payload.data.map(
          (item: { id: string }) => item.id,
        ),
      };
    case 'UPLOAD_CHECKOUT':
      return {
        ...state,
        listCheckout: state.listCheckout.includes(action.payload.id)
          ? state.listCheckout.filter(
              (item: string) => item !== action.payload.id,
            )
          : [...state.listCheckout, action.payload.id],
      };
    default:
      return state;
  }
};
