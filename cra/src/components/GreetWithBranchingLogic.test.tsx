import { render, screen } from "@testing-library/react";
import { GreetWithBranchingLogic } from "./GreetWithBranchingLogic";

describe("GreetWithBranchingLogic", () => {
  test("renders correctly", () => {
    render(<GreetWithBranchingLogic />);
    const textElement = screen.getByText(/Hello/);
    expect(textElement).toBeInTheDocument();
  });
});
