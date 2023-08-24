import { render, screen } from "@testing-library/react";
import { GreetTDD } from "./GreetTDD";

test("GreetTDD renders correctly", () => {
  render(<GreetTDD />);
  const textElement = screen.getByText("Hello");
  expect(textElement).toBeInTheDocument();
});

test("GreetTDD renders with a name", () => {
  render(<GreetTDD name={"Baz"} />);
  const textElement = screen.getByText("Hello Baz");
  expect(textElement).toBeInTheDocument();
});
