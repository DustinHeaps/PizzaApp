import { fireEvent, render, screen } from "@testing-library/react";
import Button from '../Button';


describe("Button Tests", () => {


it('should render children correctly', () => {
    render(<Button type="primary">Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
  
  it('should render with primary style correctly', () => {
    render(<Button type="primary">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass('bg-yellow-400 px-4 py-3');
  });
  
  it('should render with small style correctly', () => {
    render(<Button type="small">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass('bg-yellow-400 px-4 py-2 text-xs');
  });
  
  it('should render with secondary style correctly', () => {
    render(<Button type="secondary">Test Button</Button>);
    expect(screen.getByText('Test Button')).toHaveClass('border-2 border-stone-300 px-4 py-2.5');
  });
  
  it('should render onClick function when clicked on', () => {
    const handleClick = jest.fn();
    render(<Button type="primary" onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('should render Button that is disabled', () => {
    const handleClick = jest.fn();
    render(<Button type="primary" disabled onClick={handleClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByText('Test Button')).toBeDisabled();
  });

})