import { render, screen } from '@testing-library/react';
import OrderItem from '../OrderItem';

describe("OrderItem Component", () => {
  
  const orderItem = {
    quantity: 1,
    name: "Test Item",
    totalPrice: 10,
    pizzaId: 2

  };
  
  const ingredients = ["Ingredient 1", "Ingredient 2"];
  
  it("should render the correct quantity, name, and total price", () => {
    render(<OrderItem orderItem={orderItem} ingredients={ingredients} isLoadingIngredients={false} />);
    expect(screen.getByText(`1×`)).toBeInTheDocument();
    expect(screen.getByText(`Test Item`)).toBeInTheDocument();
    expect(screen.getByText(`$10.00`)).toBeInTheDocument();
  });

  it("should render 'Loading...' when isLoadingIngredients is true", () => {
    render(<OrderItem orderItem={orderItem} ingredients={ingredients} isLoadingIngredients={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the list of ingredients separated by commas", () => {
    render(<OrderItem orderItem={orderItem} ingredients={ingredients} isLoadingIngredients={false} />);
    expect(screen.getByText("Ingredient 1, Ingredient 2")).toBeInTheDocument();
  });

});
