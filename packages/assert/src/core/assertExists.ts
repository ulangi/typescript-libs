export function assertExists<V>(value: V, message?: string): NonNullable<V> {
  if (value !== null && typeof value !== "undefined") {
    return value as NonNullable<V>;
  } else {
    throw new Error(
      message || "assert that the value not null/undefined but it is"
    );
  }
}
