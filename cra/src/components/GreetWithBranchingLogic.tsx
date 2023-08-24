import { GreetProps } from "./Greet.types";

export const GreetWithBranchingLogic = (props: GreetProps) => {
  return <div>Hello {props.name ? props.name : "Guest"}</div>;
};
