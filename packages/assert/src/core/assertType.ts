type TypeGuardFn<T, C = void> = (this: C, arg: any) => arg is T;

/*
type TypeGuardClass<T, K extends string> = {
  [ P in K]: (arg: any) => arg is T
}
*/

export function assertType<T, C>(
  value: any,
  contextOrFn: [C, TypeGuardFn<T, C>] | TypeGuardFn<T>
): T {
  if (contextOrFn instanceof Function) {
    const hold = contextOrFn(value);
    if (hold === true) {
      return value;
    } else {
      throw new Error(`assert type for ${value} failed`);
    }
  } else {
    const [context, fn] = contextOrFn;
    const hold = fn.call(context, value);
    if (hold === true) {
      return value;
    } else {
      throw new Error(`assert type for ${value} failed`);
    }
  }
}
