import { fireEvent, render, screen } from "@testing-library/react";

describe("CreateOrder tests", () => {
  it("should render with the correct First Name ", () => {
    render(
      <>
        <label id='first-name' className='sm:basis-40'>
          First Name
        </label>
        <input
          aria-labelledby='first-name'
          className='input grow'
          type='text'
          name='first-name'
          required
        />
      </>
    );
    const input = screen.getByLabelText<HTMLInputElement>("First Name");

    fireEvent.change(input, { target: { value: "Joe" } });
    expect(input.value).toBe("Joe");
  });

  it("should render with the correct Phone Number ", () => {
    render(
      <>
        <label id='phone' className='sm:basis-40'>
          Phone Number
        </label>
        <input
          aria-labelledby='phone'
          className='input grow'
          type='text'
          name='phone'
          required
        />
      </>
    );
    const input = screen.getByLabelText<HTMLInputElement>("Phone Number");

    fireEvent.change(input, { target: { value: "7161234567" } });
    expect(input.value).toBe("7161234567");
  });
  it("should render with the correct Address", () => {
    render(
      <>
        <label id='address' className='sm:basis-40'>
          Address
        </label>
        <input
          aria-labelledby='address'
          className='input grow'
          type='text'
          name='address'
          required
        />
      </>
    );
    const input = screen.getByLabelText<HTMLInputElement>("Address");

    fireEvent.change(input, { target: { value: "123 Main St." } });
    expect(input.value).toBe("123 Main St.");
  });
});
