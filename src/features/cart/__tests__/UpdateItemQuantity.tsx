import { render, screen, fireEvent } from "@testing-library/react";

import { useDispatch } from "react-redux";
import UpdateItemQuantity from "../UpdateItemQuantity";
import { decreaseItemQuantity, increaseItemQuantity } from "../cartSlice";
import { Provider } from "react-redux";

import store from "../../../store";

describe("UpdateItemQuantity", () => {
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  const dispatchMock = jest.fn();
  const foo = { useDispatch };

  jest.spyOn(foo, "useDispatch").mockReturnValue(dispatchMock);

  it("should render the current quantity", () => {
    render(
      <Provider store={store}>
        {" "}
        <UpdateItemQuantity pizzaId={1} currentQuantity={10} />{" "}
      </Provider>
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it('should decrease the quantity when "-" button is clicked', () => {
    render(
      <Provider store={store}>
        {" "}
        <UpdateItemQuantity pizzaId={1} currentQuantity={10} />{" "}
      </Provider>
    );
    const decrementButton = screen.getByText("-");
    fireEvent.click(decrementButton);
    expect(dispatchMock).toHaveBeenCalledWith(
      decreaseItemQuantity({ pizzaId: 1 })
    );
  });

  it('should increase the quantity when "+" button is clicked', () => {
    render(
      <Provider store={store}>
        {" "}
        <UpdateItemQuantity pizzaId={1} currentQuantity={10} />{" "}
      </Provider>
    );
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);
    expect(dispatchMock).toHaveBeenCalledWith(
      increaseItemQuantity({ pizzaId: 1 })
    );
  });
});
