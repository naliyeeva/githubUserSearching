import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("renders with placeholder text", () => {
    const mockOnChange = jest.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("Search GitHub users...");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const mockOnChange = jest.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test user" } });

    expect(mockOnChange).toHaveBeenCalledWith("test user");
  });

  it("displays the current value", () => {
    const mockOnChange = jest.fn();
    render(<SearchInput value="current value" onChange={mockOnChange} />);

    const input = screen.getByDisplayValue("current value");
    expect(input).toBeInTheDocument();
  });

  it("can be disabled", () => {
    const mockOnChange = jest.fn();
    render(<SearchInput value="" onChange={mockOnChange} disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("renders search icon", () => {
    const mockOnChange = jest.fn();
    render(<SearchInput value="" onChange={mockOnChange} />);

    const searchIcon = screen
      .getByRole("textbox")
      .parentElement?.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  });

  it("preserves focus when disabled and then enabled", () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <SearchInput value="" onChange={mockOnChange} disabled={false} />
    );

    const input = screen.getByRole("textbox");
    input.focus();
    expect(input).toHaveFocus();

    // Disable the input (simulating loading state)
    rerender(<SearchInput value="" onChange={mockOnChange} disabled={true} />);
    expect(input).toBeDisabled();
    expect(input).not.toHaveFocus(); // Browser removes focus when disabled

    // Enable the input again (simulating loading complete)
    rerender(<SearchInput value="" onChange={mockOnChange} disabled={false} />);
    expect(input).not.toBeDisabled();

    // Focus should be restored
    expect(input).toHaveFocus();
  });
});
