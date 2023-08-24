import { GreetProps } from "./Greet.types";

export const GreetWithType = (props: GreetProps) => {
  return <div>Hello {props.name}</div>;
};
