# React Testing (hand written notes)

## 3. Jest vs React Testing Library

### Jest

- Jest is a JavaScript framework
- Jest is a test runner that finds tests, runs the tests, determines whether the tests passed or failed and reports it back in a human readable manner

### React Testing Library

- RTL is a JavaScript testing utility that provides virtual DOM for testing React components
- RTL provides a virtual DOM which we can use to interact with and verify the behaviour of a React component
- RTL is a family of packages which helps test UI components
- The core library is called DOM Testing Library and RTL is a wrapper around this core library to test React applications in an easier way

---

## 4. Types of Tests

### Unit Tests

- Focus on testing the individual building blocks of an application such as a class or a function or a component
- Each unit or building block is tested in isolated, independent of other units
- Dependencies are mocked
- Run in a short amount of time and make it very easy to pinpoint failures
- Relative easier to write and maintain

### Integration Tests

- Focus is on testing a combination of units and ensuring they work together
- Take longer than unit tests

## End to End Tests

- Focus is on testing the entire application flow and ensuring it works as designed from start to finish
- Involves a real UI, a real backend database, a real service etc.
- Take the longest, as they cover the most amount of code
- Have a cost implication as you interact with real APIs that may charge based on the number of requests

### Testing Pyramid

![Testing Pyramid Image](testing-pyramid.png)

- the bulk of your tests are Unit Tests at the bottom of the Pyramid
- As you move up the Pyramid your tests get larger but at the same time the number of tests gets smaller
- Unit Tests are easier to write and maintain, but End to End tests give you the most confidence as they closely resemble a User testing your application

- RTL Philosophy: "The more your tests resemble the way your software is used, the more confidence they can give you."

- RTL strikes a balance between Unit tests in the sense they are at a component level and easy to write and maintain and End to End tests in the sense they resemble the way a user would interact with the Component.

- With RTL we are not concerned about the implementation details of a component (We are not testing how it is rendering text or how it is updating state or how it is handling a click event)

- Instead we are testing how the component behaves when a user interacts with it.

(Example: RTL doesn't care if you add 4+4 or 5+3 to display the number 8)

- Any refactoring done to a Component with not affect your test as long as the end result is the same (Functional Testing?)

### What is an Automated Test?

- It throws an error when the actual output does not match the expected output

Basic JavaScript Test Example (without Library/Framework):

```js
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

const actualFullName = getFullName("Baz", "Murphy");
const expectedFullName = "Baz Murphy";

if (actualFullName !== expectedFullName) {
  throw new Error(`${actualFullName} is not equal to ${expectedFullName}`);
}
```

---

## 5. Project Setup

- Install react typescript project (using CRA)
- CRA already has jest and react testing library already installed and configured with some defaults
- It provides a sample test and script to run tests in the project

---

## 6. Running Tests

In `cra/src/` we have `App.tsx` but also `App.test.tsx`
We can run this test with Jest
In `package.json` we have a `test` script `"test": "react-scripts test",` this will call Jest

```shell
 PASS  src/App.test.tsx
  √ renders learn react link (27 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        10.638 s
Ran all test suites.
```

---

## 7. Anatomy of a Test

- `test()` accepts 3 arguments:
  1. name - the first argument is the test name used to identify the test
  2. function - the second argument is the function that contains the expectations to test
  3. timeout - the third argument is the timeout which is an optional argument for specifying how long to wait before aborting the test. the default timeout value is 5 seconds.

```jsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

1. we use the `test` method from Jest
2. argument 1: name `renders learn react link`
3. argument 2: function `() => {}`
4. We use the `render` method from React Testing Library to create a Virtual DOM using the `App` component
5. We use `screen` from React Testing Library which contain methods to query the Virtual DOM
6. We use `.getByText()` which accepts a string or a regular expression as its argument `/learn react/i`
7. We `expect` the `linkElement` `.toBeInTheDocument()` (which is called a matcher function)
8. If we run this test it Passes
9. notice that `test` and `expect` are not imported because CRA globally provides those from Jest
10. So we use Jest and React Testing Library to create a test in a React Project.

---

## 8. First Test

1. Create a `Greet.tsx` component

```jsx
export const Greet = () => {
  return <div>Hello</div>;
};
```

2. Create a `Greet.test.tsx` test

```jsx
import { render, screen } from "@testing-library/react";
import { Greet } from "./greet";

test("Greet renders correctly", () => {
  render(<Greet />);
  const textElement = screen.getByText("Hello");
  expect(textElement).toBeInTheDocument();
});
```

---

## 9. Test Driven Development

- Test Driven Development is a software development process where you write tests before writing the software code
- Once the tests have been written, you then write the code to ensure the tests pass

1. Create tests that verify the functionality of a specific feature
2. Write software code that will run the tests successfully when re-executed
3. Refactor the code for optimisation while ensuring the tests continue to pass

- Also called red-green teesting as all tests go from a red failed state to a green passed state

- We write a new test `GreetTDD.test.tsx`
- We create an empty `GreetTDD.tsx`

```jsx
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
```

- We then run the Test and of course it FAILs both
- We write the `GreetTDD.tsx` component
- (TypeScript: we define a Props Type with OPTIONAL `name?`)

```jsx
type GreetTDDProps = {
  name?: string,
};

export const GreetTDD = (props: GreetTDDProps) => {
  return <div>Hello {props.name}</div>;
};
```

- And now run the Tests and they PASS

---

## 10. Jest Watch Mode

- When we run `npm run test` it starts Jest in `--watch` mode
- Watch Mode is an option that we can pass to Jest asking to watch files that have changed since the last commit and execute tests related only to those changed files
- An optimisation designed to make your tests run fast regardless of how many tests you have

## 11. Filtering Tests

- we can use `w` then `o` to only run tests related to changed files
- we can use `p` to filter by filename - we then enter a regex pattern (or some text and select the file)
- we can use `t` to filter by the test name - we then enter some text and select the test
- to clear the filter use `w` and then `c`

- on the global `test()` method you can use `.only` so `test.only()` in which case Jest will pickup only that test to run
- using `.only()` is common when working on a file that contains multiple tests
- using `.skip()` will tell Jest to skip that test

### 12. Grouping Tests

- If you want to group your tests with Jest you can use the `describe()`

- `describe()` accepts 2 arguments:

  1. name - the first argument is the group name
  2. function - the second argument is the function that contains the tests to be executed

- we can also rename the tests so they read better in the output.
- Greet
  - renders correctly
  - renders with a name

```jsx
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
```

```shell
 PASS  src/components/GreetGroup.test.tsx
  Greet
    √ renders correctly (24 ms)
    √ renders with a name (3 ms)
```

- we can also use `.only` and `.skip` with `describe()`

- it is possible to nest describe blocks

```jsx
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
```

```sh
 PASS  src/components/GreetGroup.test.tsx
  Greet
    √ renders correctly (21 ms)
    Nested
      √ renders with a name (1 ms)
```

- A "Test Suite" according to Jest is **one file**, and not a `describe()` block, although you group tests together using `describe()` it does not correspond to a "Test Suite".
