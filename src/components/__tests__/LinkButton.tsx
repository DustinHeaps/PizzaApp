import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import LinkButton from "../LinkButton";
import * as router from "react-router";

describe("LinkButton", () => {
  const children: ReactNode = "Test Button";
  const to = "/test";
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Link with children and to props", () => {
    render(<LinkButton to={to}>{children}</LinkButton>);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", to);
    expect(link).toHaveTextContent(children as string);
  });

  it.todo("renders button with children and onClick function", () => {
    render(<LinkButton to='-1'>{children}</LinkButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(children as string);
    fireEvent.click(button);
    expect(navigate).toBeCalledWith(-1);
  });
});
