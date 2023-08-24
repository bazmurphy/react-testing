import { render, screen } from "@testing-library/react";
import { Greet } from "../components/Greet";

test("Greet renders correctly", () => {
  render(<Greet />);
  const textElement = screen.getByText("Hello");
  expect(textElement).toBeInTheDocument();
});
