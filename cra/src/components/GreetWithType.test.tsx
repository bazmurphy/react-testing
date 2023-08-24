import { render, screen } from "@testing-library/react";
import { GreetWithType } from "./GreetWithType";

describe("GreetWithType", () => {
  test("renders correctly", () => {
    render(<GreetWithType />);
    const textElement = screen.getByText("Hello");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with a name", () => {
    render(<GreetWithType name={"Baz"} />);
    const textElement = screen.getByText("Hello Baz");
    expect(textElement).toBeInTheDocument();
  });
});
