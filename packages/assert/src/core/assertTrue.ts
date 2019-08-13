export function assertTrue(value: any, message?: string): true {
  if (value === true) {
    return true;
  } else {
    throw new Error(message || "assert that the value is true but it is not");
  }
}
