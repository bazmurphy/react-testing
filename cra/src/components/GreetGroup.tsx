type GreetGroupProps = {
  name?: string;
};

export const GreetGroup = (props: GreetGroupProps) => {
  return <div>Hello {props.name}</div>;
};
