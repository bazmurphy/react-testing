// Greet should render the text hello
// and if a name is passed into the component it should render hello followed by the name

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
