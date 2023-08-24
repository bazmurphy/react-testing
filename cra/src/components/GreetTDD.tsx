type GreetTDDProps = {
  name?: string;
};

export const GreetTDD = (props: GreetTDDProps) => {
  return <div>Hello {props.name}</div>;
};
