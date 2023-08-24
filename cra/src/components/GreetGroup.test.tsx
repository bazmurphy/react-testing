import { render, screen } from "@testing-library/react";
import { GreetGroup } from "./GreetGroup";

describe("Greet", () => {
  test("renders correctly", () => {
    render(<GreetGroup />);
    const textElement = screen.getByText("Hello");
    expect(textElement).toBeInTheDocument();
  });

  describe("Nested", () => {
    test("renders with a name", () => {
      render(<GreetGroup name={"Baz"} />);
      const textElement = screen.getByText("Hello Baz");
      expect(textElement).toBeInTheDocument();
    });
  });
});
