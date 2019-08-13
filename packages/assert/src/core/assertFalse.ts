export function assertFalse(value: any, message?: string): false {
  if (value === false) {
    return false;
  } else {
    throw new Error(message || "assert that the value is false but it is not");
  }
}
