import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store';
import { CartItemType } from "../../types";

export type CartState = {
  cartItems: CartItemType[];
};

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ newItem: CartItemType }>) {
      const { newItem } = action.payload;
      state.cartItems.push(newItem);
    },
    deleteItem(state, action: PayloadAction<{ pizzaId: number }>) {
      const { pizzaId } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.pizzaId !== pizzaId);
    },
    increaseItemQuantity(state, action: PayloadAction<{ pizzaId: number }>) {
      const { pizzaId } = action.payload;
      const item = state.cartItems.find((item) => item.pizzaId === pizzaId);

      item?.quantity && item.quantity++;

      item?.unitPrice &&
        item.quantity &&
        (item.totalPrice = item.quantity * item.unitPrice);
    },
    decreaseItemQuantity(state, action: PayloadAction<{ pizzaId: number }>) {
      const { pizzaId } = action.payload;
      const item = state.cartItems.find((item) => item.pizzaId === pizzaId);

      item?.quantity && item.quantity--;

      item?.unitPrice &&
        item.quantity &&
        (item.totalPrice = item.quantity * item.unitPrice);

      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cartItems;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0;
