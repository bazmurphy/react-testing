function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

const actualFullName = getFullName("Baz", "Murphy");
const expectedFullName = "Baz Murphy";

if (actualFullName !== expectedFullName) {
  throw new Error(`${actualFullName} is not equal to ${expectedFullName}`);
}
